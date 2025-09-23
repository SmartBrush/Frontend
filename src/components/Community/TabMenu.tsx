import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Back from '../../assets/back.svg'

const TabMenu = () => {
  const tabs = ['인기', '칼럼', '고민공유']
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('인기')

  // 현재 경로에 따라 탭 상태 설정
  useEffect(() => {
    if (location.pathname.includes('/community/column')) {
      setActiveTab('칼럼')
    } else if (location.pathname.includes('/community/concerns')) {
      setActiveTab('고민공유')
    } else {
      setActiveTab('인기')
    }
  }, [location.pathname])

  const handleTabClick = (tab: string) => {
    // 클릭 시 경로 이동
    if (tab === '칼럼') {
      navigate('/community/column')
    } else if (tab === '고민공유') {
      navigate('/community/concerns')
    } else {
      navigate('/community') // 인기
    }
  }

  return (
    <div className="flex flex-col font-[Pretendard] border-b border-gray-200 text-sm font-medium">
      <div className="px-4 py-[15px] flex items-center text-[20px] font-semibold text-gray-800">
        <button
          onClick={() => navigate('/')}
          className="mr-2 cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={Back} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <span>커뮤니티</span>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`flex-1 py-2 text-center transition-colors duration-200 cursor-pointer
            ${
              activeTab === tab
                ? 'text-[#4E9366] border-b-2 border-[#4E9366] font-semibold text-[15px]'
                : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabMenu
