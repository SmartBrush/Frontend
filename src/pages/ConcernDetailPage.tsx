import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid'
import profileImg from '../assets/profile.png'
import Back from '../assets/back.svg'
import likeIcon from '../assets/like.svg'
import likeIconPressed from '../assets/likepressed.svg'
import commentIcon from '../assets/comment.svg'

import {
  fetchConcernDetail,
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  toggleLike,
  type ConcernDetail,
  type CommentItem,
} from '../apis/community'

export default function ConcernDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [concern, setConcern] = useState<ConcernDetail | null>(null)
  const [comments, setComments] = useState<CommentItem[]>([])
  const [comment, setComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    if (!id) return
    ;(async () => {
      try {
        const [detail, list] = await Promise.all([
          fetchConcernDetail(id),
          fetchComments(id),
        ])
        setConcern(detail)
        setComments(list)
        // setConcern(prev => prev ? { ...prev, commentCount: list.length } : prev)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [id])

  if (!concern) return <div className="p-4">Loading...</div>

  const handleToggleLike = async () => {
    if (!id || !concern) return
    try {
      const res = await toggleLike(id, concern.liked)
      setConcern({ ...concern, liked: res.liked, likeCount: res.likeCount })
    } catch (e) {
      console.error(e)
      alert('좋아요 처리에 실패했습니다.')
    }
  }

  // 댓글 추가
  const handleAddComment = async () => {
    if (!id || !comment.trim() || !concern) return
    try {
      const created = await createComment(id, comment.trim())
      if ('id' in created) setComments((prev) => [...prev, created])

      if (typeof (created as any)?.commentCount === 'number') {
        setConcern({ ...concern, commentCount: (created as any).commentCount })
      } else {
        const fresh = await fetchConcernDetail(id)
        setConcern(fresh)
      }
      setComment('')
    } catch (e) {
      console.error(e)
      alert('댓글 작성에 실패했습니다.')
    }
  }

  // 댓글 삭제
  const handleDelete = async (commentId: number) => {
    if (!id || !concern) return
    try {
      const res = await deleteComment(commentId)
      setComments((prev) => prev.filter((c) => c.id !== commentId))

      if (typeof (res as any)?.commentCount === 'number') {
        setConcern({ ...concern, commentCount: (res as any).commentCount })
      } else {
        const fresh = await fetchConcernDetail(id)
        setConcern(fresh)
      }
    } catch (e) {
      console.error(e)
      alert('댓글 삭제 중 문제가 발생했습니다.')
    }
  }

  const startEdit = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId)
    setEditContent(currentContent)
  }

  const handleEditSubmit = async (commentId: number) => {
    if (!editContent.trim()) return
    try {
      const updated = await updateComment(commentId, editContent.trim())
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, content: updated.content } : c,
        ),
      )
      setEditingCommentId(null)
      setEditContent('')
    } catch (e) {
      console.error(e)
      alert('댓글 수정에 실패했습니다.')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-4 pt-4 pb-[120px]">
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
          <div>
            <div className="flex items-center mb-2">
              <img
                src={profileImg}
                alt="작성자 프로필"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <div>
                <p className="text-sm font-medium">
                  {concern.author || '익명'}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(concern.createdAt).toLocaleString('ko-KR', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <h2 className="text-lg font-bold mb-2">{concern.title}</h2>
            <p className="text-sm text-gray-700 mb-7 whitespace-pre-line">
              {concern.content}
            </p>
          </div>

          <div className="flex items-center gap-6 pt-2">
            {/* 좋아요 */}
            <button
              type="button"
              onClick={handleToggleLike}
              className="relative"
            >
              <img
                src={concern.liked ? likeIconPressed : likeIcon}
                alt="좋아요"
                className="w-[172px] h-[50px] transition hover:opacity-80"
              />
              <span className="pointer-events-none absolute right-[38px] top-1/2 -translate-y-1/2 text-[13px] font-semibold text-[#8C8C8C]">
                {concern.likeCount}
              </span>
            </button>

            {/* 댓글 */}
            <button
              type="button"
              onClick={() => document.getElementById('commentInput')?.focus()}
              className="relative"
            >
              <img
                src={commentIcon}
                alt="댓글"
                className="w-[172px] h-[50px]"
              />
              <span className="pointer-events-none absolute right-[58px] top-1/2 -translate-y-1/2 text-[13px] font-semibold text-[#8C8C8C]">
                {concern.commentCount}
              </span>
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
