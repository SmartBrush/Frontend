import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Back from '../assets/back.svg'

export default function ConcernPostPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return

    const token = localStorage.getItem('access_token')
    if (!token) {
      alert('로그인이 필요합니다.')
      navigate('/login')
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/community/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        },
      )

      if (!response.ok) throw new Error('게시글 작성 실패')

      const data = await response.json()
      const postId = data.id

      alert('고민이 작성되었습니다!')
      navigate(`/community/concerns/${postId}`)
    } catch (error) {
      console.error('작성 중 오류 발생:', error)
      alert('작성에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-24 flex flex-col">
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

      <h2 className="text-[22px] font-bold mb-6">고민을 작성해주세요!</h2>

      {/* 제목 입력 */}
      <label className="text-[20px] font-semibold mb-1">제목</label>
      <input
        className="w-full border h-[50px] border-[#4E9366] rounded-xl p-3 mb-4 text-sm focus:outline-none"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 내용 입력 */}
      <label className="text-[20px] font-semibold mb-1">내용</label>
      <textarea
        className="w-full h-[367px] border border-[#4E9366] rounded-xl p-3 mb-6 text-sm resize-none focus:outline-none"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 버튼 영역 */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-1/2 py-3 rounded-xl bg-[#E4E4E4] text-black font-semibold shadow"
        >
          작성 취소
        </button>
        <button
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim()}
          className={`w-1/2 py-3 rounded-xl font-semibold shadow ${
            title && content
              ? 'bg-[#4E9366] text-white'
              : 'bg-[#D2E5DC] text-white cursor-not-allowed'
          }`}
        >
          글 작성하기
        </button>
      </div>
    </div>
  )
}
