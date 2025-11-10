// src/components/ProductRecommendation/MbtiCardList.tsx
// import { useSearchParams } from 'react-router-dom'
// import {
//   mbtiCardList,
//   type MbtiCardKey,
//   MBTI_KO_TO_KEY,
// } from '../../data/mbtiCardData'

// interface MbtiCardProps {
//   mbtiType?: MbtiCardKey | null
// }

// // 문자열 -> MbtiCardKey (한글/하이픈/공백/*_type 허용)
// function toMbtiKey(v: string | null): MbtiCardKey | null {
//   if (!v) return null
//   const norm = v
//     .trim()
//     .toLowerCase()
//     .replace(/[\s-]+/g, '_')
//     .replace(/_type$/, '')
//   const alias =
//     (MBTI_KO_TO_KEY as Record<string, string>)[v] || // 원문(한글 등)
//     (MBTI_KO_TO_KEY as Record<string, string>)[norm] || // 정규화 키
//     norm

//   return mbtiCardList.some((c) => c.type === alias)
//     ? (alias as MbtiCardKey)
//     : null
// }

// const MbtiCardList = ({ mbtiType }: MbtiCardProps) => {
//   const [params] = useSearchParams()
//   const isDemo = params.get('demo') === '1'
//   const paramType = toMbtiKey(params.get('mbti'))

//   // 우선순위: (데모면 URL 최우선) -> props -> URL -> (데모 기본값) -> null
//   const resolvedType: MbtiCardKey | null =
//     (isDemo && paramType) ||
//     mbtiType ||
//     paramType ||
//     (isDemo ? (mbtiCardList[0]?.type ?? null) : null)

//   if (!resolvedType) return null

//   const card = mbtiCardList.find((c) => c.type === resolvedType)
//   if (!card) return null

//   return (
//     <div className="relative mt-4">
//       {/* 내용 박스 */}
//       <div className="w-full rounded-2xl border-[1px] border-black bg-white px-5 py-5 pt-7">
//         <div className="text-sm text-gray-800 leading-6 whitespace-pre-line break-words space-y-2">
//           {card.good && (
//             <p className="flex gap-2">
//               <span>✅</span>
//               <span className="break-words">{card.good}</span>
//             </p>
//           )}
//           {card.bad && (
//             <p className="flex gap-2">
//               <span>❌</span>
//               <span className="break-words">{card.bad}</span>
//             </p>
//           )}
//           {card.tips && (
//             <p className="flex gap-2">
//               <span>💡</span>
//               <span className="break-words">{card.tips}</span>
//             </p>
//           )}
//         </div>
//       </div>

//       {/* MBTI pill */}
//       <div className="absolute -top-3 left-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4E9366] text-white text-sm font-bold shadow">
//         {card.title}
//       </div>

//       {/* 데모 배지 */}
//       {isDemo && (
//         <div className="absolute -top-3 right-4 px-2 py-0.5 text-xs rounded bg-black text-white">
//           DEMO
//         </div>
//       )}
//     </div>
//   )
// }

// export default MbtiCardList

import { mbtiCardList, type MbtiCardKey } from '../../data/mbtiCardData'

interface MbtiCardProps {
  mbtiType?: MbtiCardKey | null
}

const MbtiCardList = ({ mbtiType }: MbtiCardProps) => {
  if (!mbtiType) return null
  const card = mbtiCardList.find((c) => c.type === mbtiType)
  if (!card) return null

  return (
    <div className="relative mt-4">
      {/* 내용 박스 */}
      <div className="w-full rounded-2xl border-[1px] border-black bg-white px-5 py-5 pt-7 ">
        <div className="text-sm text-gray-800 leading-6 whitespace-pre-line break-words space-y-2">
          {card.good && (
            <p className="flex gap-2">
              <span>✅</span>
              <span className="break-words">{card.good}</span>
            </p>
          )}
          {card.bad && (
            <p className="flex gap-2">
              <span>❌</span>
              <span className="break-words">{card.bad}</span>
            </p>
          )}
          {card.tips && (
            <p className="flex gap-2">
              <span>💡</span>
              <span className="break-words">{card.tips}</span>
            </p>
          )}
        </div>
      </div>

      {/* MBTI pill */}
      <div className="absolute -top-3 left-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4E9366] text-white text-sm font-bold shadow">
        {card.title}
      </div>
    </div>
  )
}

export default MbtiCardList
