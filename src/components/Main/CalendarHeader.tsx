interface CalendarHeaderProps {
  year: number
  month: number
  onMoveMonth: (direction: number) => void
}

const monthNames = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
]

function CalendarHeader({ year, month, onMoveMonth }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between my-4">
      <button
        onClick={() => onMoveMonth(-1)}
        className="px-2 py-1 rounded text-black"
      >
        ←
      </button>
      <span className="font-semibold text-black">
        {year}년 {monthNames[month]}
      </span>
      <button
        onClick={() => onMoveMonth(1)}
        className="px-2 py-1 rounded text-black"
      >
        →
      </button>
    </div>
  )
}

export default CalendarHeader
