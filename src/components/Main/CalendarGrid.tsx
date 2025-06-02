import type { DateCount } from './Calendar'
import blankIcon from '../../assets/Blank.svg'

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
              ? `${year}-${String(month + 1).padStart(2, '0')}-${String(
                  day,
                ).padStart(2, '0')}`
              : ''
          const count = markedDates.find((d) => d.date === dateStr)?.count ?? 0

          if (day === null) return <div key={idx} />

          return (
            <div
              key={idx}
              className="w-[30.66px] h-[55px] flex flex-col items-center justify-start mx-auto"
            >
              {count > 0 ? (
                <span
                  className={`w-2 h-2 rounded-full mt-[2px] mb-[3px] ${
                    count > 1 ? 'bg-red-500' : 'bg-orange-400'
                  }`}
                />
              ) : (
                <img
                  src={blankIcon}
                  alt="blank"
                  className="w-[30.66px] h-[30.66px] mb-[2px]"
                />
              )}

              <span className="text-sm text-black mb-[2px]">{day}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CalendarGrid
