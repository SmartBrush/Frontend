import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const API = axios.create({
  baseURL: API_BASE_URL,
})

// 요청 인터셉터
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 응답 인터셉터
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const code = error.code

    if (
      status === 401 ||
      status === 403 ||
      code === 'ERR_NETWORK' ||
      code === 'ECONNABORTED'
    ) {
      console.warn('인증 불가 또는 서버 연결 실패')

      localStorage.removeItem('access_token')

      // 현재 경로 저장 후 로그인 페이지 이동
      const here = window.location.pathname + window.location.search
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = `/login?next=${encodeURIComponent(here)}`
      }
    }

    return Promise.reject(error)
  },
)

export default API
