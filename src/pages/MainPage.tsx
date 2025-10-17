// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Calendar from '../components/Main/Calendar'
// import TodayScalpStatus from '../components/Main/TodayScalpStatus'
// import InlineResizablePanel from '../components/Main/InlineResizablePanel'

// const MainPage = () => {
//   const navigate = useNavigate()

//   useEffect(() => {
//     const token = localStorage.getItem('access_token')
//     if (!token) navigate('/login')
//   }, [navigate])

//   return (
//     <div className="relative flex flex-col h-[calc(100vh-72px)] overflow-hidden">
//       <section className="flex-1 overflow-auto">
//         <Calendar />
//       </section>

//       {/* 하단 리사이즈 패널: 기본 35vh, 120px~90vh 사이 드래그 조절 */}
//       <InlineResizablePanel
//         initialHeight="43vh"
//         minHeight="35vh"
//         maxHeight="43vh"
//         bottomOffset={0} // 고정 네비 높이
//         storageKey="today-panel-height"
//       >
//         <TodayScalpStatus />
//       </InlineResizablePanel>
//     </div>
//   )
// }

// export default MainPage

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from '../components/Main/Calendar'
import TodayScalpStatus from '../components/Main/TodayScalpStatus'
import InlineResizablePanel from '../components/Main/InlineResizablePanel'

const MainPage = () => {
  const navigate = useNavigate()
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== 'undefined' ? window.innerHeight < 740 : false,
  )

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) navigate('/login')
  }, [navigate])

  // 화면 크기 감시 → 740px 기준으로 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerHeight < 740)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative flex flex-col h-[calc(100%)] overflow-hidden justify-between">
      {/* 달력 영역 높이 제한 */}
      <section className="max-h-[55vh] overflow-y-auto flex-shrink-0">
        <Calendar />
      </section>

      {/* 740px 미만일 때만 드래그 패널 활성화 */}
      {isSmallScreen ? (
        <InlineResizablePanel
          initialHeight="43vh"
          minHeight="35vh"
          maxHeight="43vh"
          bottomOffset={0}
          storageKey="today-panel-height"
        >
          <TodayScalpStatus />
        </InlineResizablePanel>
      ) : (
        //740px 이상이면 고정 패널로 표시
        <div className="w-full max-w-[400px] mx-auto rounded-t-[20px] overflow-hidden">
          <TodayScalpStatus />
        </div>
      )}
    </div>
  )
}

export default MainPage

// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Calendar from '../components/Main/Calendar'
// import TodayScalpStatus from '../components/Main/TodayScalpStatus'
// import InlineResizablePanel from '../components/Main/InlineResizablePanel'

// const MainPage = () => {
//   const navigate = useNavigate()
//   const [isSmallScreen, setIsSmallScreen] = useState(
//     typeof window !== 'undefined' ? window.innerHeight < 740 : false,
//   )

//   useEffect(() => {
//     const token = localStorage.getItem('access_token')
//     if (!token) navigate('/login')
//   }, [navigate])

//   // 화면 크기 감시 → 740px 기준으로 상태 업데이트
//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerHeight < 740)
//     }
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return (
//     // 전체 영역 (Navbar 위까지)
//     <div className="relative flex flex-col h-[calc(100%-72px)] overflow-hidden justify-between">
//       <section className="max-h-[55vh] overflow-y-auto flex-shrink-0">
//         <Calendar />
//       </section>

//       {isSmallScreen ? (
//         <InlineResizablePanel
//           initialHeight="43vh"
//           minHeight="35vh"
//           maxHeight="43vh"
//           bottomOffset={0}
//           storageKey="today-panel-height"
//           className="mt-auto" // ✅ 패널을 자동으로 가장 아래로 밀기
//         >
//           <TodayScalpStatus />
//         </InlineResizablePanel>
//       ) : (
//         <div className="w-full max-w-[400px] mx-auto rounded-t-[20px] overflow-hidden mt-auto">
//           <TodayScalpStatus />
//         </div>
//       )}
//     </div>
//   )
// }

// export default MainPage
