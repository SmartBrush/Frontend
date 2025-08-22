// import axios from 'axios'
// import API from './api'

// const BASE_URL = import.meta.env.VITE_API_BASE_URL

// export interface SignupPayload {
//   email: string
//   password: string
//   passwordCheck: string
//   nickname: string
// }

// export interface LoginPayload {
//   email: string
//   password: string
// }

// export interface LoginResponse {
//   accessToken: string
// }

// export const signup = async (data: SignupPayload) => {
//   const response = await axios.post(`${BASE_URL}/api/auth/signup`, data, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   return response.data
// }

// // export const login = async (data: LoginPayload): Promise<LoginResponse> => {
// //   const response = await API.post('/api/auth/login', data)
// //   return response.data
// // }

// export const login = async (data: LoginPayload): Promise<LoginResponse> => {
//   const response = await API.post('/api/auth/login', data)
//   const { accessToken } = response.data

//   const esp32IP = 'http://172.20.10.3' // 필요시 수정

//   try {
//     await axios.post(
//       `${esp32IP}/set-token`,
//       { token: accessToken },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     )
//     console.log('🔐 ESP32-CAM에 토큰 전송 성공')
//   } catch (err) {
//     console.error('🚫 ESP32-CAM에 토큰 전송 실패:', err)
//   }

//   return response.data // ✅ accessToken만 포함된 객체
// }

import axios from 'axios'
import API from './api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface SignupPayload {
  email: string
  password: string
  passwordCheck: string
  nickname: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export const signup = async (data: SignupPayload) => {
  const response = await axios.post(`${BASE_URL}/api/auth/signup`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await API.post('/api/auth/login', data)
    console.log('🟢 로그인 응답:', response)

    // ✅ 중첩 구조에서 accessToken 추출
    const accessToken = response?.data?.data?.accessToken

    if (!accessToken) {
      throw new Error('❌ accessToken이 응답에 없습니다.')
    }

    // ✅ ESP32에 토큰 전송
    const esp32IP = 'http://172.20.10.14'
    try {
      await axios.post(
        `${esp32IP}/set-token`,
        { token: accessToken },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      console.log('🔐 ESP32-CAM에 토큰 전송 성공')
    } catch (err) {
      console.error('🚫 ESP32-CAM에 토큰 전송 실패:', err)
    }

    return { accessToken }
  } catch (err) {
    console.error('🛑 login() 에러:', err)
    throw err
  }
}
