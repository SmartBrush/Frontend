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

// import { useState } from 'react'
// import CalendarHeader from './CalendarHeader'
// import CalendarGrid from './CalendarGrid'

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
//   const [month, setMonth] = useState(today.getMonth())

//   const moveMonth = (direction: number) => {
//     const newDate = new Date(year, month + direction)
//     setYear(newDate.getFullYear())
//     setMonth(newDate.getMonth())
//   }

//   return (
//     <div className="max-w-md mx-auto text-white h-full flex flex-col">
//       <CalendarHeader year={year} month={month} onMoveMonth={moveMonth} />
//       <div className="flex-1">
//         <CalendarGrid year={year} month={month} markedDates={dateCounts} />
//       </div>
//     </div>
//   )
// }

// export default Calendar

import { useEffect, useMemo, useState } from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import {
  fetchMonthlyStatuses,
  mapStatusToCount,
  type MonthlyStatusItem,
} from '../../apis/main'

export interface DateCount {
  date: string
  count: number
}
interface CalendarProps {
  dateCounts?: DateCount[]
}

function toDateCounts(list: MonthlyStatusItem[]): DateCount[] {
  return list
    .map((it) => ({ date: it.date, count: mapStatusToCount(it.status) }))
    .filter((x) => x.count > 0)
}

function Calendar({ dateCounts = [] }: CalendarProps) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth()) // 0~11

  const [remoteCounts, setRemoteCounts] = useState<DateCount[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // 월/년도 변경 시 백엔드 호출
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        setLoading(true)
        setErrorMsg(null)
        const raw = await fetchMonthlyStatuses(year, month + 1) // 1~12
        if (cancelled) return
        setRemoteCounts(toDateCounts(raw))
      } catch (e) {
        if (!cancelled) setErrorMsg('달력 데이터를 불러오지 못했습니다.')
        console.log(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [year, month])

  const mergedCounts = useMemo(() => {
    const map = new Map<string, number>()
    dateCounts.forEach((d) => map.set(d.date, d.count))
    remoteCounts.forEach((d) => map.set(d.date, d.count))
    return Array.from(map.entries()).map(([date, count]) => ({ date, count }))
  }, [dateCounts, remoteCounts])

  // const moveMonth = (direction: number) => {
  //   const newDate = new Date(year, month + direction, 1)
  //   setYear(newDate.getFullYear())
  //   setMonth(newDate.getMonth())
  // }

  return (
    <div className="max-w-md mx-auto text-white h-full flex flex-col">
      <CalendarHeader
        year={year}
        month={month}
        onSelect={(yy, mm) => {
          setYear(yy)
          setMonth(mm) // 0~11
        }}
      />
      <div className="flex-1">
        {errorMsg ? (
          <div className="text-red-600 text-sm px-2">{errorMsg}</div>
        ) : (
          <CalendarGrid
            year={year}
            month={month}
            markedDates={loading ? [] : mergedCounts}
          />
        )}
      </div>
    </div>
  )
}

export default Calendar
