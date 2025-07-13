import { useParams, useNavigate } from 'react-router-dom'
import ProductInfo from '../components/ProductDetail/ProductInfo'
import AiChatButton from '../components/ProductDetail/AiChatButton'
import LinkButton from '../components/ProductDetail/LinkButton'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <div className="p-4 bg-blue-50 min-h-screen pb-[80px]">
      {/* 상단 헤더: 뒤로가기 + 공유 */}
      <div className="flex items-center justify-between mb-[16px]">
        <button type="button" onClick={() => navigate(-1)} className="p-2">
          ←
        </button>
        <button
          type="button"
          onClick={() => {
            /* TODO: 공유 기능 */
          }}
          className="p-2"
        >
          🔗
        </button>
      </div>

      {/* 제품 정보 */}
      {id && <ProductInfo id={id} />}

      {/* 액션 버튼 */}
      <div className="mt-[24px] space-y-[12px]">
        <AiChatButton />
        <LinkButton />
      </div>
    </div>
  )
}

export default ProductDetailPage
