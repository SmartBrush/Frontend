import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Comment {
  id: number
  name: string
  content: string
  date: string
}

interface Concern {
  id: number
  name: string
  title: string
  content: string
  date: string
  comments: Comment[]
}

const mockData: Record<string, Concern> = {
  '1': {
    id: 1,
    name: '시윤',
    title: '좋은 탈모 샴푸 있나요 ...',
    content:
      '요즘 탈모 때문에 고민이 너무 많은데 .. 혹시 써보고 효과봤던 샴푸 있을까요?',
    date: '7/2 21:04',
    comments: [
      {
        id: 1,
        name: '다연',
        content: '아 그 RYO? 그 샴푸 써봤는데 좋던데요?',
        date: '7/2 22:00',
      },
      {
        id: 2,
        name: '효진',
        content: '전 TS 샴푸 써봤는데 효과 잘 못봤어요 ....',
        date: '7/2 22:06',
      },
    ],
  },
}

export default function ConcernDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [concern, setConcern] = useState<Concern | null>(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (id && mockData[id]) {
      setConcern(mockData[id])
    }
  }, [id])

  if (!concern) return <div className="p-4">Loading...</div>

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-4 pt-4 pb-[110px]">
        {/* 상단 헤더 */}
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => navigate(-1)} className="text-xl">
            ←
          </button>
          <span className="text-sm font-medium">고민공유</span>
        </div>

        {/* 고민 정보 */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full mr-2" />
            <span className="font-medium text-sm">{concern.name}</span>
          </div>
          <h2 className="text-lg font-semibold mb-1">{concern.title}</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line mb-2">
            {concern.content}
          </p>
          <p className="text-xs text-gray-400">{concern.date}</p>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {concern.comments.map((c) => (
            <div key={c.id} className="border-t pt-3">
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 bg-blue-500 rounded-full mr-2" />
                <span className="font-medium text-sm">{c.name}</span>
              </div>
              <p className="text-sm text-gray-800">{c.content}</p>
              <p className="text-xs text-gray-400 mt-1">{c.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 댓글 입력창 */}
      <div className="fixed bottom-[70px] left-0 w-full bg-white border-t px-4 py-3 z-50 max-w-[400px] mx-auto">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요."
          className="w-full px-4 py-2 bg-gray-200 rounded-xl text-sm"
        />
      </div>
    </div>
  )
}
