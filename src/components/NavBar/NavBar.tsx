// src/components/NavBar/NavBar.tsx
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import CommunityIcon from '../../assets/Community.svg'
import ResultIcon from '../../assets/Result.svg'
import MainIcon from '../../assets/Main.svg'
import RecommendIcon from '../../assets/Recommendation.png'
import MypageIcon from '../../assets/Mypage.svg'

type Tab = { to: string; label: string; icon: string }

const LINKS: Tab[] = [
  { to: '/community', label: '커뮤니티', icon: CommunityIcon },
  { to: '/reports', label: '결과', icon: ResultIcon },
  { to: '/', label: '홈', icon: MainIcon },
  { to: '/recommend', label: '추천', icon: RecommendIcon },
  { to: '/mypage', label: '내 정보', icon: MypageIcon },
]

const getActivePath = (pathname: string) => {
  if (matchPath('/community/*', pathname)) return '/community'
  if (matchPath('/reports/*', pathname)) return '/reports'
  if (matchPath('/recommend/*', pathname)) return '/recommend'
  if (matchPath('/mypage', pathname)) return '/mypage'
  if (matchPath('/mypage/*', pathname)) return '/mypage'
  if (matchPath({ path: '/profile/*', end: false }, pathname)) return '/'
  if (pathname === '/') return '/'
  return '/'
}

export default function NavBar() {
  const { pathname } = useLocation()
  const activePath = getActivePath(pathname)

  return (
    <div className="relative w-full z-[10]">
      {/* 바 배경 */}
      <div className="relative w-full max-h-[95px] flex items-end">
        <div className="relative w-full h-[64px] bg-[#F5F5F5] border-t border-gray-300 shadow-md overflow-hidden rounded-none" />
      </div>

      {/* 아이콘/라벨 오버레이 */}
      <div className="flex justify-evenly items-center absolute inset-0 w-full">
        {LINKS.map((link) => {
          const isActive = activePath === link.to
          return (
            <div
              key={link.to}
              className="min-w-[64px] py-[11px] flex flex-col gap-[6px] items-center"
            >
              <NavLink to={link.to} className="flex flex-col items-center">
                {isActive ? (
                  <>
                    <div
                      className="w-[48px] h-[48px] rounded-full flex items-center justify-center
                      bg-[linear-gradient(180deg,#4C8D63_0%,#3D7450_55%,#2F5B3E_100%)]
                      shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
                    >
                      <img
                        src={link.icon}
                        alt={link.label}
                        className="w-[20px] h-[20px] filter invert brightness-0"
                      />
                    </div>
                    <span className="sr-only">{link.label}</span>
                  </>
                ) : (
                  <>
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="w-[20px] h-[20px] opacity-60"
                    />
                    <p className="text-[#999898] text-[10px] font-normal leading-[13px]">
                      {link.label}
                    </p>
                  </>
                )}
              </NavLink>
            </div>
          )
        })}
      </div>
    </div>
  )
}
