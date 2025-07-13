// 추천 제품 카드 리스트
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { useFetch } from '../../hooks/useFetch'
import type { Product } from '../../types/Product'

interface ProductPreviewListProps {
  onSelect: (id: string) => void
  limit?: number
}

const ProductPreviewList = ({
  onSelect,
  limit = 4,
}: ProductPreviewListProps) => {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(`${import.meta.env.VITE_API_BASE_URL}/products`)

  if (loading) return <div>로딩 중...</div>
  if (error || !products) return <div>에러가 발생했습니다.</div>

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={12}
      slidesPerView={2.5}
      pagination={{ clickable: true }}
      navigation
      className="h-[220px]"
    >
      {products.slice(0, limit).map((p) => (
        <SwiperSlide key={p.id} className="!w-[140px]">
          <button
            type="button"
            onClick={() => onSelect(p.id)}
            className="flex flex-col bg-white rounded-lg shadow overflow-hidden cursor-pointer"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-[130px] object-cover"
            />
            <div className="p-2 flex-1 flex flex-col justify-between">
              <h3 className="text-sm font-medium text-black line-clamp-2">
                {p.name}
              </h3>
              <span className="text-xs text-gray-500 mt-[2px]">₩{p.price}</span>
            </div>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
export default ProductPreviewList
