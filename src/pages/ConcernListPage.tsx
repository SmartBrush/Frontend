// src/pages/ConcernListPage.tsx
import ConcernCard from '../components/Community/ConcernCard'
import TabMenu from '../components/Community/TabMenu'
import SearchBar from '../components/Community/SearchBar'

const concerns = [
  { name: '익명', content: '좋은 탈모 샴푸 있나요 ...' },
  { name: '시윤', content: '좋은 탈모 샴푸 있나요 ...' },
  { name: '도영', content: '병원에 가야 할까요?' },
  { name: '미주', content: '스트레스로 머리가 빠지는 것 같아요' },
]

export default function ConcernListPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        <TabMenu />
        <SearchBar />
        <div className="px-4 py-6">
          <h1 className="text-xl font-bold mb-4">전체 고민 목록</h1>
          <div className="space-y-4">
            {concerns.map((item, idx) => (
              <ConcernCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
