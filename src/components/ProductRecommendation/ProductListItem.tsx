// 제품 아이템 단위 컴포넌트
import LinkButton from '../ProductDetail/LinkButton'
import type { Product } from '../../apis/products'

interface ProductListItemProps {
  product: Product
  onClick: () => void
}

const ProductListItem = ({ product, onClick }: ProductListItemProps) => (
  <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm overflow-hidden">
    {/* 이미지: 비율 고정 */}
    <button onClick={onClick} className="w-full">
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </button>

    {/* 내용 영역 */}
    <div className="flex flex-col p-3">
      {/* 제목: 두 줄 고정 높이로 카드 높이 균일화 */}
      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[3.1em]">
        {product.name}
      </h4>

      {/* 하단 바: 항상 맨 아래에 고정 */}
      <div className="mt-auto flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-900 mt-1.5">
          ₩{product.price.toLocaleString()}
        </span>
        {/* 버튼이 줄바꿈/찌그러짐 방지 */}
        <div className="shrink-0 font-weight">
          <LinkButton product={product} />
        </div>
      </div>
    </div>
  </div>
)

export default ProductListItem
