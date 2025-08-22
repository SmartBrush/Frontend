import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../apis/api'
import ProductList from '../components/ProductRecommendation/ProductList'
import MbtiCardList from '../components/ProductRecommendation/MbtiCardList'
import Back from '../assets/back.svg'

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

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null

const hasData = <T,>(v: Envelope<T>): v is { data: T } =>
  isObject(v) && 'data' in v

const hasResult = <T,>(v: Envelope<T>): v is { result: T } =>
  isObject(v) && 'result' in v

const unwrap = <T,>(x: Envelope<T>): T =>
  hasData(x) ? x.data : hasResult(x) ? x.result : x

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

const saveDisplayName = (name: string) => {
  localStorage.setItem('display_name', name)
  localStorage.setItem('nickname', name)
  localStorage.setItem('name', name)
  window.dispatchEvent(new Event('profile-updated'))
}

const ProductRecommendationPage = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>(FILTERS[0])

  // 1) 로컬스토리지 우선 표시
  const cached =
    localStorage.getItem('display_name') ||
    localStorage.getItem('nickname') ||
    localStorage.getItem('name') ||
    localStorage.getItem('username') ||
    '회원'

  const [displayName, setDisplayName] = useState<string>(cached)

  // TODO: 추후 진단 결과에서 mbtiType 받아서 넣어주면 됨
  const mbtiType = 'dry_sensitive'

  useEffect(() => {
    // 2) /api/mypage로 확정하고 캐시 덮어쓰기
    ;(async () => {
      try {
        const res = await API.get<Envelope<MyPageData>>('/api/mypage')
        const me = unwrap(res.data)
        const name = pickName(me) ?? cached
        saveDisplayName(name)
        setDisplayName(name)
      } catch {
        // 실패 시 캐시 유지
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 최초 1회

  return (
    <div className="min-h-screen px-3 pb-16 bg-white">
      {/* 상단 헤더 (뒤로가기) */}
      <div className="pl-0 pr-[20px] pt-[20px] ml-1 flex items-center text-lg font-semibold text-gray-800">
        <button
          onClick={() => navigate('/recommend')}
          className="mr-2"
          aria-label="뒤로가기"
        >
          <img src={Back} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <span>제품 추천</span>
      </div>

      {/* 상단: 연두 배경 안의 흰 카드 */}
      <div className="bg-[#B6E8B2]/50 rounded-xl p-3 mb-6">
        <h1 className="text-xl font-extrabold leading-snug text-black">
          또또가 추천하는 <br />
          <span className="text-[#111]">{displayName}님을 위한 헤어 제품!</span>
          <span className="inline-block ml-1">💖</span>
        </h1>
        <p className="text-sm font-semibold text-[#1270B0] mt-2">
          진단 결과를 바탕으로 내 두피에 딱 맞는 제품을 만나보세요
        </p>

        {/* MBTI 카드: 연두 카드 */}
        <div className="mt-4">
          <MbtiCardList mbtiType={mbtiType} />
        </div>
      </div>

      {/* 제품 영역: 흰 배경 컨테이너 */}
      <section className="bg-white rounded-xl shadow-md px-1 py-3">
        {/* 카테고리 필터 (좌: 타이틀 / 우: pill select) */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-extrabold text-black">
            유형별 추천 제품을 확인하세요!
          </h2>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as (typeof FILTERS)[number])
            }
            className="px-2 py-1 border border-gray-300 rounded-full text-sm bg-white shadow-sm"
          >
            {FILTERS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* 제품 리스트 */}
        <ProductList
          category={CATEGORY_MAP[filter]}
          onSelect={(id: string) => navigate(`/product/${id}`)}
        />
      </section>
    </div>
  )
}

export default ProductRecommendationPage
