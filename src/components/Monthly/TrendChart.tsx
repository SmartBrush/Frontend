// // src/components/Monthly/TrendChart.tsx
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
//   CartesianGrid,
// } from 'recharts'
// import { useEffect, useMemo, useState } from 'react'
// import type { MonthlyRecord } from '../../types/report'

// interface Props {
//   data: MonthlyRecord[]
//   metricKey: 'density' | 'oil' | 'thickness' | 'sensitivity' | 'scaling'
// }

// // Recharts 이벤트에서 필요한 최소 속성 (any 금지)
// type ChartStateLite = { activeLabel?: string | number }
// const isChartState = (x: unknown): x is ChartStateLite =>
//   typeof x === 'object' &&
//   x !== null &&
//   'activeLabel' in (x as Record<string, unknown>)

// export default function TrendChart({ data, metricKey }: Props) {
//   // label: '05', month: '2025-05'
//   const chartData = useMemo(
//     () =>
//       data.map((d) => ({
//         month: d.month,
//         label: d.month.slice(5),
//         value: d.values[metricKey],
//       })),
//     [data, metricKey],
//   )

//   // ✅ “선택한 월 레이블”만 상태로 보관 (값은 chartData에서 계산)
//   const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

//   useEffect(() => {
//     if (chartData.length > 0)
//       setSelectedLabel(chartData[chartData.length - 1].label)
//   }, [chartData])

//   const current = useMemo(() => {
//     if (!selectedLabel) return null
//     return chartData.find((d) => d.label === selectedLabel) ?? null
//   }, [chartData, selectedLabel])

//   const displayLabel = current
//     ? `${current.month.slice(0, 4)}년 ${current.label}월 평균 ${current.value.toFixed(1)}%`
//     : ''

//   const pickLabel = (s: unknown) => {
//     if (!isChartState(s) || s.activeLabel == null) return
//     setSelectedLabel(String(s.activeLabel).padStart(2, '0'))
//   }

//   return (
//     <div className="relative rounded-2xl border border-black bg-white p-3 pt-7 shadow-sm">
//       {/* 상단 중앙 라벨 */}
//       {displayLabel && (
//         <div
//           className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 mt-4
//                         rounded-full border border-gray-300 bg-gray-200 px-3 py-1
//                         text-[11px] font-semibold text-gray-700 shadow"
//         >
//           {displayLabel}
//         </div>
//       )}

//       {/* 차트 영역 (안쪽 추가 border 없음) */}
//       <div className="h-[260px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={chartData}
//             // 좌/우 동일 패딩으로 가운데 정렬 느낌
//             margin={{ left: 12, right: 12, top: 6, bottom: 6 }}
//             onMouseDown={pickLabel}
//             onTouchStart={pickLabel}
//           >
//             {/* 수평선만 얇게 유지 */}
//             <CartesianGrid vertical={false} stroke="#E5E7EB" />

//             {/* 축 라벨/숫자 완전 제거 + 내부 여백 0으로 */}
//             <XAxis
//               dataKey="label"
//               tick={false}
//               axisLine={false}
//               tickLine={false}
//               height={0}
//               padding={{ left: 28, right: 28 }}
//             />
//             <YAxis
//               domain={[0, 100]}
//               tick={false}
//               axisLine={false}
//               tickLine={false}
//               width={0}
//             />

//             {/* 툴팁 박스 비표시 */}
//             <Tooltip content={() => null} cursor={false} />

//             {/* 가로줄 5개 고정 */}
//             {[0, 25, 50, 75, 100].map((y) => (
//               <ReferenceLine
//                 key={y}
//                 y={y}
//                 stroke="#E5E7EB"
//                 ifOverflow="extendDomain"
//               />
//             ))}

//             {/* 세로 점선: 선택한 월 */}
//             {current && (
//               <ReferenceLine
//                 x={current.label}
//                 stroke="#9CA3AF"
//                 strokeDasharray="4 4"
//                 ifOverflow="extendDomain"
//               />
//             )}

//             {/* 회색 라인 + 초록 점 */}
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke="#9CA3AF"
//               strokeWidth={3.5}
//               dot={{ r: 5, fill: '#4E9366', stroke: '#4E9366' }}
//               activeDot={{ r: 6 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   )
// }
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from 'recharts'
import { useMemo } from 'react'
import type { MonthlyRecord, MetricKey } from '../../types/report'

// Recharts 이벤트에서 필요한 최소 속성 (any 금지)
type ChartStateLite = { activeLabel?: string | number }
const isChartState = (x: unknown): x is ChartStateLite =>
  typeof x === 'object' &&
  x !== null &&
  'activeLabel' in (x as Record<string, unknown>)

interface Props {
  data: MonthlyRecord[]
  metricKey: MetricKey
  /** 부모에서 관리하는 선택 월 레이블 (예: '07') */
  selectedLabel: string | null
  /** 사용자가 차트에서 월을 선택했을 때 부모에게 알려줌 */
  onSelectLabel: (label: string) => void
}

export default function TrendChart({
  data,
  metricKey,
  selectedLabel,
  onSelectLabel,
}: Props) {
  // label: '05', month: '2025-05'
  const chartData = useMemo(
    () =>
      data.map((d) => ({
        month: d.month, // 'YYYY-MM'
        label: d.month.slice(5), // 'MM'
        value: d.values[metricKey], // 0~100
      })),
    [data, metricKey],
  )

  const current = useMemo(() => {
    if (!selectedLabel) return null
    return chartData.find((d) => d.label === selectedLabel) ?? null
  }, [chartData, selectedLabel])

  const displayLabel = current
    ? `${current.month.slice(0, 4)}년 ${current.label}월 평균 ${current.value.toFixed(1)}%`
    : ''

  const pickLabel = (s: unknown) => {
    if (!isChartState(s) || s.activeLabel == null) return
    onSelectLabel(String(s.activeLabel).padStart(2, '0'))
  }

  return (
    <div className="relative rounded-2xl border border-black bg-white p-3 pt-7 shadow-sm">
      {/* 상단 중앙 라벨 */}
      {displayLabel && (
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 mt-4 
                     rounded-full border border-gray-300 bg-gray-200 px-3 py-1
                     text-[11px] font-semibold text-gray-700 shadow"
        >
          {displayLabel}
        </div>
      )}

      {/* 차트 */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ left: 12, right: 12, top: 6, bottom: 6 }}
            onMouseDown={pickLabel}
            onTouchStart={pickLabel}
          >
            <CartesianGrid vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="label"
              tick={false}
              axisLine={false}
              tickLine={false}
              height={0}
              padding={{ left: 28, right: 28 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={false}
              axisLine={false}
              tickLine={false}
              width={0}
            />
            <Tooltip content={() => null} cursor={false} />

            {[0, 25, 50, 75, 100].map((y) => (
              <ReferenceLine
                key={y}
                y={y}
                stroke="#E5E7EB"
                ifOverflow="extendDomain"
              />
            ))}

            {selectedLabel && (
              <ReferenceLine
                x={selectedLabel}
                stroke="#9CA3AF"
                strokeDasharray="4 4"
                ifOverflow="extendDomain"
              />
            )}

            <Line
              type="monotone"
              dataKey="value"
              stroke="#9CA3AF"
              strokeWidth={3.5}
              dot={{ r: 5, fill: '#4E9366', stroke: '#4E9366' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
