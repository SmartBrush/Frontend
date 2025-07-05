// 제품 아이템 단위 컴포넌트

interface ProductListItemProps {
  id: string
  imageUrl: string
  brand: string
  name: string
  price: string
  onClick: () => void
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  imageUrl,
  brand,
  name,
  price,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col bg-white rounded-lg shadow overflow-fidden cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={`${brand} ${name}`}
        className="w-full h-[96px] object-cover"
      />
      <div className="p-2 flex-1 flex flex-col justify-between">
        <span className="text-[10px] text-gray-500">{brand}</span>
        <h4 className="text-sm font-medium text-black line-clamp-2">{name}</h4>
        <span className="text-xs text-gray-500 mt-[2px]">{price}</span>
      </div>
    </button>
  )
}

export default ProductListItem
