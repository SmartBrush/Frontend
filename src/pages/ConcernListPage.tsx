import ConcernCard from '../components/Community/ConcernCard'
import TabMenu from '../components/Community/TabMenu'
import SearchBar from '../components/Community/SearchBar'

const concerns = [
  { name: '익명', content: '좋은 탈모 샴푸 있나요 ...' },
  { name: '익명', content: '좋은 탈모 샴푸 있나요 ...' },
  { name: '익명', content: '좋은 탈모 샴푸 있나요 ...' },
  { name: '시윤', content: '좋은 탈모 샴푸 있나요 ...' },
  { name: '익명', content: '좋은 탈모 샴푸 있나요 ...' },
  { name: '익명', content: '좋은 탈모 샴푸 있나요 ...' },
  { name: '시윤', content: '좋은 탈모 샴푸 있나요 ...' },
  { name: '익명', content: '좋은 탈모 샴푸 있나요 ...' },
]

export default function ConcernListPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TabMenu />
      <SearchBar />
      <div className="px-4 pt-4 pb-24">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h1 className="text-base font-semibold mb-4">
            고민을 나눠보아요! 💕
          </h1>
          <div className="space-y-3">
            {concerns.map((item, idx) => (
              <ConcernCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
