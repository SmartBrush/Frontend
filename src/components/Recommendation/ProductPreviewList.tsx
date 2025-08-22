import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { useFetch } from '../../hooks/useFetch'
import type { Product } from '../../apis/products'

interface ProductPreviewListProps {
  onSelect: (id: number) => void
  limit?: number
}

// 안전한 문자열 체크
const isNonEmptyString = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0

// 다양한 필드명에서 브랜드 추출 (any 금지: unknown+타입가드 사용)
const getBrand = (p: Product): string | null => {
  const rec = p as unknown as Record<string, unknown>
  const candidates = [
    'brand',
    'brandName',
    'manufacturer',
    'maker',
    'company',
  ] as const
  for (const k of candidates) {
    const v = rec[k]
    if (isNonEmptyString(v)) return v
  }
  return null
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

        return (
          <SwiperSlide key={p.id} className="!w-[170px]">
            <div className="mb-1 relative bg-white rounded-xl shadow p-3 flex flex-col items-center">
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className="flex flex-col items-center w-[160px]"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-[100px] h-[100px] object-contain mx-auto"
                />

                {brand && (
                  <span className="mt-2 self-start ml-1 -mb-1 text-[11px] font-semibold text-gray-500">
                    {brand}
                  </span>
                )}

                {/* 제품명 */}
                <h3 className="text-sm font-medium text-black text-center mt-2 line-clamp-2">
                  {p.name}
                </h3>

                {/* 가격 + 버튼 */}
                <div className="flex items-center justify-between w-full mt-2 px-1">
                  <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">
                    ₩ {p.price.toLocaleString()}
                  </span>
                  <button className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full shadow-sm hover:bg-green-200 transition whitespace-nowrap">
                    구매하러 가기
                  </button>
                </div>
              </button>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default ProductPreviewList
