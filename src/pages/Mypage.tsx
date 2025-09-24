import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Back from '../assets/back.svg'
import UserProfile from '../components/Mypage/UserProfile'
import MyPageMenuItem from '../components/Mypage/MyPageMenuItem'
import { getMyPageData, type MyPageData } from '../apis/my'

const MyPage = () => {
  const navigate = useNavigate()
  const [myPageData, setMyPageData] = useState<MyPageData | null>(null)

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const data = await getMyPageData()
        setMyPageData(data)
      } catch (error) {
        console.error('마이페이지 데이터 불러오기 실패', error)
      }
    }
    fetchMyPageData()
  }, [])

  const handleLogout = () => {
    const keys = [
      'accessToken',
      'access_token',
      'refreshToken',
      'user',
      'display_name',
      'isAdmin',
    ]
    keys.forEach((k) => localStorage.removeItem(k))

    navigate('/login', { replace: true })
  }

  if (!myPageData) return <div className="p-4">로딩 중...</div>

  return (
    <div className="bg-[#f5f5f5] flex flex-col min-h-screen justify-between overflow-hidden">
      {/* 상단 콘텐츠 */}
      <div>
        <div className="px-4 py-[15px] flex items-center text-[20px] font-semibold text-gray-800">
          <button
            onClick={() => navigate('/')}
            className="mr-2 cursor-pointer"
            aria-label="뒤로가기"
          >
            <img src={Back} alt="뒤로가기" className="w-4 h-4" />
          </button>
          <span>마이 페이지</span>
        </div>

        <UserProfile
          name={myPageData.nickname}
          attendanceDays={myPageData.attendanceDays}
          avatarUrl={myPageData.profileImage || '/avatar.png'}
        />

        <div className="mt-4 space-y-3 px-4">
          <MyPageMenuItem
            icon="❤️"
            label="찜한 제품"
            onClick={() => navigate('/mypage/wishlist')}
          />
          <MyPageMenuItem
            icon="📝"
            label="내가 작성한 게시물"
            onClick={() => navigate('/mypage/posts')}
          />
          <MyPageMenuItem
            icon="💬"
            label="내가 작성한 댓글"
            onClick={() => navigate('/mypage/comments')}
          />
        </div>
      </div>

      {/* 하단 로그아웃 */}
      <div className="px-4 mb-6">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-center text-gray-500 text-sm underline py-2"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default MyPage
