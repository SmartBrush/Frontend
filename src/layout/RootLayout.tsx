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

const NAV_H = 72

const RootLayout = () => {
  const { pathname } = useLocation()
  const hideNavbar =
    pathname.startsWith('/question') || pathname.startsWith('/login')

  return (
    <div className="relative min-h-screen w-full bg-[#E6E6E6] font-[Pretendard]">
      <div
        className="
          pointer-events-none
          absolute inset-0 z-0
          hidden lg:grid
          grid-cols-[1fr_400px_1fr]
        "
        aria-hidden
      >
        {/* 왼쪽 배경 */}
        <div className="col-[1] grid place-items-center px-6">
          <div className="text-center">
            <img
              src={logo}
              alt="두피어나"
              className="mx-auto block w-full max-w-[260px] h-auto object-contain"
            />
            <div className="mt-5 text-xl ml-10 font-medium text-black">
              : 한번의 터치로 두피를 진단하다
            </div>
          </div>
        </div>

        <div className="col-[2]" />

        {/* 오른쪽 배경 */}
        <div className="col-[3] grid place-items-center px-6">
          <img
            src={rightImg}
            alt=""
            className="block w-full max-w-[480px] h-auto object-contain opacity-90 drop-shadow-[0_6px_24px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>

      <div className="relative z-[1] min-h-screen flex justify-center">
        <div className="w-[400px] h-screen bg-white flex flex-col">
          <main
            className="flex-1 overflow-y-auto bg-white"
            style={{ paddingBottom: hideNavbar ? 0 : `calc(${NAV_H}px)` }}
          >
            <Outlet />
          </main>

          {!hideNavbar && (
            <div
              className="fixed left-1/2 -translate-x-1/2 bottom-0 w-[400px]"
              style={{ height: NAV_H }}
            >
              <Navbar />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RootLayout
