import { useNavigate } from 'react-router-dom'

export default function ProductRecommendButton() {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate('/recommend')}
      className="mt-5 w-full rounded-full bg-[#4E9366] py-3 text-white text-sm font-semibold shadow-md active:opacity-90"
    >
      두피 케어 제품 추천 바로가기
    </button>
  )
}
