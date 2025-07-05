// 추천 제품 카드 리스트
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { mockProducts } from '../../data/mockProducts'
import type { Product } from '../../data/mockProducts'

interface Props {
  onSelect: (id: string) => void
}

const ProductPrviewList: React.FC<Props> = ({ onSelect }) => (
  <Swiper
    modules={[Pagination, Navigation]}
    spaceBetween={12}
    slidesPerView={2.5}
    pagination={{ clickable: true }}
    navigation
    className="h-[160px]"
  >
    {mockProducts.map((p: Product) => (
      <SwiperSlide key={p.id} className="!w-[140px]">
        <button
          type="button"
          onClick={() => onSelect(p.id)}
          className="flex flex-col bg-white rounded-lg shadow overflow-hidden cursor-pointer"
        >
          <img
            src={p.imageUrl}
            alt={`${p.brand} ${p.name}`}
            className="w-full h-[80px] object-cover"
          />
          <div className="p-2 flex-1 flex flex-col justify-between">
            <p className="text-[10px] text-gray-500">{p.brand}</p>
            <h3 className="text-sm font-medium text-black line-clamp-2">
              {p.name}
            </h3>
            <span className="text-xs text-gray-500 mt-[2px]">{p.price}</span>
          </div>
        </button>
      </SwiperSlide>
    ))}
  </Swiper>
)

export default ProductPrviewList
