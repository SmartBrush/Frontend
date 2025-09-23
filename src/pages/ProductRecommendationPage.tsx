import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductList from '../components/ProductRecommendation/ProductList'
import MbtiCardList from '../components/ProductRecommendation/MbtiCardList'
import Back from '../assets/back.svg'
import type { MbtiCardKey } from '../data/mbtiCardData'
import type { Category } from '../apis/products'
import { getMyScalpMbtiSummary, toCardKeyFromKo } from '../apis/mbti'

// 필터 라벨
const FILTERS = [
  '모든 제품',
  '샴푸',
  '린스',
  '트리트먼트/팩',
  '두피토닉',
  '헤어 에센스',
] as const
type FilterLabel = (typeof FILTERS)[number]

const CATEGORY_MAP: Record<FilterLabel, Category | 'all'> = {
  '모든 제품': 'all',
  샴푸: 'shampoo',
  린스: 'conditioner',
  '트리트먼트/팩': 'treatment',
  두피토닉: 'tonic',
  '헤어 에센스': 'essence',
}

export default function ProductRecommendationPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<FilterLabel>('모든 제품')

  const [displayName, setDisplayName] = useState<string>('회원')
  const [mbtiType, setMbtiType] = useState<MbtiCardKey | null>(null)

  // 서버의 단일 엔드포인트로 닉네임+MBTI 동시 확보
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const s = await getMyScalpMbtiSummary() // { nickname?, scalpMbti? }
        if (cancelled) return
        if (s.nickname && s.nickname.trim()) setDisplayName(s.nickname.trim())
        setMbtiType(toCardKeyFromKo(s.scalpMbti)) // 한글 라벨 → 카드 키
      } catch {
        // 무시: 닉네임 '회원', MBTI 카드 미표시 상태 유지
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const category = CATEGORY_MAP[filter]

  return (
    <div className="min-h-screen px-4 pb-16 bg-white">
      {/* 헤더 */}
      <div className="flex items-center text-[20px] font-semibold text-gray-800">
        <button
          onClick={() => navigate('/')}
          className="mr-2 cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={Back} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <span>제품 추천</span>
      </div>

      {/* 상단: MBTI 카드(있으면) / 없으면 안내 */}
      {mbtiType ? (
        <div
          className="bg-[rgba(182,232,178,0.7)] rounded-xl p-3 mb-6"
          data-mbti-block
        >
          <h1 className="text-xl font-extrabold leading-snug text-black">
            또또가 추천하는 <br />
            <span className="text-[#111]">
              {displayName}님을 위한 헤어 제품!
            </span>
            <span className="inline-block ml-1">💖</span>
          </h1>
          <p className="text-sm font-semibold text-[#1270B0] mt-2">
            진단 결과를 바탕으로 내 두피에 딱 맞는 제품을 만나보세요
          </p>
          <div className="mt-4">
            <MbtiCardList mbtiType={mbtiType} />
          </div>
        </div>
      ) : (
        <div
          className="rounded-xl p-4 mb-6 border border-gray-200 bg-white"
          data-mbti-block
        >
          <h1 className="text-xl font-extrabold leading-snug text-black">
            {displayName}님을 위해 또또가 준비했어요
          </h1>
          <div className="mt-3 text-sm text-gray-800">
            <p className="font-bold text-[#E67E22]">두피 MBTI</p>
            <p className="mt-1">두피 MBTI가 아직 없습니다!</p>
            <p className="text-gray-600">사진으로 두피를 진단해 주세요.</p>
          </div>
        </div>
      )}

      {/* 제품 영역 */}
      <section className="bg-white rounded-xl shadow-md px-1 py-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-extrabold text-black">
            유형별 추천 제품을 확인하세요!
          </h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterLabel)}
            className="px-2 py-1 border border-gray-300 rounded-full text-sm bg-white shadow-sm"
          >
            {FILTERS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <ProductList
          category={category}
          onSelect={(id: number | string) => navigate(`/product/${id}`)}
        />
      </section>
    </div>
  )
}
