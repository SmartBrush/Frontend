// 제품 정보
//흠 근데 나중에 이거 다 올영 크롤링 ...

import { mockProducts } from '../../data/mockProducts'
import Image404 from '../../assets/404.png'
import type { Product } from '../../data/mockProducts'

export interface ProductInfoProps {
  id: string
}

const ProductInfo: React.FC<ProductInfoProps> = ({ id }) => {
  const product: Product = mockProducts.find((p) => p.id === id) || {
    id: '0',
    imageUrl: Image404,
    brand: '알 수 없음',
    name: '알 수 없는 제품',
    price: '₩0',
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <img
        src={product.imageUrl}
        alt={`${product.brand} ${product.name}`}
        className="w-full h-[200px] object-cover rounded"
      />
      <div className="mt-[12px]">
        <p className="text-[10px] text-gray-500">{product.brand}</p>
        <h2 className="text-lg font-bold mt-[4px]">{product.name}</h2>
        <p className="text-sm text-gray-700 mt-[2px]">{product.price}</p>
      </div>
    </div>
  )
}
export default ProductInfo
