import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

interface CalendarHeaderProps {
  year: number
  month: number // 0~11
  onSelect: (year: number, month: number) => void
}

function CalendarHeader({ year, month, onSelect }: CalendarHeaderProps) {
  const [open, setOpen] = useState(false)
  const popRef = useRef<HTMLDivElement>(null)

  const yearListRef = useRef<HTMLUListElement>(null)
  const monthListRef = useRef<HTMLUListElement>(null)

  const years = Array.from({ length: 11 }, (_, i) => year - 5 + i)
  const months = Array.from({ length: 12 }, (_, i) => i)

  // 외부 클릭 시 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node))
        setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  // 드롭다운이 열릴 때, 선택된 연도/월 위치로 스크롤 이동
  useEffect(() => {
    if (open) {
      const yearItem = yearListRef.current?.querySelector(
        `li[data-year="${year}"]`,
      ) as HTMLLIElement | null
      const monthItem = monthListRef.current?.querySelector(
        `li[data-month="${month}"]`,
      ) as HTMLLIElement | null

      yearItem?.scrollIntoView({ block: 'center', behavior: 'instant' })
      monthItem?.scrollIntoView({ block: 'center', behavior: 'instant' })
    }
  }, [open, year, month])

  return (
    <div className="relative flex items-center justify-between px-4 py-3 border-b border-gray-200">
      {/* 현재 연/월 */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1 text-[17px] font-semibold text-[#222]"
      >
        <span>
          {year}년 {month + 1}월
        </span>
        {open ? (
          <ChevronUp size={18} className="text-[#222]" />
        ) : (
          <ChevronDown size={18} className="text-[#222]" />
        )}
      </button>

      <HelpCircle size={18} className="text-[#555]" />

      {/* 드롭다운 */}
      {open && (
        <div
          ref={popRef}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-[260px] p-3"
        >
          <div className="flex gap-25 mb-2 px-1 text-sm text-gray-600 font-semibold">
            <span>연도</span>
            <span>월</span>
          </div>

          <div className="flex gap-3">
            {/* 연도 리스트 */}
            <ul
              ref={yearListRef}
              className="flex-1 max-h-[180px] overflow-y-auto border border-gray-200 rounded-lg p-1 scroll-smooth"
            >
              {years.map((y) => (
                <li
                  key={y}
                  data-year={y}
                  onClick={() => onSelect(y, month)}
                  className={`text-center py-1.5 rounded-md cursor-pointer text-[15px] ${
                    y === year
                      ? 'bg-[#3D7450] text-white font-semibold'
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {y}년
                </li>
              ))}
            </ul>

            {/* 월 리스트 */}
            <ul
              ref={monthListRef}
              className="flex-1 max-h-[180px] overflow-y-auto border border-gray-200 rounded-lg p-1 scroll-smooth"
            >
              {months.map((m) => (
                <li
                  key={m}
                  data-month={m}
                  onClick={() => {
                    onSelect(year, m)
                    setOpen(false)
                  }}
                  className={`text-center py-1.5 rounded-md cursor-pointer text-[15px] ${
                    m === month
                      ? 'bg-[#3D7450] text-white font-semibold'
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {m + 1}월
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarHeader
