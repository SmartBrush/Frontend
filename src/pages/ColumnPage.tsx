import TabMenu from '../components/Community/TabMenu'
import ColumnSearchBar from '../components/Community/ColumnSearchBar'
import ColumnMainSection from '../components/Community/ColumnMainSection'
import ColumnListSection from '../components/Community/ColumnListSection'
import {
  getAllMagazines,
  searchMagazines,
  type Magazine,
} from '../apis/magazine'
import { useEffect, useState } from 'react'

const ColumnPage = () => {
  const [main, setMain] = useState<Magazine | null>(null)
  const [list, setList] = useState<Magazine[]>([])
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (kw: string) => {
    setLoading(true)
    setError(null)
    try {
      const trimmed = kw.trim()

      if (trimmed.length === 0) {
        const data = await getAllMagazines(100)
        if (data.length > 0) {
          setMain((prev) => prev ?? data[0])
          setList(data.slice(1))
        }
      } else {
        const data = await searchMagazines(trimmed, 100)
        setList(data)
      }
    } catch (e) {
      setError('검색 중 오류가 발생했어요')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

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

  useEffect(() => {
    handleSearch('')
  }, [])

  return (
    <div className="min-h-screen mb-5 font-[Pretendard] bg-white flex flex-col justify-between">
      <div>
        <TabMenu />
        <ColumnSearchBar value={keyword} onChange={setKeyword} />

        {loading && (
          <div className="px-4 pt-2 text-sm text-gray-500">불러오는 중...</div>
        )}
        {error && <div className="px-4 pt-2 text-sm text-red-500">{error}</div>}

        {!loading && !error && (
          <>
            {main && <ColumnMainSection item={main} />}
            {list.length > 0 ? (
              <ColumnListSection items={list} />
            ) : (
              <div className="px-4 pt-4 text-sm text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ColumnPage
