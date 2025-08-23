import type { SurveyForm } from '../components/ScalpSurvey/SurveyForm'
import API from './api'
import axios from './api'

export const submitSurvey = (form: SurveyForm) => {
  return axios.post('/api/question/save', form, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export interface MyPageResponse {
  nickname: string
  profileImage: string
  attendanceDays: number
  email: string
}

export async function fetchMyPage(): Promise<MyPageResponse> {
  const { data } = await API.get<MyPageResponse>('/api/mypage')
  return data
}

export async function fetchDisplayName(): Promise<string> {
  try {
    const { nickname } = await fetchMyPage()
    // 닉네임이 비어있으면 기본값
    return nickname?.trim() ? nickname.trim() : '회원'
  } catch {
    return '회원'
  }
}
