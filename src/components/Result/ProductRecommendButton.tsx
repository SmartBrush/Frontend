import { useNavigate } from 'react-router-dom'

const ProductRecommendButton = () => {
  const navigate = useNavigate()

  const ButtonHandleClick = () => {
    navigate('/recommend')
  }

  return (
    <button
      onClick={ButtonHandleClick}
      className="w-85 text-center mt-8 px-4 py-2 bg-[#4E9366] text-white font-semibold rounded-full shadow-md hover:bg-green-900 transition mx-auto block"
    >
      내 두피에 맞는 제품 보러가기
    </button>
  )
}

export default ProductRecommendButton
