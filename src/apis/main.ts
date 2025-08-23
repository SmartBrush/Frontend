import API from './api'

// 서버 응답 타입
export type MonthlyStatusItem = {
  status: string // '', '양호', '보통', '심각' ...
  date: string // 'YYYY-MM-DD'
}

export async function fetchMonthlyStatuses(year: number, month: number) {
  // month는 1~12로 보냄
  const token = localStorage.getItem('access_token') ?? ''
  const { data } = await API.get<MonthlyStatusItem[]>(
    '/main/diagnosis/status/by-month',
    {
      params: { year, month },
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  )
  return data
}
