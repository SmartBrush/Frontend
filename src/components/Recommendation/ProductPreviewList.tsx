import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { useFetch } from '../../hooks/useFetch'
import type { Product } from '../../apis/products'

interface ProductPreviewListProps {
  onSelect: (id: number) => void
  limit?: number
}

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0

const getBrand = (p: Product): string | null => {
  const candidates: (keyof Product)[] = ['brand']
  for (const k of candidates) {
    const v = p[k]
    if (isNonEmptyString(v)) return v
  }
  return null
}

const parsePrice = (v: unknown): number | null => {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string') {
    const cleaned = v.replace(/[^\d.-]/g, '')
    if (!cleaned) return null
    const n = Number(cleaned)
    return Number.isFinite(n) ? n : null
  }
  return null
}

const formatPriceKRW = (v: unknown): string => {
  const n = parsePrice(v)
  return n == null ? '가격 정보 없음' : `₩ ${n.toLocaleString('ko-KR')}`
}

// URL 유효성 검사 + https 보정
const getExternalUrl = (raw: string): string | null => {
  const trimmed = raw.trim()
  const withProto = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`
  try {
    const u = new URL(withProto)
    return u.toString()
  } catch {
    return null
  }
}

const ProductPreviewList = ({
  onSelect,
  limit = 4,
}: ProductPreviewListProps) => {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(`${import.meta.env.VITE_API_BASE_URL}/api/products`)

  if (loading) return <div>로딩 중...</div>
  if (error || !products) return <div>에러가 발생했습니다.</div>

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={12}
      slidesPerView={2.2}
      pagination={{ clickable: true }}
      navigation
      className="w-full"
    >
      {products.slice(0, limit).map((p) => {
        const brand = getBrand(p)
        const priceLabel = formatPriceKRW(p.price)
        const externalUrl = getExternalUrl(p.link)

        return (
          <SwiperSlide key={p.id} className="!w-[170px]">
            <div
              className={[
                'group rounded-xl p-2 cursor-pointer bg-[#F5F5F5] shadow-md pb-2',
                'motion-safe:transition-all motion-safe:duration-200',
                'hover:shadow-lg hover:-translate-y-0.5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E9366]/40',
              ].join(' ')}
            >
              {/* 카드 전체 클릭 → 내부 상세 */}
              <div
                role="button"
                tabIndex={0}
                aria-label={`${p.name} 상세보기`}
                onClick={() => onSelect(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect(p.id)
                  }
                }}
                className="flex flex-col items-center w-[160px] outline-none focus-visible:ring-2 focus-visible:ring-[#4E9366]/40 rounded-lg"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className={[
                    'w-full h-40 object-cover rounded-md',
                    'motion-safe:transition-transform motion-safe:duration-200',
                    'group-hover:scale-[1.02]',
                  ].join(' ')}
                />

                {brand && (
                  <span className="mt-2 self-start ml-1 -mb-1 text-[11px] font-semibold text-gray-500">
                    {brand}
                  </span>
                )}

                <h3 className="text-sm font-medium text-black text-center mt-2 line-clamp-2">
                  {p.name}
                </h3>

                <div className="flex items-center justify-between w-full mt-2 px-1">
                  <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">
                    {priceLabel}
                  </span>

                  {externalUrl ? (
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      onClick={(e) => e.stopPropagation()}
                      className={[
                        'text-xs px-2 py-1 rounded-full text-white shadow-sm whitespace-nowrap',
                        'bg-[#4E9366] motion-safe:transition-colors motion-safe:duration-200',
                        'hover:bg-[#3f7c55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E9366]/40',
                      ].join(' ')}
                    >
                      구매하러 가기
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="text-xs px-2 py-1 bg-gray-300 text-white rounded-full shadow-sm cursor-not-allowed whitespace-nowrap"
                    >
                      링크 없음
                    </button>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default ProductPreviewList
