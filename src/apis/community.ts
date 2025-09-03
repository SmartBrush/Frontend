import API from './api'

export interface Concern {
  id: number
  title: string
  content: string
  author: string
  profileImage: string
  createdAt: string
}

export async function fetchConcernList(): Promise<Concern[]> {
  const { data } = await API.get('/api/community/list')
  return data
}

export async function searchConcerns(keyword: string): Promise<Concern[]> {
  const { data } = await API.get('/api/community/search', {
    params: { keyword },
  })
  return data
}
