import { useNavigate } from 'react-router-dom'
import SummaryBox from '../components/ProductRecommendation/SummaryBox'
import ProductList from '../components/ProductRecommendation/ProductList'
import { useState } from 'react'

//토글 필터
const FILTERS = [
  '모든 제품',
  '샴푸',
  '린스',
  '트리트먼트',
  '헤어팩',
  '에센스/세럼',
  '기타',
]

const ProductRecommendationPage: React.FC = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState(FILTERS[0])

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-[80px]">
      {/* 헤더 + 뒤로가기 버튼 */}
      <div className="flex items-center mb-[16px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mr-[8px] text-lg"
        >
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold">
            또또가 추천하는 김도영님을 위한 제품!
          </h1>
          <p className="text-sm text-gray-600">
            진단 결과를 바탕으로 내 두피에 맞는 제품을 만나보세요
          </p>
        </div>
      </div>

      {/* Summary Box */}
      <SummaryBox
        summary="총평: 김도영님은 개기름형!"
        detail="각질/비듬, 유분이 심각하기 때문에 피지 제거 성분인 티트리 오일과 두피 진정 성분인 판테놀을 사용하는 걸 추천드려요. 또 모든 피부 타입에 잘 어울립니다."
      />

      {/* 제품 섹션  */}
      <div className="mt-[24px] flex items-center justify-between">
        <h2 className="text-lg font-semibold">내 두피에 맞는 제품</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-[8px] py-[4px] border border-gray-300 rounded-full text-sm bg-white"
        >
          {FILTERS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <section className="mt=[12px]">
        <ProductList onSelect={(id: string) => navigate(`/product/${id}`)} />
      </section>
    </div>
  )
}

export default ProductRecommendationPage
