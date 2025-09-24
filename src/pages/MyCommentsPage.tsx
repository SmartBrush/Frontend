import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Back from '../assets/back.svg'
import ConcernCard from '../components/Community/ConcernCard'
import { getMyComments, type MyComment } from '../apis/my'

const fmtDate = (iso: string) => {
  const d = new Date(iso)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}.${dd}`
}

const postDetailPath = (postId: number) => `/community/concerns/${postId}`

const MyCommentsPage = () => {
  const navigate = useNavigate()
  const [comments, setComments] = useState<MyComment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMyComments()
        setComments(data)
      } catch {
        setError('댓글을 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetch()
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
        <span>내가 작성한 댓글</span>
      </div>
      <div className="bg-[#f5f5f5] min-h-screen">
        {comments.length === 0 ? (
          <div className="py-12 text-center text-[#8C8C8C] text-[14px]">
            작성한 댓글이 없습니다.
          </div>
        ) : (
          <ul className="divide-y divide-[#E3E3E3]">
            {comments.map((c) => (
              <li
                key={c.id}
                className="px-[20px] cursor-pointer select-none outline-none active:opacity-90"
                role="link"
                tabIndex={0}
                onClick={() => navigate(postDetailPath(c.postId))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    navigate(postDetailPath(c.postId))
                  }
                }}
              >
                <ConcernCard
                  name={c.author}
                  content={c.content}
                  date={fmtDate(c.createdAt)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default MyCommentsPage
