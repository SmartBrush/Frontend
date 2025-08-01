import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { fetchLikeStatus, toggleLike } from '../../apis/products'

interface LikeButtonProps {
  productId: number
}

const LikeButton = ({ productId }: LikeButtonProps) => {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //로그인 여부 확인
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }, [])

  //로그인 상태일때만 좋아요 상태 조회
  useEffect(() => {
    if (!isLoggedIn) return

    fetchLikeStatus(productId)
      .then(({ liked }) => setLiked(liked))
      .catch((err) => {
        console.error('좋아요 상태 조회 실패', err)
        setLiked(false)
      })
  }, [productId, isLoggedIn])

  const handleToggle = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.')
      navigate('/login')
      return
    }
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
