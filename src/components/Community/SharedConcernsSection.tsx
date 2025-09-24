import { useEffect, useState } from 'react'
import ConcernCard from './ConcernCard'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface Concern {
  name: string
  content: string
  date: string
}

const SharedConcernsSection = () => {
  const [concerns, setConcerns] = useState<Concern[]>([])

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/community/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!response.ok) throw new Error('서버 응답 실패')

        const data = await response.json()

        const formatted = data.map((item: any) => ({
          name: item.author || '익명',
          content: item.content,
          date: item.createdAt?.slice(5, 10) || '',
        }))

        setConcerns(formatted)
      } catch (err) {
        console.error('고민 리스트 가져오기 실패:', err)
      }
    }

    fetchConcerns()
  }, [])

  return (
    <section className="px-4 pt-4">
      <div className="bg-white border border-gray-200 rounded-xl px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">고민을 나눠보아요! 💕</h2>
          <Link to="/community/concerns">
            <FiChevronRight className="text-gray-400 cursor-pointer" />
          </Link>
        </div>

        {concerns.length === 0 ? (
          <div className="py-8 text-center text-[#8C8C8C] text-sm">
            아직 올라온 고민이 없습니다.
          </div>
        ) : (
          <ul className="divide-y divide-[#E3E3E3]">
            {concerns.map((item, idx) => (
              <li key={`${item.name}-${idx}`} className="py-3">
                <ConcernCard
                  name={item.name}
                  content={item.content}
                  date={item.date}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default SharedConcernsSection
