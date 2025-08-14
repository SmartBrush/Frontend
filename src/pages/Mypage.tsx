import { useEffect, useState } from 'react'
import API from '../apis/api'
import { useNavigate } from 'react-router-dom'
import Back from '../assets/back.svg'
import UserProfile from '../components/MyPage/UserProfile'
import MyPageMenuItem from '../components/MyPage/MyPageMenuItem'

interface MyPageData {
  nickname: string
  attendanceDays: number
  profileImage: string
}

const MyPage = () => {
  const navigate = useNavigate()
  const [myPageData, setMyPageData] = useState<MyPageData | null>(null)

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const response = await API.get('/api/mypage')
        setMyPageData(response.data)
      } catch (error) {
        console.error('마이페이지 데이터 불러오기 실패', error)
      }
    }

    fetchMyPageData()
  }, [])

  if (!myPageData) return <div className="p-4">로딩 중...</div>

  return (
    <div className="bg-[#f5f5f5] flex flex-col justify-between overflow-hidden">
      <div>
        <div className="px-[20px] pt-[20px] flex items-center text-lg font-semibold text-gray-800">
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
          <MyPageMenuItem icon="❤️" label="찜한 제품" />
          <MyPageMenuItem icon="📝" label="내가 작성한 게시물" />
          <MyPageMenuItem icon="💬" label="내가 작성한 댓글" />
        </div>

        <div className="text-center text-gray-500 text-sm mt-6 underline">
          로그아웃
        </div>
      </div>
    </div>
  )
}

export default MyPage
