// 제품 아이템 단위 컴포넌트
import { HeartIcon } from '@heroicons/react/24/solid'
import type { JSX } from 'react'

interface ProductListItemProps {
  id: string
  imageUrl: string
  name: string
  price: string
  onClick: () => void
}

const ProductListItem = ({
  imageUrl,
  name,
  price,
  onClick,
}: ProductListItemProps): JSX.Element => (
  <div className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-lg">
    {/* 스크랩 아이콘 */}
    <button className="absolute bottom-28 right-2 z-1o">
      <HeartIcon className="w-5 h-5 text-pink-500" />
    </button>

    {/* 제품 이미지 */}
    <img
      src={imageUrl}
      loading="lazy"
      alt={name}
      className="w-full h-[180px] object-cover"
      onClick={onClick}
    />

    {/* 텍스트 정보 */}
    <div className="p-3">
      {/* 제품명 */}
      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
        {name}
      </h4>

      {/* 가격 + 구매 버튼 */}
      <div className="flex justify-between items-center">
        <span className="text-xm font-semibold text-gray-800">{price}</span>
        <button className="text-xs px-3 py-1 rounded-full bg-green-200 text-green-800 font-semibold">
          구매하러가기
        </button>
      </div>
    </div>
  </div>
)

export default ProductListItem
