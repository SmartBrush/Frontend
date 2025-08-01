// 제품 아이템 단위 컴포넌트
import LinkButton from '../ProductDetail/LinkButton'
import type { Product } from '../../apis/products'

interface ProductListItemProps {
  product: Product
  onClick: () => void
}

const ProductListItem = ({ product, onClick }: ProductListItemProps) => (
  <div className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-lg">
    {/* 제품 이미지 */}
    <img
      src={product.image}
      loading="lazy"
      alt={product.name}
      className="w-full h-[180px] object-cover"
      onClick={onClick}
    />

    {/* 텍스트 정보 */}
    <div className="p-3">
      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
        {product.name}
      </h4>

      {/* 가격 + 구매 버튼 */}
      <div className="flex justify-between items-center">
        <span className="text-xm font-semibold text-gray-800">
          ₩{product.price.toLocaleString()}
        </span>
        <LinkButton product={product} />
      </div>
    </div>
  </div>
)

export default ProductListItem
