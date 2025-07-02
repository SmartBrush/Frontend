import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TabMenu = () => {
  const tabs = ['인기', '토픽', '고민공유']
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('인기')

  // 현재 경로에 따라 탭 상태 설정
  useEffect(() => {
    if (location.pathname.includes('/community/hot-topics')) {
      setActiveTab('토픽')
    } else if (location.pathname.includes('/community/concerns')) {
      setActiveTab('고민공유')
    } else {
      setActiveTab('인기')
    }
  }, [location.pathname])

  const handleTabClick = (tab: string) => {
    // 클릭 시 경로 이동
    if (tab === '토픽') {
      navigate('/community/hot-topics')
    } else if (tab === '고민공유') {
      navigate('/community/concerns')
    } else {
      navigate('/community') // 인기
    }
  }

  return (
    <div className="flex justify-center border-b border-gray-200 text-sm font-medium">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`flex-1 py-2 text-center transition-colors duration-200
            ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-gray-400'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default TabMenu
