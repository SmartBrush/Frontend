import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Back from '../assets/back.svg'
import WishlistCard from '../components/Mypage/WishlistCard'
import { fetchWishlist, type WishlistItem } from '../apis/wishlist'

const WishlistPage = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await fetchWishlist()
        if (!alive) return
        setItems(data)
      } catch (e) {
        if (!alive) return
        setError('찜한 제품을 불러오지 못했어요.')
        console.log(e)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <>
      {/* 상단 바 */}
      <div className="sticky top-0 z-50 bg-white not-last-of-type:not-only-of-type:px-4 py-[15px] flex items-center text-[20px] font-semibold text-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={Back} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <span>찜한 제품</span>
      </div>
      <div className="min-h-screen bg-white">
        {/* 그리드 */}
        <div className="px-5 pb-6">
          {loading && <div className="text-sm text-gray-500">불러오는 중…</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}
          {!loading && !error && items.length === 0 && (
            <div className="text-sm text-gray-500">
              찜한 제품이 아직 없습니다.
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {items.map((it) => (
                <WishlistCard
                  key={it.id}
                  id={it.id}
                  brand={it.brand}
                  name={it.name}
                  price={it.price}
                  image={it.image}
                  link={it.link}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default WishlistPage
