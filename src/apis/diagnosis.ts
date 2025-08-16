import API from './api'

// 정상 결과
export interface TodayDiagnosisOk {
  nickname: string
  score: number
  status: '양호' | '보통' | '심각'
  date: string
}

// 결과 없음(200)
export interface TodayDiagnosisEmpty {
  nickname: string
  message: string
}

export type TodayDiagnosis = TodayDiagnosisOk | TodayDiagnosisEmpty

export function isDiagnosisOk(d: TodayDiagnosis): d is TodayDiagnosisOk {
  return (d as TodayDiagnosisOk).status !== undefined
}

// 오늘의 진단 결과 조회
export async function fetchTodayDiagnosis(): Promise<TodayDiagnosis> {
  const { data } = await API.get<TodayDiagnosis>('/api/main/diagnosis/today')
  return data
}
