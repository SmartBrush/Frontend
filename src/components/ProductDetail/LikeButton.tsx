import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  productId: number
}

function LikeButton({ productId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const API_BASE = import.meta.env.VITE_API_BASE_URL

  //Optional : 마운트 시에 이미 좋아요가 눌러져있는지 불러오기
  useEffect(() => {
    fetch(`${API_BASE}/products/${productId}/like/status`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch like status')
        return res.json()
      })
      .then((data: { liked: boolean }) => {
        setLiked(data.liked)
      })
      .catch((err) => {
        console.error('[LikeButton]상태 조회 에러 : ', err)
      })
  }, [productId])

  const handleToggle = () => {
    const method = liked ? 'DELETE' : 'POST'
    fetch(`${API_BASE}/products/${productId}/like`, {
      method,
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to toggle like')
        return res.json()
      })
      .then((data: { liked: boolean }) => {
        setLiked(data.liked)
      })
      .catch((err) => {
        console.error('[LikeButton] 토글 에러: ', err)
      })
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 bg-white rounded-full shadow hover:scale-105 transition-transform"
      aria-label={liked ? '좋아요 취소' : '좋아요'}
    >
      {liked ? (
        <Heart
          // 꽉 찬 하트
          size={28}
          color="red"
          fill="red"
          strokeWidth={0}
        />
      ) : (
        //빈하트 : stroke
        <Heart size={28} color="red" fill="none" strokeWidth={2} />
      )}
    </button>
  )
}

export default LikeButton
