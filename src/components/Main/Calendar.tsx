// // import { useState } from 'react'
// // import CalendarHeader from './CalendarHeader'
// // import CalendarGrid from './CalendarGrid'

// // export interface DateCount {
// //   date: string
// //   count: number
// // }

// // interface CalendarProps {
// //   dateCounts?: DateCount[]
// // }

// // function Calendar({ dateCounts = [] }: CalendarProps) {
// //   const today = new Date()
// //   const [year, setYear] = useState(today.getFullYear())
// //   const [month, setMonth] = useState(today.getMonth())

// //   const moveMonth = (direction: number) => {
// //     const newDate = new Date(year, month + direction)
// //     setYear(newDate.getFullYear())
// //     setMonth(newDate.getMonth())
// //   }

// //   return (
// //     <div className="max-w-md mx-auto text-white h-full">
// //       <CalendarHeader year={year} month={month} onMoveMonth={moveMonth} />
// //       <CalendarGrid year={year} month={month} markedDates={dateCounts} />
// //     </div>
// //   )
// // }

// // export default Calendar

import { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'

export interface DateCount {
  date: string
  count: number
}

interface CalendarProps {
  dateCounts?: DateCount[]
}

function Calendar({ dateCounts = [] }: CalendarProps) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const moveMonth = (direction: number) => {
    const newDate = new Date(year, month + direction)
    setYear(newDate.getFullYear())
    setMonth(newDate.getMonth())
  }

  return (
    <div className="max-w-md mx-auto text-white h-full flex flex-col">
      <CalendarHeader year={year} month={month} onMoveMonth={moveMonth} />
      <div className="flex-1">
        <CalendarGrid year={year} month={month} markedDates={dateCounts} />
      </div>
    </div>
  )
}

export default Calendar

// import { useState, useMemo } from 'react'
// import CalendarHeader from './CalendarHeader'
// import CalendarGrid from './CalendarGrid'
// import useMonthlyStatuses from '../../utils/useMonthlyStatuses'

// export interface DateCount {
//   date: string
//   count: number
// }
// interface CalendarProps {
//   dateCounts?: DateCount[]
// }

// function Calendar({ dateCounts = [] }: CalendarProps) {
//   const today = new Date()
//   const [year, setYear] = useState(today.getFullYear())
//   const [month, setMonth] = useState(today.getMonth()) // 0~11

//   // 백엔드 호출 (month는 1~12로 변환)
//   const { data, isLoading, isError } = useMonthlyStatuses(year, month + 1)

//   const mergedCounts = useMemo(() => {
//     // prop으로 내려온 dateCounts가 있으면 우선 병합(선택 사항)
//     const map = new Map<string, number>()
//     dateCounts.forEach((d) => map.set(d.date, d.count))
//     ;(data ?? []).forEach((d) => map.set(d.date, d.count))
//     return Array.from(map.entries()).map(([date, count]) => ({ date, count }))
//   }, [data, dateCounts])

//   const moveMonth = (direction: number) => {
//     const newDate = new Date(year, month + direction, 1)
//     setYear(newDate.getFullYear())
//     setMonth(newDate.getMonth())
//   }

//   return (
//     <div className="max-w-md mx-auto text-white h-full flex flex-col">
//       <CalendarHeader year={year} month={month} onMoveMonth={moveMonth} />
//       <div className="flex-1">
//         {/* 로딩/에러 상태 간단 처리 */}
//         {isError ? (
//           <div className="text-red-600 text-sm px-2">
//             달력 데이터를 불러오지 못했습니다.
//           </div>
//         ) : (
//           <CalendarGrid
//             year={year}
//             month={month}
//             markedDates={isLoading ? [] : mergedCounts}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default Calendar
