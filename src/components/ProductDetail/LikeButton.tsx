import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { addWishlist, removeWishlist, isWishlisted } from '../../apis/products'

interface LikeButtonProps {
  productId: number
  size?: number
}

const LikeButton = ({ productId, size = 36 }: LikeButtonProps) => {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 로그인 여부
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }, [])

  // 초기 찜 상태
  useEffect(() => {
    if (!isLoggedIn) return
    isWishlisted(productId)
      .then(setLiked)
      .catch((err) => {
        console.error('찜 상태 조회 실패', err)
        setLiked(false)
      })
  }, [productId, isLoggedIn])

  // 토글
  const handleToggle = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.')
      navigate('/login')
      return
    }

    const next = !liked
    setLiked(next)
    try {
      if (next) {
        await addWishlist(productId)
      } else {
        await removeWishlist(productId)
      }
    } catch (err) {
      console.error('찜 토글 실패', err)
      setLiked(!next) // 롤백
    }
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      className="bg-transparent p-0 rounded-none shadow-none transition-transform"
    >
      <Heart
        size={size}
        color="#ef4444"
        fill={liked ? '#ef4444' : '#ffffff'}
        strokeWidth={liked ? 0 : 2}
      />
    </button>
  )
}

export default LikeButton
