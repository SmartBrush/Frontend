// import { Outlet, useLocation } from 'react-router-dom'
// import Navbar from '../components/NavBar/NavBar'
// import logo from '../assets/dupiona.png'
// import rightImg from '../assets/back.png'

// const NAV_H = 72

// const RootLayout = () => {
//   const { pathname } = useLocation()
//   const hideNavbar =
//     pathname.startsWith('/question') || pathname.startsWith('/login')

//   return (
//     <div className="relative min-h-screen w-full flex justify-center bg-[#E6E6E6] font-[Pretendard]">
//       {/* 왼쪽 배경 영역 */}
//       <div
//         className="
//           pointer-events-none
//           absolute left-20 top-1/2 -translate-y-1/2
//           max-lg:hidden
//           text-center text-white
//           w-[420px]
//         "
//       >
//         <img
//           src={logo}
//           alt="두피어나"
//           className="block mx-auto w-[260px] h-auto object-contain"
//         />
//         <div className="mt-5 ml-10 text-xl font-medium text-black">
//           : 한번의 터치로 두피를 진단하다
//         </div>
//       </div>

//       {/* 오른쪽 배경 이미지 */}
//       <div
//         className="
//           pointer-events-none
//           absolute right-5 top-1/2 -translate-y-1/2
//           max-lg:hidden
//         "
//         aria-hidden
//       >
//         <img
//           src={rightImg}
//           alt=""
//           className="block w-[480px] max-w-none h-auto object-contain opacity-90 drop-shadow-[0_6px_24px_rgba(0,0,0,0.15)]"
//         />
//       </div>

//       {/* 앱 박스 */}
//       <div className="w-full max-w-[400px] flex flex-col h-screen bg-white relative z-[1]">
//         <main
//           className="flex-1 overflow-y-auto bg-white"
//           style={{ paddingBottom: hideNavbar ? 0 : `calc(${NAV_H}px)` }}
//         >
//           <Outlet />
//         </main>

//         {!hideNavbar && (
//           <div
//             className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[400px]"
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
import logo from '../assets/dupiona.png'
import rightImg from '../assets/back.png'

const RootLayout = () => {
  const { pathname } = useLocation()
  const hideNavbar =
    pathname.startsWith('/question') || pathname.startsWith('/login')

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#E6E6E6] font-[Pretendard]">
      {/* 왼쪽 배경 영역 */}
      <div
        className="
          pointer-events-none
          absolute left-20 top-1/2 -translate-y-1/2
          max-lg:hidden
          text-center text-white
          w-[420px]
        "
      >
        <img
          src={logo}
          alt="두피어나"
          className="block mx-auto w-[260px] h-auto object-contain"
        />
        <div className="mt-5 ml-10 text-xl font-medium text-black">
          : 한번의 터치로 두피를 진단하다
        </div>
      </div>

      {/* 오른쪽 배경 이미지 */}
      <div
        className="
          pointer-events-none
          absolute right-5 top-1/2 -translate-y-1/2
          max-lg:hidden
        "
        aria-hidden
      >
        <img
          src={rightImg}
          alt=""
          className="block w-[480px] max-w-none h-auto object-contain opacity-90 drop-shadow-[0_6px_24px_rgba(0,0,0,0.15)]"
        />
      </div>

      <div
        id="app-container"
        className={`
    relative z-[1] w-full max-w-[400px] h-[min(800px,100vh)]
    bg-white shadow-lg overflow-hidden
    grid ${hideNavbar ? 'grid-rows-[1fr]' : 'grid-rows-[1fr_auto]'}
  `}
      >
        {/* 본문 */}
        <main className="min-h-0 overflow-y-auto bg-white">
          <Outlet />
        </main>

        {/* 네비게이션바 */}
        {!hideNavbar && <Navbar />}
      </div>

      {/* 화면 높이가 740px 이상일 때만 라운드 적용 */}
      <style>{`
        @media (min-height: 740px) {
          #app-container { border-radius: 0.75rem; /* rounded-xl */ }
        }
      `}</style>
    </div>
  )
}

export default RootLayout
