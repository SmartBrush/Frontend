interface BarChartProps {
  data: { label: string; value: number }[] // value: 0~100
  minPercent?: number // 막대 최소 높이(보이기용). 기본 8(%)
  showValue?: boolean // 수치 표시 여부
}

const BarChart = ({
  data,
  minPercent = 8,
  showValue = false,
}: BarChartProps) => {
  return (
    <div className="flex items-end justify-around w-full h-24 rounded-md p-1 bg-white">
      {data.map(({ label, value }, idx) => {
        const pct = Math.max(value, value === 0 ? 0 : minPercent)
        // 값이 0이면 진짜 0, 0보다 크면 최소 높이 보정
        return (
          <div key={idx} className="flex flex-col items-center w-8">
            {/* 트랙 */}
            <div className="relative w-5 h-16 rounded-md bg-gray-200 overflow-hidden">
              {/* 채움 */}
              <div
                className="absolute bottom-0 left-0 w-full bg-[#4E9366] transition-all duration-500"
                style={{ height: `${pct}%` }}
              />
            </div>
            {showValue && (
              <span className="text-[10px] mt-1 text-gray-500">
                {Math.round(value)}
              </span>
            )}
            <span className="text-[10px] mt-0.5 text-gray-600">{label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default BarChart
