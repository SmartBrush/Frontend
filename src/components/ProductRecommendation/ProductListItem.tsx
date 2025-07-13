// 제품 아이템 단위 컴포넌트

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
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col bg-white rounded-lg shadow overflow-hidden cursor-pointer"
  >
    <img
      src={imageUrl}
      loading="lazy"
      className="w-full h-[170px] object-cover"
    />
    <div className="p-2 flex-1 flex flex-col justify-between">
      <h4 className="text-sm font-medium text-black line-clamp-2">{name}</h4>
      <span className="text-xs text-gray-500 mt-[2px]">{price}</span>
    </div>
  </button>
)

export default ProductListItem
