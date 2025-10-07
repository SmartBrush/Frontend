import { useEffect, useRef, useState } from 'react'
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

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
        // null
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const category = CATEGORY_MAP[filter]

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div
        className="sticky top-0 z-50 bg-white px-4
                py-[15px] flex items-center text-[20px] font-semibold text-gray-800"
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

      {/* 상단: MBTI 카드(있으면) / 없으면 안내 */}
      {mbtiType ? (
        <div
          className="bg-[rgba(182,232,178,0.7)] p-3 px-4 mb-1"
          data-mbti-block
        >
          <h1 className="text-xl font-extrabold leading-snug text-black">
            또또가 추천하는 <br />
            <span className="text-[#111]">
              {displayName}님을 위한 헤어 제품!
            </span>
            <span className="inline-block ml-1">💖</span>
          </h1>
          <p className="text-sm font-semibold text-[#1270B0] mt-2 mb-6">
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
      <section className="bg-white rounded-xl ml-4 mr-4 px-1 py-3 mb-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-extrabold text-black">
            유형별 추천 제품을 확인하세요!
          </h2>
          <div
            ref={dropdownRef}
            className="relative cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label="카테고리 선택"
          >
            {/* 트리거 버튼 */}
            <div className="flex items-center justify-between text-sm rounded-full px-3 py-[6px] bg-white border border-[#AAAAAA] min-w-[120px]">
              <span className="whitespace-nowrap">{filter}</span>
              <svg
                className={`w-4 h-4 ml-2 text-black transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* 옵션 리스트 */}
            {open && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-auto">
                {FILTERS.map((opt) => {
                  const selected = opt === filter
                  return (
                    <div
                      key={opt}
                      className={[
                        'px-3 py-2 text-sm cursor-pointer',
                        selected
                          ? 'bg-[#E6F4EA] font-semibold'
                          : 'hover:bg-[#c6efd2]',
                      ].join(' ')}
                      onClick={(e) => {
                        e.stopPropagation()
                        setFilter(opt as FilterLabel)
                        setOpen(false)
                      }}
                    >
                      {opt}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        <ProductList
          category={category}
          onSelect={(id: number | string) => navigate(`/product/${id}`)}
        />
      </section>
    </div>
  )
}
