import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import axiosInstance from "@/api/axios";
import type {User} from "@/types/user";
import axios, { AxiosError } from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const isLoading = ref(false)
    const isAuthenticated = computed(() => !!token.value)

    /**
     * 카카오 로그인
     */
    const kakaoLogin = () => {
        try {
            if (!window.Kakao?.Auth) new Error('카카오 SDK가 초기화되지 않았습니다.')

            window.Kakao.Auth.authorize({
                redirectUri: import.meta.env.VITE_REDIRECT_URI,
            })
        } catch (error) {
            console.error('카카오 로그인 실패:', error)
            throw new Error('카카오 로그인 실패')
        }
    }

    /**
     * 로컬스토리지에서 토큰 확인
     */
    const restoreToken = async () => {
        const saved = localStorage.getItem('accessToken')
        console.log('debug : restoreToken')
        if (saved) {
            token.value = saved
            try {
                console.log('debut : fetchUserInfo before')
                await fetchUserInfo()
                console.log('debut : fetchUserInfo after')
            } catch (err) {
                console.warn('토큰이 만료되었거나 유효하지 않음. 로그아웃 처리함')
                await logout()
            }
        }else{
            await logout()
        }
    }

    /**
     * 토큰을 인증헤더로 보냄
     */
    const fetchUserInfo = async () => {
        try {
            console.log('debut : fetchUserInfo')
            isLoading.value = true;
            console.log('debut : api/auth/me before')
            await axiosInstance.get('/auth/me');
            console.log('debut : api/auth/me after')
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const status = axiosError.response?.status;

                if (status === 401) {
                    try {
                        console.log('debug : api/auth/refresh before')
                        const result = await axiosInstance.post('/auth/refresh');
                        console.error(result.data);
                        localStorage.setItem('accessToken', result.data.data);

                        console.log('debug : api/auth/refresh after')
                        await axiosInstance.get('/auth/me');
                    } catch (refreshError) {
                        console.error('리프레시 실패', refreshError);
                        await logout();
                    }
                } else {
                    console.error('토큰 인증 실패:', error);
                    await logout();
                }
            } else {
                console.error('알 수 없는 에러', error);
                await logout();
            }
        } finally {
            isLoading.value = false;
        }
    };


    /**
     * 새로운 토큰 발급
     * @param newToken 새로운 토큰
     */
    const setToken = (newToken: string) => {
        token.value = newToken
        localStorage.setItem('accessToken', newToken)
    }

    /**
     * 로그아웃
     */
    const logout = async () => {
        user.value = null
        token.value = null
        const res = await axiosInstance.post('/auth/logout')

        if(res.data.success){
            localStorage.removeItem('accessToken')
            location.reload()
        }else{
            console.error(res.data.message)
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        restoreToken,
        kakaoLogin,
        setToken,
        logout,
    }
})
