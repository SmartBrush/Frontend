export type MetricKey =
  | 'density' // 모발 밀도
  | 'oil' // 유분 정도
  | 'thickness' // 모발 굵기
  | 'sensitivity' // 두피 민감도
  | 'scaling' // 각질/비듬

export interface MonthlyRecord {
  month: string // '2025-05' 형식
  values: Record<MetricKey, number> // 0~100
}

export interface MonthlyReportResponse {
  userName: string
  months: MonthlyRecord[]
}
