// src/pages/HotTopicListPage.tsx
import hot1 from '../assets/hot1.png'
import hot2 from '../assets/hot2.png'
import HotTopicCard from '../components/Community/HotTopicCard'
import TabMenu from '../components/Community/TabMenu'
import SearchBar from '../components/Community/SearchBar'

const mockData = [
  {
    title: '나도 혹시 정수리 탈모?',
    desc: '최근 2030 여성들에게 나타나고 있는...',
    author: '탈모박사',
    date: '2025.03.17',
    tags: ['여성탈모', '탈모고민'],
    imageUrl: hot1,
  },
  {
    title: '빈 뒤통수! 스트레스 유발',
    desc: '서울시에 거주하는 최모씨(56)는 최근...',
    author: '모발모발',
    date: '2025.03.17',
    tags: ['남성탈모', '가발'],
    imageUrl: hot2,
  },
]

export default function HotTopicListPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        <TabMenu />
        <SearchBar />
        <div className="px-4 py-6">
          <h1 className="text-xl font-bold mb-4">전체 핫토픽</h1>
          <div className="space-y-4">
            {mockData.map((item, idx) => (
              <HotTopicCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
