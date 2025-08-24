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

export const triggerCapture = async () => {
  return API.get('/api/capture')
}

export type Status = '양호' | '보통' | '심각'

export type DiagnosisResult = {
  scalpSensitivityValue: number
  scalpSensitivityLevel: Status
  densityValue: number
  densityLevel: Status
  sebumLevelValue: number
  sebumLevel: Status
  poreSizeValue: number
  poreSizeLevel: Status
  scalingValue: number
  scalingLevel: Status
  score: number
  status: Status
  images?: DiagnosisImage[]
}

export type DiagnosisImage = {
  url: string
  id?: number
  label?: string
}

// 최신 4장으로 AI 진단 실행
export async function uploadDiagnosis(): Promise<DiagnosisResult> {
  const { data } = await API.post<DiagnosisResult>('/api/diagnosis/upload')
  return data
}
