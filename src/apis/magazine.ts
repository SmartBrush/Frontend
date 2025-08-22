import API from './api'

export interface Magazine {
  id: number
  title: string
  category: string
  date: string
  writer: string
  image: string
  link: string
}

// 칼럼 10개 추천 불러오기
export const getRecommendedMagazines = async (): Promise<Magazine[]> => {
  const { data } = await API.get<Magazine[]>('/api/magazines/recommend')
  return data
}
