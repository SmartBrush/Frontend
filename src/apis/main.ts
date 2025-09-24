import API from './api'

export type MonthlyStatusItem = {
  status: string // '', '양호', '보통', '심각' 등
  date: string // 'YYYY-MM-DD'
}

export type AttendanceResponse = {
  email?: string
  currentStreak: number
}

// 상태 → 달력 아이콘 카운트 매핑
export function mapStatusToCount(status: string): number {
  switch (status) {
    case '양호':
    case '좋음':
      return 1
    case '보통':
    case '경증':
    case '중등도':
      return 2
    case '심각':
    case '중증':
      return 3
    default:
      return 0 // 빈 문자열 등
  }
}

export async function fetchMonthlyStatuses(year: number, month1to12: number) {
  const token = localStorage.getItem('access_token') ?? ''
  const { data } = await API.get<MonthlyStatusItem[]>(
    // Swagger 기준으로 /api 포함
    '/api/main/diagnosis/status/by-month',
    {
      params: { year, month: month1to12 },
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  )
  return data
}

export const fetchDiagnosisByDate = async (date: string) => {
  const response = await API.get(`/api/main/diagnosis/${date}`)
  return response.data[0] // 1개의 결과만 반환하므로 배열의 첫 번째 요소 반환
}

//연속 출석 일 수
export async function fetchAttendance(): Promise<AttendanceResponse> {
  const token = localStorage.getItem('access_token') ?? ''
  const { data } = await API.get<AttendanceResponse>('/api/attendance', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  return data
}
