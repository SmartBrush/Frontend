import { useNavigate } from 'react-router-dom'

const ProductRecommendButton = () => {
  const navigate = useNavigate()

  const ButtonHandleClick = () => {
    navigate('/recommend')
  }

  return (
    <button
      onClick={ButtonHandleClick}
      className="w-93 text-center mt-8 px-4 py-2 bg-blue-200 text-black font-semibold rounded-full shadow-md hover:bg-blue-300 transition mx-auto block"
    >
      내 두피에 맞는 제품 보러가기
    </button>
  )
}

export default ProductRecommendButton
