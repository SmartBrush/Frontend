import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const API = axios.create({
  baseURL: API_BASE_URL,
})

// 요청 시 Authorization 헤더 자동 추가
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 응답 인터셉터: 토큰 만료 시 자동 로그아웃 처리
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn('⛔ 토큰 만료 또는 유효하지 않음')

      // 로그아웃 처리
      localStorage.removeItem('access_token')

      // 현재 페이지에서 /login 으로 강제 이동
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default API
