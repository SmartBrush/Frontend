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
// import { useMemo } from 'react'
// import type { MonthlyRecord, MetricKey } from '../../types/report'

// // Recharts 이벤트에서 필요한 최소 속성
// type ChartStateLite = { activeLabel?: string | number }
// const isChartState = (x: unknown): x is ChartStateLite =>
//   typeof x === 'object' &&
//   x !== null &&
//   'activeLabel' in (x as Record<string, unknown>)

// interface Props {
//   data: MonthlyRecord[]
//   metricKey: MetricKey
//   selectedLabel: string | null
//   onSelectLabel: (label: string) => void
// }

// export default function TrendChart({
//   data,
//   metricKey,
//   selectedLabel,
//   onSelectLabel,
// }: Props) {
//   const chartData = useMemo(
//     () =>
//       data.map((d) => ({
//         month: d.month,
//         label: d.month.slice(5),
//         value: d.values[metricKey], // 0~100
//       })),
//     [data, metricKey],
//   )

//   const current = useMemo(() => {
//     if (!selectedLabel) return null
//     return chartData.find((d) => d.label === selectedLabel) ?? null
//   }, [chartData, selectedLabel])

//   const displayLabel = current
//     ? `${current.month.slice(0, 4)}년 ${current.label}월 평균 ${current.value.toFixed(1)}점`
//     : ''

//   const pickLabel = (s: unknown) => {
//     if (!isChartState(s) || s.activeLabel == null) return
//     onSelectLabel(String(s.activeLabel).padStart(2, '0'))
//   }

//   return (
//     <div className="relative rounded-2xl border border-black bg-white p-3 pt-10 shadow-sm">
//       {/* 상단 중앙 라벨 */}
//       {displayLabel && (
//         <div
//           className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 mt-5.5
//                      rounded-full border border-gray-300 bg-gray-200 px-10 py-1.5
//                      text-[15px] font-semibold text-gray-700 shadow text-center z-5"
//         >
//           {displayLabel}
//         </div>
//       )}

//       {/* 차트 */}
//       <div className="h-[260px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={chartData}
//             margin={{ left: 12, right: 12, top: 6, bottom: 6 }}
//             onMouseDown={pickLabel}
//             onTouchStart={pickLabel}
//             style={{ outline: 'none' }}
//             tabIndex={-1}
//           >
//             <CartesianGrid vertical={false} stroke="#E5E7EB" />
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
//             <Tooltip content={() => null} cursor={false} />

//             {[0, 25, 50, 75, 100].map((y) => (
//               <ReferenceLine
//                 key={y}
//                 y={y}
//                 stroke="#E5E7EB"
//                 ifOverflow="extendDomain"
//               />
//             ))}

//             {selectedLabel && (
//               <ReferenceLine
//                 x={selectedLabel}
//                 stroke="#9CA3AF"
//                 strokeDasharray="4 4"
//                 ifOverflow="extendDomain"
//               />
//             )}

//             <Line
//               type="linear"
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

// Recharts 이벤트에서 필요한 최소 속성
type ChartStateLite = { activeLabel?: string | number }
const isChartState = (x: unknown): x is ChartStateLite =>
  typeof x === 'object' &&
  x !== null &&
  'activeLabel' in (x as Record<string, unknown>)

interface Props {
  data: MonthlyRecord[]
  metricKey: MetricKey
  selectedLabel: string | null
  onSelectLabel: (label: string) => void
  /** 한 화면에 보일 개수 (기본 3개월) */
  visibleCount?: number
  /** 포인트 간 가로 간격(px) (기본 120px) */
  pointWidth?: number
}

export default function TrendChart({
  data,
  metricKey,
  selectedLabel,
  onSelectLabel,
  visibleCount = 3,
  pointWidth = 120,
}: Props) {
  const chartData = useMemo(
    () =>
      data.map((d) => ({
        month: d.month,
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
    ? `${current.month.slice(0, 4)}년 ${current.label}월 평균 ${current.value.toFixed(1)}점`
    : ''

  const pickLabel = (s: unknown) => {
    if (!isChartState(s) || s.activeLabel == null) return
    onSelectLabel(String(s.activeLabel).padStart(2, '0'))
  }

  // 🔥 가로 스크롤 폭 설정: 데이터 개수 * 간격 (최소는 보이는 개수 * 간격)
  const innerWidth = Math.max(
    chartData.length * pointWidth,
    visibleCount * pointWidth,
  )

  return (
    <div className="relative rounded-2xl border border-black bg-white p-3 pt-10 shadow-sm">
      {/* 상단 중앙 라벨 */}
      {displayLabel && (
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 mt-5.5 
                     rounded-full border border-gray-300 bg-gray-200 px-10 py-1.5
                     text-[15px] font-semibold text-gray-700 shadow text-center z-5"
        >
          {displayLabel}
        </div>
      )}

      {/* 차트: 가로 스크롤 가능 래퍼 */}
      <div
        className="h-[260px] overflow-x-auto overflow-y-hidden overscroll-x-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* 스크롤 대상의 실제 너비를 데이터에 맞춰 늘림 */}
        <div style={{ width: innerWidth, height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ left: 12, right: 12, top: 6, bottom: 6 }}
              onMouseDown={pickLabel}
              onTouchStart={pickLabel}
              style={{ outline: 'none' }}
              tabIndex={-1}
            >
              <CartesianGrid vertical={false} stroke="#E5E7EB" />
              {/* 눈금/축은 그대로. label은 'MM' 값 */}
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
                type="linear"
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
    </div>
  )
}
