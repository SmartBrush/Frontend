import ConcernCard from '../components/Community/ConcernCard'
import TabMenu from '../components/Community/TabMenu'
import SearchBar from '../components/Community/SearchBar'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TabMenu />
      <SearchBar />
      <div className="px-4 pb-24">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-base font-semibold">고민을 나눠보아요! 💕</h1>
            <button
              onClick={() => navigate('/community/concerns/post')}
              className="p-1 rounded hover:bg-gray-100"
            >
              <FiEdit className="w-5 h-5 text-gray-700" />
            </button>
          </div>

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
