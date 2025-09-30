import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../apis/api'
import ProductPreviewList from '../components/Recommendation/ProductPreviewList'
import HabitChallengeList from '../components/Recommendation/HabitChallengeList'
import ScalpMbtiCard from '../components/Recommendation/ScalpMbtiCard'
import { labelToType, type ScalpMbtiType } from '../types/scalp-mbti'
import Back from '../assets/back.svg'
import { fireHeartConfetti } from '../utils/heartConfetti'

type MyPageDTO = { nickname: string }

type ScalpMbtiSummary = {
  nickname?: string
  email?: string
  scalpMbti?: string // 예: "지성 민감형"
  diagnosedDate?: string
}

const RecommendPage = () => {
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState<string>('회원')
  const [mbtiType, setMbtiType] = useState<ScalpMbtiType | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchMyPage = API.get<MyPageDTO>('/api/mypage')
      .then((res) => res.data)
      .catch(() => null)

    const fetchMbti = API.get<ScalpMbtiSummary>('/api/me/scalp-mbti')
      .then((res) => res.data)
      .catch(() => null)

    ;(async () => {
      const [my, mbti] = await Promise.all([fetchMyPage, fetchMbti])
      if (!mounted) return

      const nick = (my?.nickname ?? '').trim()
      if (nick) setDisplayName(nick)

      setMbtiType(labelToType(mbti?.scalpMbti ?? null))
    })()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <div
        className="sticky top-0 z-50 bg-white
                px-4 py-[15px] flex items-center text-[20px] font-semibold text-gray-800"
      >
        <button
          onClick={() => navigate('/')}
          className="mr-2 cursor-pointer"
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

          <ScalpMbtiCard
            mbtiType={mbtiType}
            diagnosed={mbtiType !== null}
            displayName={displayName}
          />
        </header>

        <section className="my-[24px]">
          <HabitChallengeList onComplete={() => fireHeartConfetti()} />
        </section>

        <section className="my-[24px]">
          <div className="flex justify-between items-baseline mb-[8px]">
            <h2 className="text-lg font-semibold">추천 제품🛍️</h2>
            <button
              type="button"
              onClick={() => navigate('/productRecommendation')}
              className="text-sm text-gray-500"
            >
              추천제품 더 보러가기 &gt;
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
