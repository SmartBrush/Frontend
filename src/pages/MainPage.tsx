// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Calendar from '../components/Main/Calendar'
// import TodayScalpStatus from '../components/Main/TodayScalpStatus'

// const MainPage = () => {
//   const navigate = useNavigate()

//   useEffect(() => {
//     const token = localStorage.getItem('access_token')
//     if (!token) {
//       navigate('/login')
//     }
//   }, [navigate])

//   return (
//     <div className="h-screen flex flex-col overflow-hidden">
//       <div className="flex-1">
//         <Calendar />
//       </div>
//       <div className="flex-1">
//         <TodayScalpStatus />
//       </div>
//     </div>
//   )
// }

// export default MainPage

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
    // 부모(main)의 높이를 그대로 채우고, 두 영역 비율을 68:32로 고정
    <div className="h-full grid grid-rows-[63%_47%] gap-2 overflow-hidden">
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
