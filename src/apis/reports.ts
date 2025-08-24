import type { MonthlyReportResponse } from '../types/report'

const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? '1') === '1'

// 백엔드 생기면 이 경로만 사용
async function fetchReportFromServer(): Promise<MonthlyReportResponse> {
  const base = import.meta.env.VITE_API_BASE_URL
  const res = await fetch(
    `${base}/api/reports/monthly?from=2025-05&to=2025-08`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`,
      },
      credentials: 'include',
    },
  )
  if (!res.ok) throw new Error('월별 리포트 조회 실패')
  return res.json()
}

// 임시 Mock (5~8월)
function mockReport(userName: string): MonthlyReportResponse {
  return {
    userName,
    months: [
      {
        month: '2025-05',
        values: {
          density: 33.1,
          oil: 72.2,
          thickness: 40.9,
          sensitivity: 49.5,
          scaling: 34.1,
        },
      },
      {
        month: '2025-06',
        values: {
          density: 40.0,
          oil: 74.3,
          thickness: 32.6,
          sensitivity: 50.7,
          scaling: 29.0,
        },
      },
      {
        month: '2025-07',
        values: {
          density: 32.8,
          oil: 72.6,
          thickness: 35.4,
          sensitivity: 51.2,
          scaling: 44.9,
        },
      },
      {
        month: '2025-08',
        values: {
          density: 35.6,
          oil: 80.9,
          thickness: 32.6,
          sensitivity: 60.7,
          scaling: 32.6,
        },
      }, // 샘플
    ],
  }
}

export async function getMonthlyReport(
  userName: string,
): Promise<MonthlyReportResponse> {
  if (USE_MOCK) return mockReport(userName)
  return fetchReportFromServer()
}
