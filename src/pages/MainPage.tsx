import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from '../components/Main/Calendar'
import TodayScalpStatus from '../components/Main/TodayScalpStatus'

const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) navigate('/login')
  }, [navigate])

  return (
    // 전체 높이를 강제로 나누지 않고, 자식이 필요한 만큼만 차지
    <div className="flex flex-col gap-2 overflow-y-auto">
      <section className="overflow-hidden">
        <Calendar />
      </section>
      <section className="overflow-hidden">
        <TodayScalpStatus />
      </section>
    </div>
  )
}

export default MainPage
