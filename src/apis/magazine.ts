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

// 전체 칼럼 불러오기
export const getAllMagazines = async (size = 20): Promise<Magazine[]> => {
  const { data } = await API.get<Magazine[]>('/api/magazines/all', {
    params: { size },
  })
  return data
}

// 칼럼 검색 (title 기준)
export const searchMagazines = async (
  keyword: string,
  size = 100,
): Promise<Magazine[]> => {
  const { data } = await API.get<Magazine[]>('/api/magazines/search', {
    params: { keyword, size },
  })
  return data
}
