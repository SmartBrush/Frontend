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
    <div className="max-w-md mx-auto text-white h-full">
      <CalendarHeader year={year} month={month} onMoveMonth={moveMonth} />
      <CalendarGrid year={year} month={month} markedDates={dateCounts} />
    </div>
  )
}

export default Calendar
