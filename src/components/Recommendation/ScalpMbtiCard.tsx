// import { useSearchParams } from 'react-router-dom'
// import type { ScalpMbtiType } from '../../types/scalp-mbti'
// import BarChart from './BarChart'
// import { mbtiData } from '../../data/mbtiData'

// interface ScalpMbtiCardProps {
//   mbtiType?: ScalpMbtiType | null
//   displayName: string
//   diagnosed?: boolean
//   onClickDiagnose?: () => void
// }

// const DIAG_FLAG_KEY = 'scalp_diagnosed'

// // 문자열 -> ScalpMbtiType 안전 변환
// function toScalpKey(v: string | null): ScalpMbtiType | null {
//   if (!v) return null
//   return Object.prototype.hasOwnProperty.call(mbtiData, v)
//     ? (v as ScalpMbtiType)
//     : null
// }

// function toChartData(
//   ratings: {
//     oil: number | [number, number]
//     sensitivity: number | [number, number]
//     scaling: number | [number, number]
//   },
//   { toPercent = true } = {},
// ) {
//   const pick = (v: number | [number, number]) =>
//     Array.isArray(v) ? Math.round((v[0] + v[1]) / 2) : v

//   const lvl = {
//     oil: pick(ratings.oil),
//     sensitivity: pick(ratings.sensitivity),
//     scaling: pick(ratings.scaling),
//   }
//   const map = (x: number) => (toPercent ? Math.round((x / 4) * 100) : x)

//   return [
//     { label: '유분', value: map(lvl.oil) },
//     { label: '민감도', value: map(lvl.sensitivity) },
//     { label: '각질', value: map(lvl.scaling) },
//   ]
// }

// const ScalpMbtiCard = ({
//   mbtiType,
//   displayName,
//   diagnosed,
//   onClickDiagnose,
// }: ScalpMbtiCardProps) => {
//   const [params] = useSearchParams()
//   const isDemo = params.get('demo') === '1'
//   const paramType = toScalpKey(params.get('mbti'))

//   // 진단 여부 우선순위: props -> 로컬스토리지 -> 데모 강제 true
//   const localDiag =
//     typeof window !== 'undefined' && localStorage.getItem(DIAG_FLAG_KEY) === '1'
//   const isDiagnosed =
//     isDemo || (typeof diagnosed === 'boolean' ? diagnosed : localDiag)
//   // 타입 우선순위: props -> URL 파라미터 -> 데모 기본값(첫 키)
//   const resolvedType: ScalpMbtiType | null =
//     mbtiType ??
//     paramType ??
//     (isDemo ? (Object.keys(mbtiData)[0] as ScalpMbtiType) : null)

//   // 진단 전 / 타입 없음 → 안내 카드
//   if (!isDiagnosed || !resolvedType) {
//     return (
//       <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
//         <p className="text-sm font-semibold text-gray-800">
//           {displayName}님의 두피 MBTI
//         </p>
//         <p className="mt-1 text-sm">두피 MBTI가 아직 없습니다!</p>
//         {onClickDiagnose && (
//           <button
//             type="button"
//             onClick={onClickDiagnose}
//             className="mt-3 px-3 py-2 rounded-lg bg-[#4E9366] text-white text-sm font-bold"
//           >
//             사진으로 진단하기
//           </button>
//         )}
//       </div>
//     )
//   }

//   const info = mbtiData[resolvedType]
//   if (!info) {
//     return (
//       <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
//         <p className="text-sm font-semibold text-gray-800">
//           {displayName}님의 두피 MBTI
//         </p>
//         <p className="mt-1 text-sm text-red-600">
//           알 수 없는 MBTI 타입입니다. 다시 시도해 주세요.
//         </p>
//       </div>
//     )
//   }

//   const { title, description, ratings } = info
//   const chartData = toChartData(ratings, { toPercent: true })

