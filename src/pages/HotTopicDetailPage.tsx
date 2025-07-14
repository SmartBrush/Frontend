import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiHeart, FiBookmark } from 'react-icons/fi'
import { FaHeart, FaBookmark } from 'react-icons/fa'
import hot1 from '../assets/hot1.png'
import hot2 from '../assets/hot2.png'

const posts = [
  {
    id: 1,
    title: '나도 혹시 정수리 탈모?',
    author: '탈모박사',
    date: '2025.03.17',
    tags: ['여성탈모', '탈모고민'],
    imageUrl: hot1,
    content:
      '최근 2030 여성들에게 나타나고 있는 정수리 탈모...\n내용 내용 내용',
  },
  {
    id: 2,
    title: '빈 뒤통수! 스트레스 유발',
    author: '모발모발',
    date: '2025.03.17',
    tags: ['남성탈모', '가발'],
    imageUrl: hot2,
    content: '서울시에 거주하는 최모씨(56)는 최근...\n내용 내용 내용',
  },
  {
    id: 3,
    title: '빈 뒤통수! 스트레스 유발',
    author: '모발모발',
    date: '2025.03.18',
    tags: ['남성탈모', '가발'],
    imageUrl: hot2,
    content: '서울시에 거주하는 최모씨(56)는 최근...\n내용 내용 내용',
  },
  {
    id: 4,
    title: '빈 뒤통수! 스트레스 유발',
    author: '모발모발',
    date: '2025.03.19',
    tags: ['남성탈모', '가발'],
    imageUrl: hot2,
    content: '서울시에 거주하는 최모씨(56)는 최근...\n내용 내용 내용',
  },
  {
    id: 5,
    title: '빈 뒤통수! 스트레스 유발',
    author: '모발모발',
    date: '2025.03.20',
    tags: ['남성탈모', '가발'],
    imageUrl: hot2,
    content: '서울시에 거주하는 최모씨(56)는 최근...\n내용 내용 내용',
  },
]

export default function HotTopicDetailPage() {
  const { id } = useParams()
  const topicId = Number(id)

  const post = posts.find((p) => p.id === topicId)
  const [liked, setLiked] = useState(false)
  const [scrapped, setScrapped] = useState(false)

  if (!post) return <div className="p-4">해당 토픽을 찾을 수 없습니다.</div>

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 컨텐츠 영역 */}
      <div className="flex-1 pl-12 pr-8 pt-4 py-4">
        {/* 뒤로가기 + 타이틀 */}
        <div className="flex items-center gap-2 mb-2">
          <Link to="/community/hot-topics">
            <FiArrowLeft className="text-black text-lg" />
          </Link>
          <span className="text-sm font-medium">토픽</span>
        </div>

        {/* 제목 */}
        <h1 className="text-xl pt-[15px] font-bold">{post.title}</h1>

        {/* 작성자 + 날짜 */}
        <div className="text-xs pt-[5px] text-gray-400 mt-1">
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
          className="w-[180px] mt-4 rounded-xl object-cover"
        />

        {/* 본문 */}
        <p className="text-sm text-gray-700 whitespace-pre-line mt-4 pb-4">
          {post.content}
        </p>

        {/* 하단 버튼 */}
        <div className="fixed bottom-[70px] pb-[30px] left-0 right-0 z-30  flex justify-around items-center max-w-[400px] mx-auto">
          <button
            className="flex items-center w-[172px] h-[50px] justify-center bg-[#E4E4E4] rounded-lg"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <FaHeart className="text-[#E66D6D] w-5 h-5" />
            ) : (
              <FiHeart className="text-gray-600 w-5 h-5" />
            )}
            <span className="text-sm pl-[5px] text-gray-700">좋아요</span>
          </button>
          <button
            className="flex items-center w-[172px] h-[50px] justify-center bg-[#E4E4E4] rounded-lg"
            onClick={() => setScrapped(!scrapped)}
          >
            {scrapped ? (
              <FaBookmark className="text-[#6B85E6] w-5 h-5" />
            ) : (
              <FiBookmark className="text-gray-600 w-5 h-5" />
            )}
            <span className="text-sm pl-[5px] text-gray-700">스크랩</span>
          </button>
        </div>
      </div>
    </div>
  )
}
