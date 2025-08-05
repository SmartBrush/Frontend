import { useNavigate } from 'react-router-dom'
import ProductPreviewList from '../components/Recommendation/ProductPreviewList'
import HabitChallengeList from '../components/Recommendation/HabitChallengeList'
// import ConfettiEffect from '../components/Recommendation/ConfettiEffect'
import ScalpMbtiCard from '../components/Recommendation/ScalpMbtiCard'
// import { useState } from 'react'
import { fireHeartConfetti } from '../utils/heartConfetti'

const RecommendPage = () => {
  const navigate = useNavigate()
  // const [showConfetti, setShowConfetti] = useState(false)

  return (
    <div
      id="confetti-container"
      className="relative p-4 bg-gray-50 min-h-screen pb-[80px]"
    >
      {/* {showConfetti && <ConfettiEffect />} */}
      {/* 헤더 */}
      <header className="mb-[16px]">
        <h1 className="text-xl font-bold">
          김도영님을 위해 또또가 준비했어요{' '}
        </h1>
        <ScalpMbtiCard mbtiType="dry_sensitive_type" />
      </header>

      {/* 습관 챌린지 */}
      <section className="my-[24px]">
        <HabitChallengeList
          onComplete={() => {
            fireHeartConfetti()
            // setShowConfetti(false)
          }}
        />
      </section>
      {/* 제품 추천 */}
      <section className="my-[24px]">
        <div className="flex justify-between items-baseline mb-[8px]">
          <h2 className="text-lg font-semibold">김도영님을 위한 추천 제품🛍️</h2>
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
  )
}

export default RecommendPage
