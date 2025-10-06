import type { DateCount } from './Calendar'
import blankIcon from '../../assets/Blank.svg'
import goodIcon from '../../assets/goodstatus.png'
import normalIcon from '../../assets/normalIstatus.png'
import badIcon from '../../assets/badstatus.png'
import { useNavigate } from 'react-router-dom'

interface CalendarGridProps {
  year: number
  month: number
  markedDates: DateCount[]
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토']

function getCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay() // 해당 달 1일의 요일(0~6)
  const lastDate = new Date(year, month + 1, 0).getDate() // 해당 달 마지막 날짜
  const totalCells = firstDay + lastDate // 실제로 필요한 칸 수(빈칸 포함)

  // 5주(35칸)로 충분하면 35칸, 아니면 6주(42칸)
  const targetCells = totalCells <= 35 ? 35 : 42

  const days: (number | null)[] = Array(firstDay).fill(null)
  for (let i = 1; i <= lastDate; i++) days.push(i)

  while (days.length < targetCells) days.push(null)
  return days
}

function CalendarGrid({ year, month, markedDates }: CalendarGridProps) {
  const calendarDays = getCalendarDays(year, month)
  const navigate = useNavigate()

  const handleDateClick = (date: string) => {
    navigate(`/result/${date}`)
  }

  return (
    <>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-black">
        {WEEK_DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mt-2">
        {calendarDays.map((day, idx) => {
          const dateStr =
            day !== null
              ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              : ''

          const matched = markedDates.find((d) => d.date === dateStr)

          let statusIcon = blankIcon
          if (matched) {
            if (matched.count === 1) statusIcon = goodIcon
            else if (matched.count === 2) statusIcon = normalIcon
            else if (matched.count === 3) statusIcon = badIcon
          }

          if (day === null) {
            return (
              <div
                key={idx}
                className="w-[30px] h-[52px] flex flex-col items-center justify-start mx-auto"
              />
            )
          }

          return (
            <div
              key={idx}
              className="w-[30px] h-[52px] flex flex-col items-center justify-start mx-auto cursor-pointer"
              onClick={() => handleDateClick(dateStr)}
            >
              <img
                src={statusIcon}
                alt="status"
                className="w-[30px] h-[30px] mb-[2px]"
              />
              <span className="text-sm text-black mb-[2px]">{day}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CalendarGrid
