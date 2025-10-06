import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from '../components/Main/Calendar'
import TodayScalpStatus from '../components/Main/TodayScalpStatus'
import InlineResizablePanel from '../components/Main/InlineResizablePanel'

const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) navigate('/login')
  }, [navigate])

  return (
    <div className="relative flex flex-col h-[calc(100vh-72px)] overflow-hidden">
      <section className="flex-1 overflow-auto">
        <Calendar />
      </section>

      {/* 하단 리사이즈 패널: 기본 35vh, 120px~90vh 사이 드래그 조절 */}
      <InlineResizablePanel
        initialHeight="43vh"
        minHeight="35vh"
        maxHeight="43vh"
        bottomOffset={0} // 고정 네비 높이
        storageKey="today-panel-height"
      >
        <TodayScalpStatus />
      </InlineResizablePanel>
    </div>
  )
}

export default MainPage
