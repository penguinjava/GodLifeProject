import axios from 'axios'

// 기본 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3443/api',
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 요청 인터셉터: 토큰 자동 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        const isRefreshRequest = config.url?.includes('/auth/refresh');
        if (token && !isRefreshRequest) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// 응답 인터셉터: 공통 에러 처리
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { config, response } = error;

        console.error('❌ Axios 에러 요약 ↓\n');
        console.error('➡️ 요청 URL:', config?.url);
        console.error('📡 HTTP 메서드:', config?.method?.toUpperCase());
        console.error('📛 상태 코드:', response?.status);
        console.error('📝 메시지:', response?.statusText || error.message);

        return Promise.reject(error);
    }
);

export default axiosInstance
