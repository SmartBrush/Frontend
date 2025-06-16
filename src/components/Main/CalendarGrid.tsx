import type { DateCount } from './Calendar'
import blankIcon from '../../assets/Blank.svg'
import goodIcon from '../../assets/goodIcon.png'
import normalIcon from '../../assets/normalIcon.png'
import badIcon from '../../assets/badIcon.png'

interface CalendarGridProps {
  year: number
  month: number
  markedDates: DateCount[]
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토']

function getCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = Array(firstDay).fill(null)
  for (let i = 1; i <= lastDate; i++) {
    days.push(i)
  }
  return days
}

function CalendarGrid({ year, month, markedDates }: CalendarGridProps) {
  const calendarDays = getCalendarDays(year, month)

  // ✅ 로컬스토리지에서 상태 불러오기
  const saved = localStorage.getItem('scalp_status')
  const parsed = saved ? JSON.parse(saved) : null
  const todayStatusDate = parsed?.date
  const todayStatus = parsed?.status

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

          const isTodayStatus = dateStr === todayStatusDate

          let statusIcon = blankIcon
          if (isTodayStatus) {
            if (todayStatus === '양호') statusIcon = goodIcon
            else if (todayStatus === '보통') statusIcon = normalIcon
            else if (todayStatus === '심각') statusIcon = badIcon
          }

          if (day === null) {
            return (
              <div
                key={idx}
                className="w-[30.66px] h-[60px] flex flex-col items-center justify-start mx-auto"
              />
            )
          }

          return (
            <div
              key={idx}
              className="w-[30.66px] h-[60px] flex flex-col items-center justify-start mx-auto"
            >
              <img
                src={statusIcon}
                alt="status"
                className="w-[28px] h-[35px] mb-[2px]"
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
