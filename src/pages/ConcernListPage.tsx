import { useEffect, useState } from 'react'
import ConcernCard from '../components/Community/ConcernCard'
import TabMenu from '../components/Community/TabMenu'
import SearchBar from '../components/Community/SearchBar'
import { useNavigate } from 'react-router-dom'
import editIcon from '../assets/edit.png'
import {
  fetchConcernList,
  searchConcerns,
  type Concern,
} from '../apis/community'

export default function ConcernListPage() {
  const navigate = useNavigate()
  const [concerns, setConcerns] = useState<Concern[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [keyword, setKeyword] = useState('')

  const handleSearch = async (kw: string) => {
    setLoading(true)
    setError(null)
    try {
      const trimmed = kw.trim()
      const data =
        trimmed.length === 0
          ? await fetchConcernList()
          : await searchConcerns(trimmed)
      setConcerns(data)
    } catch (e) {
      setError('검색 중 오류가 발생했어요')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // 입력 시 자동 검색(디바운스 300ms) + 초기 로드
  useEffect(() => {
    let alive = true
    const timer = setTimeout(async () => {
      if (!alive) return
      await handleSearch(keyword)
    }, 300)
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [keyword])

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <TabMenu />

      {/* onSubmit 제거 */}
      <SearchBar value={keyword} onChange={setKeyword} />

      <div className="px-4 pb-5">
        {loading && (
          <div className="pt-2 text-sm text-gray-500">불러오는 중...</div>
        )}
        {error && <div className="pt-2 text-sm text-red-500">{error}</div>}

        {!loading && !error && (
          <div className="pt-1">
            {concerns.length === 0 ? (
              <div className="text-sm text-gray-500">검색 결과가 없습니다.</div>
            ) : (
              <ul className="divide-y divide-[#E3E3E3]">
                {concerns.map((item) => (
                  <li
                    key={item.id}
                    className="cursor-pointer outline-none select-none"
                    role="link"
                    tabIndex={0}
                    onClick={() => navigate(`/community/concerns/${item.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        navigate(`/community/concerns/${item.id}`)
                      }
                    }}
                  >
                    <ConcernCard
                      name={item.author || '익명'}
                      content={item.content}
                      date={(item.createdAt || '').slice(5, 10)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => navigate('/community/concerns/post')}
        className="fixed bottom-[80px] right-[calc(50%-200px+16px)] w-[48px] h-[48px] rounded-full bg-[#4E9366] text-white flex items-center justify-center shadow-md z-50"
      >
        <img src={editIcon} alt="글쓰기" className="w-[12px] h-[12px]" />
      </button>
    </div>
  )
}
