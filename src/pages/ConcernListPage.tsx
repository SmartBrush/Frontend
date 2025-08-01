import { useEffect, useState } from 'react'
import ConcernCard from '../components/Community/ConcernCard'
import TabMenu from '../components/Community/TabMenu'
import SearchBar from '../components/Community/SearchBar'

import { useNavigate } from 'react-router-dom'
import editIcon from '../assets/edit.png'

interface Concern {
  id: number
  title: string
  content: string
  author: string
  profileImage: string
  createdAt: string
}

export default function ConcernListPage() {
  const navigate = useNavigate()
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

        if (!response.ok) throw new Error('불러오기 실패')

        const data = await response.json()
        setConcerns(data)
      } catch (error) {
        console.error('고민 리스트 가져오기 오류:', error)
      }
    }

    fetchConcerns()
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <TabMenu />
      <SearchBar />
      <div className="px-4 pb-24">
        <div className="pt-2">
          {concerns.map((item, index) => (
            <div
              key={item.id}
              onClick={() => navigate(`/community/concerns/${item.id}`)}
              className="cursor-pointer"
            >
              <ConcernCard
                name={item.author || '익명'}
                content={item.content}
                date={item.createdAt?.slice(5, 10) || ''}
                isLast={index === concerns.length - 1}
              />
            </div>
          ))}
        </div>
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
