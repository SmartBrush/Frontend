import { useNavigate } from 'react-router-dom'
import TipCarousel from '../components/Recommendation/TipCarousel'
import ProductPreviewList from '../components/Recommendation/ProductPreviewList'
import HabitChallengeList from '../components/Recommendation/HabitChallengeList'

const RecommendPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-[80px]">
      {/*헤더*/}
      <header className="mb-[16px]">
        <h1 className="text-xl font-bold">오늘의 두피 팁💡</h1>
      </header>
      {/*팁 슬라이더*/}
      <TipCarousel />

      {/*습관 챌린지*/}
      <section className="my-[24px]">
        <h2 className="text-lg font-semibold mb-[8px]">습관 챌린지🗓️</h2>
        <HabitChallengeList />
      </section>

      {/* 제품 추천 */}
      <section className="my-[24px]">
        <div className="flex justify-between items-baseline mb-[8px]">
          <h2 className="text-lg font-semibold">김도영님을 위한 추천 제품🛍️</h2>
          {/* 전체 추천 페이지로 이동 */}
          <button
            type="button"
            onClick={() => navigate('/productRecommendation')}
            className="text-sm text-gray-500"
          >
            더 보기 &gt;
          </button>
        </div>
        {/* 한 번만 렌더링 */}
        <ProductPreviewList
          onSelect={(id) => navigate(`/product/${id}`)}
          limit={5}
        />
      </section>
    </div>
  )
}

export default RecommendPage
