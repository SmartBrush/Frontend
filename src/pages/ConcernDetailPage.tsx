import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid'
import profileImg from '../assets/profile.png'
import Back from '../assets/back.svg'
import likeIcon from '../assets/like.svg'
import likeIconPressed from '../assets/likepressed.svg'
import commentIcon from '../assets/comment.svg'

interface Comment {
  id: number
  author: string
  content: string
  profileImage: string
  createdAt: string
}

interface Concern {
  id: number
  name: string
  title: string
  content: string
  date: string
}

export default function ConcernDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [concern, setConcern] = useState<Concern | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [comment, setComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState<number>(0)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!id || !token) return

    const fetchData = async () => {
      try {
        const concernRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/community/detail/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        if (!concernRes.ok) throw new Error('상세 불러오기 실패')
        const concernData = await concernRes.json()

        setConcern({
          id: concernData.id,
          name: concernData.author || '익명',
          title: concernData.title,
          content: concernData.content,
          date: new Date(concernData.createdAt).toLocaleString('ko-KR', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
        })

        const commentRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/community/${id}/comments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        if (!commentRes.ok) throw new Error('댓글 불러오기 실패')
        const commentData = await commentRes.json()

        setComments(commentData)
      } catch (err) {
        console.error('불러오기 실패:', err)
      }
    }

    fetchData()
  }, [id])

  const handleToggleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  const handleAddComment = async () => {
    if (!comment.trim() || !id) return
    const token = localStorage.getItem('access_token')
    if (!token) return alert('로그인이 필요합니다.')

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/community/${id}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: comment }),
        },
      )

      if (!response.ok) throw new Error('댓글 작성 실패')

      const newComment = await response.json()
      setComments((prev) => [...prev, newComment])
      setComment('')
    } catch (err) {
      console.error('댓글 작성 오류:', err)
      alert('댓글 작성에 실패했습니다.')
    }
  }

  const handleDelete = async (commentId: number) => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/community/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!res.ok) {
        if (res.status === 403) alert('본인 댓글만 삭제할 수 있어요!')
        else throw new Error('삭제 실패')
        return
      }

      setComments((prev) => prev.filter((c) => c.id !== commentId))
    } catch (err) {
      console.error('댓글 삭제 실패:', err)
      alert('댓글 삭제 중 문제가 발생했습니다.')
    }
  }

  const startEdit = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId)
    setEditContent(currentContent)
  }

  const handleEditSubmit = async (commentId: number) => {
    const token = localStorage.getItem('access_token')
    if (!token || !editContent.trim()) return

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/community/comments/${commentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: editContent }),
        },
      )

      if (!res.ok) {
        if (res.status === 403) alert('본인 댓글만 수정할 수 있어요!')
        else throw new Error('수정 실패')
        return
      }

      const updated = await res.json()

      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, content: updated.content } : c,
        ),
      )
      setEditingCommentId(null)
      setEditContent('')
    } catch (err) {
      console.error('댓글 수정 실패:', err)
      alert('댓글 수정에 실패했습니다.')
    }
  }

  if (!concern) return <div className="p-4">Loading...</div>

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-4 pt-4 pb-[120px]">
        {/* 위쪽: 뒤로가기 + 커뮤니티 텍스트 */}
        <div className="pb-[12px] flex items-center text-[20px] font-semibold text-gray-800">
          <button
            onClick={() => navigate('/community/concerns')}
            className="mr-2 cursor-pointer"
            aria-label="뒤로가기"
          >
            <img src={Back} alt="뒤로가기" className="w-4 h-4" />
          </button>
          <span>커뮤니티</span>
        </div>

        <div className="mb-3 h-[215px] flex flex-col">
          {/* 상단: 프로필/이름/날짜 */}
          <div>
            <div className="flex items-center mb-2">
              <img
                src={profileImg}
                alt="작성자 프로필"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <div>
                <p className="text-sm font-medium">{concern.name}</p>
                <p className="text-xs text-gray-400">{concern.date}</p>
              </div>
            </div>

            {/* 제목/내용 */}
            <h2 className="text-lg font-bold mb-2">{concern.title}</h2>
            <p className="text-sm text-gray-700 mb-7 whitespace-pre-line">
              {concern.content}
            </p>
          </div>

          {/* 하단: 버튼 2개 (아이콘 자체가 버튼) */}
          <div className="flex items-center gap-6 pt-2">
            {/* 좋아요 */}
            <button
              type="button"
              onClick={handleToggleLike}
              className="relative"
            >
              <img
                src={liked ? likeIconPressed : likeIcon}
                alt="좋아요"
                className="w-[172px] h-[50px] transition hover:opacity-80"
              />
              {/* 카운트 오버레이 */}
              <span
                className="
    pointer-events-none
    absolute left-[300px] top-1/2 -translate-y-[48%]
    text-[13px] font-semibold text-[#8C8C8C]
  "
                aria-hidden
              >
                {likeCount}
              </span>
            </button>

            {/* 댓글 */}
            <button type="button">
              <img
                src={commentIcon}
                alt="댓글"
                className="w-[172px] h-[50px]"
              />
            </button>
          </div>

          <div className="mt-[15px] h-[2px] bg-[#E3E3E3] w-full" />
        </div>

        {/* 댓글 리스트 */}
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-3 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={profileImg}
                  alt="작성자 프로필"
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <div className="text-sm font-medium">{c.author}</div>
                <div className="text-xs text-gray-400 ml-auto">
                  {new Date(c.createdAt).toLocaleString('ko-KR', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {editingCommentId === c.id ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-[300px] px-3 py-1 border rounded text-sm focus:outline-none focus:ring-0"
                  />
                  <button
                    onClick={() => handleEditSubmit(c.id)}
                    className="text-sm text-[#4E9366]"
                  >
                    저장
                  </button>
                </div>
              ) : (
                <p className="pt-[10px] pl-[5px] text-sm text-gray-800">
                  {c.content}
                </p>
              )}

              {editingCommentId !== c.id && (
                <div className="flex gap-2 mt-2 text-xs text-right justify-end">
                  <button
                    onClick={() => startEdit(c.id, c.content)}
                    className="text-blue-500"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-500"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[90px] left-0 right-0 max-w-[400px] mx-auto px-4 z-50">
        <div className="w-full flex items-center bg-[#E4E4E4] px-4 py-2 rounded-full gap-2">
          <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4 text-[#8C8C8C]" />
          <input
            id="commentInput"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddComment()
            }}
            placeholder="댓글을 입력하세요."
            className="flex-1 bg-transparent text-sm text-[#8C8C8C] focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
