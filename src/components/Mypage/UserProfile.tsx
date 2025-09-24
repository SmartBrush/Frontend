import profile from '../../assets/profile.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAttendance } from '../../apis/main'

interface UserProfileProps {
  name: string
  avatarUrl: string
}

const UserProfile = ({ name, avatarUrl }: UserProfileProps) => {
  const navigate = useNavigate()
  const [streak, setStreak] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    fetchAttendance()
      .then((res) => {
        if (!mounted) return
        setStreak(
          typeof res?.currentStreak === 'number' ? res.currentStreak : 0,
        )
      })
      .catch(() => {
        if (!mounted) return
        setStreak(0)
      })
    return () => {
      mounted = false
    }
  }, [])

  const showStreak = typeof streak === 'number' && streak > 0

  return (
    <div className="bg-[rgba(182,232,178,0.7)] h-[235px] flex items-center">
      <div className="bg-white rounded-[27.5px] py-4 pl-[46px] flex items-center gap-2 shadow-sm w-[351px] h-[143px] mx-[20px]">
        <img
          src={avatarUrl?.trim() ? avatarUrl : profile}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = profile
          }}
          alt="profile"
          className="w-[95px] h-[95px] rounded-full border-none object-cover"
        />

        <div className="pl-[35px]">
          <div className="font-bold text-[18px] text-[#4E9366]">{name} 님</div>

          {showStreak && (
            <div className="text-[14px] text-black">
              {streak}일 째 연속 출석 중
            </div>
          )}

          <button
            className="mt-[10px] w-[106.33px] h-[27.5px] rounded-[18.33px] bg-[#EBEBEB] text-[12px] text-gray-700 hover:bg-gray-300 transition cursor-pointer"
            onClick={() =>
              navigate('/mypage/edit', {
                state: {
                  nickname: name,
                  email: 'si****@gmail.com',
                  avatarUrl: avatarUrl,
                },
              })
            }
          >
            내 정보 수정
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
