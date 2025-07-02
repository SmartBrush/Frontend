import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import hot1 from '../assets/hot1.png'

export default function HotTopicDetailPage() {
  const post = {
    title: '나도 혹시 정수리 탈모?',
    author: '탈모박사',
    date: '2025.03.17',
    tags: ['여성탈모', '탈모고민'],
    imageUrl: hot1,
    content:
      '최근 2030 여성들에게 나타나고 있는 정수리 탈모...\n내용 내용 내용',
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* 가운데 카드 영역 */}
      <div className="bg-white w-full max-w-md rounded-xl overflow-hidden mt-0 pb-32 relative">
        <div className="px-4 pt-4">
          {/* 뒤로가기 + 타이틀 */}
          <div className="flex items-center gap-2 mb-2">
            <Link to="/community/hot-topics">
              <FiArrowLeft className="text-black text-lg" />
            </Link>
            <span className="text-sm font-medium">토픽</span>
          </div>

          {/* 제목 */}
          <h1 className="text-xl font-bold">{post.title}</h1>

          {/* 작성자 + 날짜 */}
          <div className="text-xs text-gray-400 mt-1">
            created by <span className="text-black">{post.author}</span> &nbsp;
            {post.date}
          </div>

          {/* 태그 */}
          <div className="flex gap-1 mt-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 이미지 */}
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full mt-4 rounded-xl object-cover"
          />

          {/* 본문 내용 */}
          <p className="text-sm text-gray-700 whitespace-pre-line mt-4 pb-4">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  )
}
