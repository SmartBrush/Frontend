// import { useMemo } from 'react'
// import type { ScalpMbtiType } from '../../types/scalp'
// import BarChart from './BarChart'
// import { mbtiData } from '../../data/mbtiData'

// interface ScalpMbtiCardProps {
//   mbtiType: ScalpMbtiType
// }

// const looksLikeEmail = (s?: string) => !!s && /.+@.+\..+/.test(s)

// const getDisplayName = (): string => {
//   try {
//     const keys = ['display_name', 'nickname', 'name', 'username']
//     for (const k of keys) {
//       const v = localStorage.getItem(k) || ''
//       if (v && !looksLikeEmail(v)) return v
//     }
//   } catch {
//     // noop
//   }
//   return '회원'
// }

// const ScalpMbtiCard = ({ mbtiType }: ScalpMbtiCardProps) => {
//   const { title, description, radarValues } = mbtiData[mbtiType]
//   const displayName = useMemo(getDisplayName, [])

//   return (
//     <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between border border-black">
//       {/* 좌측 텍스트 영역 */}
//       <div className="flex-1 space-y-1">
//         <p className="text-sm text-orange-600 font-semibold">
//           🔥 {displayName}님의 두피 MBTI
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

//       {/* 우측 간단 그래프 (아이콘처럼 축소) */}
//       <div className="w-24">
//         <BarChart data={radarValues.slice(0, 5)} />
//       </div>
//     </div>
//   )
// }

// export default ScalpMbtiCard

// import { useEffect, useState } from 'react'
// import type { ScalpMbtiType } from '../../types/scalp'
// import BarChart from './BarChart'
// import { mbtiData } from '../../data/mbtiData'

// interface ScalpMbtiCardProps {
//   mbtiType: ScalpMbtiType
// }

// const looksLikeEmail = (s?: string) => !!s && /.+@.+\..+/.test(s)

// const readDisplayName = (): string => {
//   try {
//     const keys = ['display_name', 'nickname', 'name', 'username'] as const
//     for (const k of keys) {
//       const v = localStorage.getItem(k) || ''
//       if (v && !looksLikeEmail(v)) return v
//     }
//   } catch {
//     //NOOP
//   }
//   return '회원'
// }

// // TS에 커스텀 이벤트 타입 추가 (한 번만 선언되면 됨)
// declare global {
//   interface WindowEventMap {
//     'profile-updated': Event
//   }
// }

// const ScalpMbtiCard = ({ mbtiType }: ScalpMbtiCardProps) => {
//   const { title, description, radarValues } = mbtiData[mbtiType]
//   const [displayName, setDisplayName] = useState<string>(readDisplayName())

//   useEffect(() => {
//     const refresh = () => setDisplayName(readDisplayName())
//     // 같은 탭: 우리가 쏘는 커스텀 이벤트
//     window.addEventListener('profile-updated', refresh)
//     // 다른 탭에서 localStorage 변경 시
//     window.addEventListener('storage', refresh)
//     return () => {
//       window.removeEventListener('profile-updated', refresh)
//       window.removeEventListener('storage', refresh)
//     }
//   }, [])

//   return (
//     <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between border border-black">
//       <div className="flex-1 space-y-1">
//         <p className="text-sm text-orange-600 font-semibold">
//           🔥 {displayName}님의 두피 MBTI
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
//       <div className="w-24">
//         <BarChart data={radarValues.slice(0, 5)} />
//       </div>
//     </div>
//   )
// }

// export default ScalpMbtiCard

// import { useEffect, useState } from 'react'
// import type { ScalpMbtiType } from '../../types/scalp'
// import BarChart from './BarChart'
// import { mbtiData } from '../../data/mbtiData'

// interface ScalpMbtiCardProps {
//   mbtiType: ScalpMbtiType
//   displayName?: string
// }

// const looksLikeEmail = (s?: string) => !!s && /.+@.+\..+/.test(s)
// const readDisplayName = (): string => {
//   try {
//     const keys = ['display_name', 'nickname', 'name', 'username'] as const
//     for (const k of keys) {
//       const v = localStorage.getItem(k) || ''
//       if (v && !looksLikeEmail(v)) return v
//     }
//   } catch {
//     //noop
//   }
//   return '회원'
// }

// // 커스텀 이벤트 타입(프로젝트 어딘가 한 번만 선언되면 됨)
// declare global {
//   interface WindowEventMap {
//     'profile-updated': Event
//   }
// }

// const ScalpMbtiCard = ({ mbtiType, displayName }: ScalpMbtiCardProps) => {
//   const { title, description, radarValues } = mbtiData[mbtiType]
//   // 1) 우선 prop, 없으면 localStorage
//   const [name, setName] = useState<string>(displayName ?? readDisplayName())

//   // 2) 부모 prop이 바뀌면 즉시 반영 → “한박자 늦음” 해결 포인트
//   useEffect(() => {
//     if (displayName) setName(displayName)
//   }, [displayName])

//   // 3) 같은 탭/다른 탭에서 프로필 갱신되는 경우도 반영
//   useEffect(() => {
//     const refresh = () => setName(displayName ?? readDisplayName())
//     window.addEventListener('profile-updated', refresh)
//     window.addEventListener('storage', refresh) // 다른 탭
//     return () => {
//       window.removeEventListener('profile-updated', refresh)
//       window.removeEventListener('storage', refresh)
//     }
//   }, [displayName])

//   return (
//     <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between border border-black">
//       <div className="flex-1 space-y-1">
//         <p className="text-sm text-orange-600 font-semibold">
//           🔥 {name}님의 두피 MBTI
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
//       <div className="w-24">
//         <BarChart data={radarValues.slice(0, 5)} />
//       </div>
//     </div>
//   )
// }

// export default ScalpMbtiCard

// src/components/Recommendation/ScalpMbtiCard.tsx
import type { ScalpMbtiType } from '../../types/scalp'
import BarChart from './BarChart'
import { mbtiData } from '../../data/mbtiData'

interface ScalpMbtiCardProps {
  mbtiType: ScalpMbtiType
  displayName: string // ✅ 부모에서 내려주는 이름만 사용
}

const ScalpMbtiCard = ({ mbtiType, displayName }: ScalpMbtiCardProps) => {
  const { title, description, radarValues } = mbtiData[mbtiType]

  return (
    <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between border border-black">
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
      <div className="w-24">
        <BarChart data={radarValues.slice(0, 5)} />
      </div>
    </div>
  )
}

export default ScalpMbtiCard
