import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from '../components/Main/Calendar'
import TodayScalpStatus from '../components/Main/TodayScalpStatus'

const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1">
        <Calendar />
      </div>
      <div className="flex-1">
        <TodayScalpStatus />
      </div>
    </div>
  )
}

export default MainPage
