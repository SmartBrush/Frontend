// import { useNavigate } from 'react-router-dom'
// import ProductPreviewList from '../components/Recommendation/ProductPreviewList'
// import HabitChallengeList from '../components/Recommendation/HabitChallengeList'
// // import ConfettiEffect from '../components/Recommendation/ConfettiEffect'
// import ScalpMbtiCard from '../components/Recommendation/ScalpMbtiCard'
// // import { useState } from 'react'
// import { fireHeartConfetti } from '../utils/heartConfetti'
// import Back from '../assets/back.svg'

// const RecommendPage = () => {
//   const navigate = useNavigate()
//   // const [showConfetti, setShowConfetti] = useState(false)

//   return (
//     <>
//       <div className="px-[20px] pt-[20px] flex items-center text-lg font-semibold text-gray-800">
//         <button
//           onClick={() => navigate('/')}
//           className="mr-2 cursor-pointer"
//           aria-label="뒤로가기"
//         >
//           <img src={Back} alt="뒤로가기" className="w-4 h-4" />
//         </button>
//         <span>제품 추천</span>
//       </div>
//       <div
//         id="confetti-container"
//         className="relative pr-4 pl-4 bg-gray-50 min-h-screen pb-[80px]"
//       >
//         {/* {showConfetti && <ConfettiEffect />} */}
//         {/* 헤더 */}
//         <header className="mb-[16px]">
//           <h1 className="text-xl font-bold">
//             김도영님을 위해 또또가 준비했어요{' '}
//           </h1>
//           <ScalpMbtiCard mbtiType="dry_sensitive_type" />
//         </header>

//         {/* 습관 챌린지 */}
//         <section className="my-[24px]">
//           <HabitChallengeList
//             onComplete={() => {
//               fireHeartConfetti()
//               // setShowConfetti(false)
//             }}
//           />
//         </section>
//         {/* 제품 추천 */}
//         <section className="my-[24px]">
//           <div className="flex justify-between items-baseline mb-[8px]">
//             <h2 className="text-lg font-semibold">
//               김도영님을 위한 추천 제품🛍️
//             </h2>
//             <button
//               type="button"
//               onClick={() => navigate('/productRecommendation')}
//               className="text-sm text-gray-500"
//             >
//               더 보기 &gt;
//             </button>
//           </div>
//           <ProductPreviewList
//             onSelect={(id) => navigate(`/product/${id}`)}
//             limit={5}
//           />
//         </section>
//       </div>
//     </>
//   )
// }

// export default RecommendPage
//

// src/pages/RecommendPage.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../apis/api'
import ProductPreviewList from '../components/Recommendation/ProductPreviewList'
import HabitChallengeList from '../components/Recommendation/HabitChallengeList'
import ScalpMbtiCard from '../components/Recommendation/ScalpMbtiCard'
import { fireHeartConfetti } from '../utils/heartConfetti'
import Back from '../assets/back.svg'

const looksLikeEmail = (s?: string) => !!s && /.+@.+\..+/.test(s)

type ProfileChunk = {
  name?: string
  nickname?: string
  username?: string
}

type MyPageData = ProfileChunk & {
  user?: ProfileChunk
  profile?: ProfileChunk
}

type Envelope<T> = T | { data: T } | { result: T }

const unwrap = <T,>(x: Envelope<T>): T => {
  if ('data' in (x as object)) return (x as { data: T }).data
  if ('result' in (x as object)) return (x as { result: T }).result
  return x as T
}

const pickName = (d: MyPageData): string | null => {
  const cands = [
    d.nickname,
    d.name,
    d.username,
    d.user?.nickname,
    d.user?.name,
    d.profile?.nickname,
    d.profile?.name,
  ]
  for (const c of cands) {
    if (c && !looksLikeEmail(c)) return c
  }
  return null
}

const RecommendPage = () => {
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState<string>('고객')

  useEffect(() => {
    // 1) 캐시 우선
    const cached =
      localStorage.getItem('display_name') ||
      localStorage.getItem('nickname') ||
      localStorage.getItem('name') ||
      localStorage.getItem('username')

    if (cached && !looksLikeEmail(cached)) {
      setDisplayName(cached)
      return
    }

    // 2) 프로필 한 번만 조회 (API 인스턴스 사용)
    ;(async () => {
      const endpoints = [
        '/api/mypage', // 팀이 실제로 쓰는 엔드포인트를 맨 앞에
        '/api/mypage/info',
        '/api/user/me',
        '/api/users/me',
        '/api/profile',
        '/api/me',
      ]
      for (const url of endpoints) {
        try {
          const res = await API.get<Envelope<MyPageData>>(url)
          const me = unwrap(res.data)
          const name = pickName(me)
          if (name) {
            localStorage.setItem('display_name', name)
            setDisplayName(name)
            break
          }
        } catch {
          // 다음 후보 시도
        }
      }
    })()
  }, [])

  return (
    <>
      {/* 상단 헤더 */}
      <div className="pt-[10px] pr-[20px] pl-2 flex items-center text-lg font-semibold text-gray-800">
        <button
          onClick={() => navigate('/')}
          className="mr-2"
          aria-label="뒤로가기"
        >
          <img src={Back} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <span>제품 추천</span>
      </div>

      {/* 본문 */}
      <div
        id="confetti-container"
        className="relative min-h-screen px-4 pt-[10px]
                   bg-[linear-gradient(to_bottom,_#CEF7D0_0%,_#EFFEEC_12%,_#FFFFFF_35%)]"
      >
        <header className="mb-[10px]">
          <h1 className="text-xl font-bold mb-1">
            {displayName}님을 위해 또또가 준비했어요
          </h1>
          <ScalpMbtiCard mbtiType="dry_sensitive_type" />
        </header>

        <section className="my-[24px]">
          <HabitChallengeList onComplete={() => fireHeartConfetti()} />
        </section>

        <section className="my-[24px]">
          <div className="flex justify-between items-baseline mb-[8px]">
            <h2 className="text-lg font-semibold">
              {displayName}님을 위한 추천 제품🛍️
            </h2>
            <button
              type="button"
              onClick={() => navigate('/productRecommendation')}
              className="text-sm text-gray-500"
            >
              더 보기 &gt;
            </button>
          </div>
          <ProductPreviewList
            onSelect={(id) => navigate(`/product/${id}`)}
            limit={5}
          />
        </section>
      </div>
    </>
  )
}

export default RecommendPage
