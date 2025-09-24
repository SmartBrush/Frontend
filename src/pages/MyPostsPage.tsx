import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../apis/api'
import Back from '../assets/back.svg'
import ConcernCard from '../components/Community/ConcernCard'

type MyPost = {
  id: number
  title: string
  content: string
  author: string
  profileImage: string
  createdAt: string
  likeCount: number
  liked: boolean
  commentCount: number
}

const fmtDate = (iso: string) => {
  const d = new Date(iso)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}.${dd}`
}

const MyPostsPage = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<MyPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/api/mypage/posts')
        setPosts(Array.isArray(res.data) ? res.data : [])
      } catch (e) {
        setError('게시물을 불러오지 못했습니다.')
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <div className="p-4">로딩 중...</div>
  if (error) return <div className="p-4">{error}</div>

  return (
    <>
      <div className="sticky top-0 z-50 px-4 py-[15px] flex items-center text-[20px] font-semibold text-gray-800 bg-[#f5f5f5]">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={Back} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <span>내가 작성한 게시물</span>
      </div>

      <div className="bg-[#f5f5f5] min-h-screen">
        <div className="bg-white px-[20px]">
          {posts.length === 0 ? (
            <div className="py-12 text-center text-[#8C8C8C] text-[14px]">
              작성한 게시물이 없습니다.
            </div>
          ) : (
            <ul className="divide-y divide-[#E3E3E3]">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="px-[20px] cursor-pointer"
                  onClick={() => navigate(`/community/concerns/${p.id}`)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      navigate(`/community/concerns/${p.id}`)
                    }
                  }}
                >
                  <ConcernCard
                    name={p.author}
                    content={p.title}
                    date={fmtDate(p.createdAt)}
                  />
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default MyPostsPage
