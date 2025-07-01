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
  const response = await API.post('/api/auth/login', data)
  return response.data
}
