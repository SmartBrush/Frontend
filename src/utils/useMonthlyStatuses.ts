// import { useQuery } from '@tanstack/react-query'
// import { fetchMonthlyStatuses, type MonthlyStatusItem } from '../apis/main'

// export type DateCount = { date: string; count: number }

// // 상태 → 아이콘 카운트 매핑
// function mapStatusToCount(status: string): number {
//   // 프로젝트 전반 용어를 모두 대비
//   switch (status) {
//     case '양호':
//     case '좋음':
//       return 1
//     case '보통':
//     case '경증':
//     case '중등도':
//       return 2
//     case '심각':
//     case '중증':
//       return 3
//     default:
//       return 0 // 빈 문자열 등
//   }
// }

// /** 백엔드 월별 상태를 Calendar가 쓰는 DateCount[]로 변환 */
// function toDateCounts(list: MonthlyStatusItem[]): DateCount[] {
//   return list
//     .map((it) => ({ date: it.date, count: mapStatusToCount(it.status) }))
//     .filter((x) => x.count > 0) // 빈 날짜는 표시 안 함(아이콘 없음)
// }

// export default function useMonthlyStatuses(year: number, month1to12: number) {
//   return useQuery({
//     queryKey: ['monthly-status', year, month1to12],
//     queryFn: async () => {
//       const raw = await fetchMonthlyStatuses(year, month1to12)
//       return toDateCounts(raw)
//     },
//     staleTime: 1000 * 60, // 1분
//     retry: 1,
//   })
// }
