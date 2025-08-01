import { useNavigate } from 'react-router-dom'
import SummaryBox from '../components/ProductRecommendation/SummaryBox'
import ProductList from '../components/ProductRecommendation/ProductList'
import { useState } from 'react'

//토글 필터
const FILTERS = [
  '모든 제품',
  '샴푸',
  '린스',
  '트리트먼트/팩',
  '두피토닉',
  '헤어 에센스',
] as const

const CATEGORY_MAP: Record<(typeof FILTERS)[number], string> = {
  '모든 제품': 'all',
  샴푸: 'shampoo',
  린스: 'conditioner',
  '트리트먼트/팩': 'treatment',
  두피토닉: 'tonic',
  '헤어 에센스': 'essence',
}

const ProductRecommendationPage = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>(FILTERS[0])

  return (
    <div className="bg-gray-50 min-h-screen pb-[100px] px-4 pt-6">
      {/* 헤더 + 뒤로가기 버튼 */}
      <div className="mb-[16px]">
        <h1 className="text-xl font-extrabold leading-snug">
          또또가 추천하는 <br />
          <span className="text-[#111]">김도영님을 위한 헤어 제품!</span>
          <span className="inline-block">💖</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          진단 결과를 바탕으로 내 두피에 맞는 제품을 만나보세요
        </p>
      </div>

      {/* Summary Box */}
      <SummaryBox
        summary="건조 비듬형"
        detail="각질/비듬, 유분이 심각하기 때문에 피지 제거 성분인 티트리 오일과 두피 진정 성분인 판테놀을 사용하는 걸 추천드려요. 또 모든 피부 타입에 잘 어울립니다."
      />

      {/* 카테고리 필터 */}
      <div className="flex justify-between mt-6 items-start gap-4">
        <h2 className="text-base font-semibold mt-1 whitespace-nowrap">
          유형별 추천 제품을 확인하세요!
        </h2>
        <div className="flex flex-col gap-2">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as (typeof FILTERS)[number])
            }
            className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white"
          >
            {FILTERS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 제품 리스트 */}
      <section className="mt-[12px]">
        <ProductList
          category={CATEGORY_MAP[filter]}
          onSelect={(id: string) => navigate(`/product/${id}`)}
        />
      </section>
    </div>
  )
}

export default ProductRecommendationPage
