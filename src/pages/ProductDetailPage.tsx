// src/pages/ProductDetailPage.tsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LikeButton from '../components/ProductDetail/LikeButton'
import { fetchProductById } from '../apis/products'
import type { Product } from '../apis/products'
import Back from '../assets/back.svg'

// (옵션) brand가 비어 있을 때 제품명에서 보조 추출
const extractBrandFallback = (name: string) => {
  const n = name.replace(/^\s*(\[[^\]]+\]\s*)+/g, '')
  const m = n.match(/^([A-Za-z가-힣0-9]+)/)
  return (m?.[1] ?? '').trim()
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchProductById(id)
        setProduct(data)
      } catch (e) {
        console.error('상품 정보를 가져오는 데 실패:', e)
        setError('상품 정보를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  // 화면용 파생값
  const brand =
    (product?.brand && product.brand.trim()) ||
    (product?.name ? extractBrandFallback(product.name) : '')

  return (
    <>
      <div className="sticky top-0 z-50 px-4 py-[15px] flex items-center text-[20px] font-semibold text-gray-800 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={Back} alt="뒤로가기" className="w-4.5 h-4.5" />
        </button>
        <span> </span>
      </div>

      <div className="mx-5 px-4 pb-5 bg-white">
        {/* 이미지 카드 */}
        <section className="mt-1 relative rounded-2xl bg-[#F5F5F5] p-3 shadow-md">
          <div className="overflow-hidden rounded-xl bg-gray-50">
            {loading ? (
              <div className="aspect-square animate-pulse bg-gray-200" />
            ) : product ? (
              // 이미지 비율 유지
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-contain"
                style={{ aspectRatio: '1 / 1' }}
              />
            ) : (
              <div className="aspect-square grid place-items-center bg-gray-100 text-gray-400">
                이미지 없음
              </div>
            )}
          </div>

          {/* 좋아요 버튼 */}
          {product && (
            <div className="absolute bottom-3 right-5">
              <LikeButton productId={product.id} />
            </div>
          )}
        </section>
        {/* 정보 영역 */}
        {loading && (
          <div className="mt-6 animate-pulse space-y-3">
            <div className="h-3 w-20 rounded bg-gray-200" />
            <div className="h-6 w-4/5 rounded bg-gray-200" />
            <div className="h-5 w-24 rounded bg-gray-200" />
          </div>
        )}
        {error && (
          <p className="mt-6 text-center text-sm text-red-600">{error}</p>
        )}
        {product && !loading && (
          <>
            {/* 브랜드 */}
            {!!brand && (
              <p className="mt-5 text-[18px] font-light text-gray-500">
                {brand}
              </p>
            )}

            {/* 제품명 + 가격*/}
            <div className="mt-1">
              <h1 className="flex-1 text-xl font-extrabold leading-snug text-gray-900">
                {product.name}
              </h1>
              <div className="mt-5 ml-50 text-right font-bold text-gray-900 text-[18px]">
                ₩{product.price.toLocaleString()}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="mt-10 block w-full rounded-full bg-[#4E9366] py-3 text-center font-semibold text-white shadow-md hover:opacity-95 active:opacity-90"
              >
                올리브영 바로가기
              </a>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ProductDetailPage
