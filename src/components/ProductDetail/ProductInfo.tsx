import { useFetch } from '../../hooks/useFetch'
import type { Product } from '../../types/Product'
import Image404 from '../../assets/404.png'
// import LikeButton from './LikeButton'

export interface ProductInfoProps {
  id: string
}

const ProductInfo: React.FC<ProductInfoProps> = ({ id }) => {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(`${import.meta.env.VITE_API_BASE_URL}/products`)

  const index = Number(id) - 1
  const product = Array.isArray(products) ? products[index] : undefined

  // 로딩 중
  if (loading) return <div className="text-center py-8">로딩 중...</div>
  //에러 발생 or 상품 없으면 404 이미지
  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <img src={Image404} alt="Not Found" className="w-1/2" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      {/* 이미지 + 좋아요 버튼 */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[250px] object-cover rounded"
        />
        <div className="absolute bottom-1 right-2">
          {/* LikeButton에 숫자 ID 전달 */}
          {/* <LikeButton productId={Number(id)} /> */}
        </div>
      </div>

      {/* 제품 정보 */}
      <div className="mt-[12px]">
        <h2 className="text-lg font-bold mt-[4px]">{product.name}</h2>
        <p className="text-sm text-gray-700 mt-[2px]">{product.price}원</p>
      </div>
    </div>
  )
}
export default ProductInfo
