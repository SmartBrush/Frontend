// import { Outlet } from 'react-router-dom'
// import Navbar from '../components/NavBar/NavBar'

// const RootLayout = () => {
//   return (
//     <div className="min-h-screen w-full flex justify-center bg-[#313131] font-[Pretendard] overflow-hidden">
//       <div className="w-full max-w-[400px] flex flex-col relative">
//         {/* 스크롤 가능한 영역 */}
//         <main
//           className="overflow-y-auto bg-[#f5f5f5]"
//           style={{ height: 'calc(100vh - 64px)' }}
//         >
//           <Outlet />
//         </main>

//         {/* 고정된 네비게이션 바 */}
//         <div className="h-[64px] w-full shrink-0 bg-white sticky bottom-0 z-10">
//           <Navbar />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RootLayout

// import { Outlet } from 'react-router-dom'
// import Navbar from '../components/NavBar/NavBar'

// const RootLayout = () => {
//   return (
//     <div className="min-h-screen w-full flex justify-center bg-[#313131] font-[Pretendard]">
//       <div className="w-full max-w-[400px] flex flex-col h-screen">
//         {/* 스크롤 가능한 영역 */}
//         <main className="flex-1 overflow-y-auto bg-[#f5f5f5]">
//         <main className="flex-1 overflow-y-auto bg-white">
//           <Outlet />
//         </main>

//         {/* 고정된 네비게이션 바 */}
//         <div className="h-[64px] w-full shrink-0 bg-white">
//           <Navbar />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RootLayout

// import { Outlet, useLocation } from 'react-router-dom'
// import Navbar from '../components/NavBar/NavBar'

// const NAV_H = 64

// const RootLayout = () => {
//   const location = useLocation()

//   // /question으로 시작하는 페이지에서는 NavBar 숨기기
//   const isQuestionPage = location.pathname.startsWith('/question')

//   return (
//     <div className="min-h-screen w-full flex justify-center bg-black font-[Pretendard]">
//       <div className="w-full max-w-[400px] mx-auto relative">
//         <main
//           className="overflow-y-auto bg-white"
//           style={{
//             minHeight: isQuestionPage ? '100vh' : `calc(100vh - ${NAV_H}px)`,
//           }}
//         >
//           <Outlet />
//         </main>

//         {!isQuestionPage && (
//           <div
//             className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-white"
//             style={{ height: NAV_H }}
//           >
//             <Navbar />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default RootLayout

import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/NavBar/NavBar'

const RootLayout = () => {
  const location = useLocation()
  const pathname = location.pathname

  // question 페이지나 login 페이지에서는 NavBar 숨김
  const hideNavbar =
    pathname.startsWith('/question') || pathname.startsWith('/login')

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#313131] font-[Pretendard]">
      {/* 앱 전체 박스 */}
      <div className="w-full max-w-[400px] flex flex-col h-screen bg-white">
        {/* 안쪽에서만 스크롤 */}
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>

        {/* NavBar는 hideNavbar 아닐 때만 */}
        {!hideNavbar && (
          <div className="h-[64px] w-full shrink-0 bg-white">
            <Navbar />
          </div>
        )}
      </div>
    </div>
  )
}

export default RootLayout
