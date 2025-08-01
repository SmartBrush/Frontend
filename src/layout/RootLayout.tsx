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

import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavBar/NavBar'

const RootLayout = () => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#313131] font-[Pretendard]">
      <div className="w-full max-w-[400px] flex flex-col h-screen">
        {/* 스크롤 가능한 영역 */}
        <main className="flex-1 overflow-y-auto bg-[#f5f5f5]">
          <Outlet />
        </main>

        {/* 고정된 네비게이션 바 */}
        <div className="h-[64px] w-full shrink-0 bg-white">
          <Navbar />
        </div>
      </div>
    </div>
  )
}

export default RootLayout