//   return (
//     <div
//       className="bg-white p-4 rounded-2xl shadow flex items-center justify-between border border-black relative"
//       data-mbti-block
//     >
//       <div className="flex-1 space-y-1">
//         <p className="text-sm text-orange-600 font-semibold">
//           {displayName}님의 두피 MBTI
//         </p>
//         <h2 className="text-lg font-bold text-gray-800">{title}</h2>
//         <div>
//           {description.split('\n').map((line, i) => (
//             <p key={i} className="text-sm">
//               {line}
//             </p>
//           ))}
//         </div>
//       </div>
//       <div className="w-32 h-25">
//         <BarChart data={chartData} minPercent={8} showValue={false} />
//       </div>

//       {isDemo && (
//         <div className="absolute -top-3 right-3 px-2 py-0.5 text-xs rounded bg-black text-white">
//           DEMO
//         </div>
//       )}
//     </div>
//   )
// }

// export default ScalpMbtiCard

import type { ScalpMbtiType } from '../../types/scalp-mbti'
import BarChart from './BarChart'
import { mbtiData } from '../../data/mbtiData'

interface ScalpMbtiCardProps {
  mbtiType?: ScalpMbtiType | null
  displayName: string
  diagnosed?: boolean
  onClickDiagnose?: () => void
}

const DIAG_FLAG_KEY = 'scalp_diagnosed'

function toChartData(
  ratings: {
    oil: number | [number, number]
    sensitivity: number | [number, number]
    scaling: number | [number, number]
  },
  { toPercent = true } = {},
) {
  const pick = (v: number | [number, number]) => {
    if (Array.isArray(v)) return Math.round((v[0] + v[1]) / 2)
    return v
  }
  const lvl = {
    oil: pick(ratings.oil),
    sensitivity: pick(ratings.sensitivity),
    scaling: pick(ratings.scaling),
  }
  const map = (x: number) => (toPercent ? Math.round((x / 4) * 100) : x)

  return [
    { label: '유분', value: map(lvl.oil) },
    { label: '민감도', value: map(lvl.sensitivity) },
    { label: '각질', value: map(lvl.scaling) },
  ]
}

const ScalpMbtiCard = ({
  mbtiType,
  displayName,
  diagnosed,
  onClickDiagnose,
}: ScalpMbtiCardProps) => {
  // 부모가 diagnosed를 내려주면 그걸 우선, 없으면 로컬스토리지 플래그 사용
  const isDiagnosed =
    typeof diagnosed === 'boolean'
      ? diagnosed
      : typeof window !== 'undefined' &&
        localStorage.getItem(DIAG_FLAG_KEY) === '1'

  // 진단 전 / 타입 없음 → 안내 카드
  if (!isDiagnosed || !mbtiType) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
        <p className="text-sm font-semibold text-gray-800">
          {displayName}님의 두피 MBTI
        </p>
        <p className="mt-1 text-sm">두피 MBTI가 아직 없습니다!</p>
        {onClickDiagnose && (
          <button
            type="button"
            onClick={onClickDiagnose}
            className="mt-3 px-3 py-2 rounded-lg bg-[#4E9366] text-white text-sm font-bold"
          >
            사진으로 진단하기
          </button>
        )}
      </div>
    )
  }

  // 타입 존재 시 데이터 조회 (안전 가드)
  const info = mbtiData[mbtiType]
  if (!info) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
        <p className="text-sm font-semibold text-gray-800">
          {displayName}님의 두피 MBTI
        </p>
        <p className="mt-1 text-sm text-red-600">
          알 수 없는 MBTI 타입입니다. 다시 시도해 주세요.
        </p>
      </div>
    )
  }

  const { title, description, ratings } = info
  const chartData = toChartData(ratings, { toPercent: true })

  return (
    <div
      className="bg-white p-4 rounded-2xl shadow flex items-center justify-between border border-black"
      data-mbti-block
    >
      <div className="flex-1 space-y-1">
        <p className="text-sm text-orange-600 font-semibold">
          🔥 {displayName}님의 두피 MBTI
        </p>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <div>
          {description.split('\n').map((line, i) => (
            <p key={i} className="text-sm">
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className="w-32 h-25">
        <BarChart data={chartData} minPercent={8} showValue={false} />
      </div>
    </div>
  )
}

export default ScalpMbtiCard
