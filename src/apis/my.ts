import API from './api'

export interface MyPageData {
  nickname: string
  attendanceDays: number
  profileImage: string
  email?: string
}

export const getMyPageData = async (): Promise<MyPageData> => {
  const response = await API.get('/api/mypage')
  return response.data
}

export type MyComment = {
  id: number
  content: string
  author: string
  profileImage: string
  createdAt: string
  postId: number
}

export const getMyComments = async (): Promise<MyComment[]> => {
  const res = await API.get('/api/mypage/comments')
  return Array.isArray(res.data) ? (res.data as MyComment[]) : []
}

export interface UpdateProfilePayload {
  nickname: string
  email: string
  profileImage?: string
}

export const updateMyProfile = async (payload: UpdateProfilePayload) => {
  const res = await API.patch('/api/mypage/update', payload)
  return res.data
}
