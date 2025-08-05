import API from './api'

export interface TodayDiagnosis {
  nickname: string
  score: number
  status: '양호' | '보통' | '심각'
  date: string
}

// 오늘의 진단 결과    조회
export async function fetchTodayDiagnosis(): Promise<TodayDiagnosis> {
  const { data } = await API.get<TodayDiagnosis>('/api/main/diagnosis/today')
  return data
}
