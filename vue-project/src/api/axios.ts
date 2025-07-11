import axios from 'axios'

// 기본 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 요청 인터셉터: 토큰 자동 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
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
        console.error('Axios 응답 에러:', error.response)
        return Promise.reject(error)
    }
)

export default axiosInstance
