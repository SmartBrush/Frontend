import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TabMenu = () => {
  const tabs = ['인기', '토픽', '고민공유']
  const [activeTab, setActiveTab] = useState('인기')
  const navigate = useNavigate()

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)

    // 경로 이동
    if (tab === '토픽') {
      navigate('/community/hot-topics')
    } else if (tab === '고민공유') {
      navigate('/community/concerns')
    } else {
      navigate('/community') // '인기' 탭의 기본 경로
    }
  }

  return (
    <div className="flex justify-center border-b border-gray-200 text-sm font-medium">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`flex-1 py-2 text-center
            ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-gray-300'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default TabMenu
