import type { Product } from '../../apis/products'
import Image404 from '../../assets/404.png'
import { useEffect, useState } from 'react'
import { fetchProductById } from '../../apis/products'
// import LikeButton from './LikeButton'

export interface ProductInfoProps {
  id: string
}

const ProductInfo = ({ id }: ProductInfoProps) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchProductById(id)
      .then((p) => setProduct(p))
      .catch((e) => {
        console.error('fetchProductByID 에러: ', e)
        setError(e)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div>로딩 중...</div>
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
          loading="lazy"
          className="w-full h-[250px] object-cover rounded-lg"
        />
        <div className="absolute bottom-1 right-2">
          {/* LikeButton에 숫자 ID 전달 */}
          {/* <LikeButton productId={Number(id)} /> */}
        </div>
      </div>

      {/* 제품 정보 */}
      <div className="mt-[12px]">
        <h2 className="text-lg font-bold mt-[4px]">{product.name}</h2>
        <p className="text-sm text-gray-700 mt-[2px]">
          {Number(product.price).toLocaleString()}원
        </p>{' '}
      </div>
    </div>
  )
}

export default ProductInfo
