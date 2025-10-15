// src/layouts/RootLayout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/NavBar/NavBar'

const NAV_H = 72

const RootLayout = () => {
  const { pathname } = useLocation()
  const hideNavbar =
    pathname.startsWith('/question') || pathname.startsWith('/login')

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#313131] font-[Pretendard]">
      <div className="w-full max-w-[400px] flex flex-col h-screen bg-white relative">
        {/* 내부 스크롤 + NavBar 높이만큼 패딩 */}
        <main
          className="flex-1 overflow-y-auto bg-white"
          style={{
            paddingBottom: hideNavbar ? 0 : `calc(${NAV_H}px`,
          }}
        >
          <Outlet />
        </main>

        {/* 고정 네비게이션 바 (더미 div 제거) */}
        {!hideNavbar && (
          <div
            className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[400px]"
            style={{ height: NAV_H }}
          >
            <Navbar />
          </div>
        )}
      </div>
    </div>
  )
}

export default RootLayout
