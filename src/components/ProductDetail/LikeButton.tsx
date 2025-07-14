import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { fetchLikeStatus, toggleLike } from '../../apis/products'

interface LikeButtonProps {
  productId: number
}

const LikeButton = ({ productId }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false)

  //Optional : 마운트 시에 이미 좋아요가 눌러져있는지 불러오기
  useEffect(() => {
    fetchLikeStatus(productId)
      .then(({ liked }) => setLiked(liked))
      .catch((err) => {
        console.error('좋아요 상태 조회 실패', err)
        setLiked(false)
      })
  }, [productId])

  const handleToggle = async () => {
    try {
      const { liked: newLiked } = await toggleLike(productId, liked)
      setLiked(newLiked)
    } catch (err) {
      console.error('좋아요 토글 실패', err)
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 bg-white rounded-full shadow hover:scale-105 transition-transform"
      aria-label={liked ? '좋아요 취소' : '좋아요'}
    >
      <Heart
        size={28}
        color="red"
        fill={liked ? 'red' : 'none'}
        strokeWidth={liked ? 0 : 2}
      />
    </button>
  )
}

export default LikeButton
