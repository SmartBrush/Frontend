import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ConcernPostPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return
    alert('고민이 작성되었습니다!')
    navigate('/community/concerns/1')
  }

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2 text-xl">
          ←
        </button>
        <span className="text-lg font-medium">고민공유</span>
      </div>

      <h2 className="text-xl font-bold mb-6">고민을 작성해주세요!</h2>

      <label className="text-sm font-medium mb-1">제목</label>
      <input
        className="w-full p-3 mb-4 bg-gray-200 rounded-xl text-sm"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="text-sm font-medium mb-1">내용</label>
      <textarea
        className="w-full h-64 p-3 mb-6 bg-gray-200 rounded-xl text-sm resize-none"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className={`w-full py-3 rounded-xl text-white font-semibold ${
          title && content
            ? 'bg-blue-400 hover:bg-blue-500'
            : 'bg-blue-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!title.trim() || !content.trim()}
        onClick={handleSubmit}
      >
        글 작성하기
      </button>
    </div>
  )
}
