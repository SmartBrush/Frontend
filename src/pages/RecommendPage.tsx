import { useNavigate } from 'react-router-dom'
import TipCarousel from '../components/Recommendation/TipCarousel'
import ProductPrviewList from '../components/Recommendation/ProductPreviewList'
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

      {/*추천 제품 */}
      <section className="my-[24px]">
        <div className="flex justify-between items-baseline mb-[8px]">
          <h2 className="text-lg font-semibold mb-[8px]">추천 제품🛍️</h2>
          <button
            type="button"
            onClick={() => navigate('/productRecommendation')}
            className="text-sm text-gray-500"
          >
            추천제품 더 보러가기 &gt;
          </button>
        </div>
        <ProductPrviewList
          onSelect={(id: string) => navigate(`/product/${id}`)}
        />
      </section>
    </div>
  )
}

export default RecommendPage
