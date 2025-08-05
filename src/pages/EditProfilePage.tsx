import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import profile from '../assets/profile.png'
import { IoCamera } from 'react-icons/io5'
import { ChevronLeft } from 'lucide-react'
import API from '../apis/api'

const EditProfilePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.state as {
    nickname?: string
    email?: string
    avatarUrl?: string
  }

  const [nickname, setNickname] = useState(state?.nickname || '')
  const [email, setEmail] = useState(state?.email || '')
  const [avatar, setAvatar] = useState(
    state?.avatarUrl?.trim() ? state.avatarUrl : profile,
  )

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
    }
  }

  const handleSave = async () => {
    try {
      const payload = {
        nickname,
        email,
        profileImage: avatar === profile ? '' : avatar,
      }

      await API.patch('/api/mypage/update', payload)

      navigate('/mypage')
    } catch (err) {
      console.error('프로필 수정 실패:', err)
      alert('프로필 수정에 실패했습니다.')
    }
  }

  return (
    <div className="bg-[#F3F3F3] flex flex-col justify-between overflow-hidden">
      <div>
        {/* 헤더 */}
        <div className="px-[20px] pt-[20px] flex items-center text-[20px] font-semibold text-[#000000] pb-[10px]">
          <button onClick={() => navigate('/')} className="mr-1">
            <ChevronLeft size={22} />
          </button>
          <span>내 정보 수정</span>
        </div>

        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center mt-6">
          <div className="relative">
            <img
              src={avatar}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = profile
              }}
              alt="profile"
              className="w-[170px] h-[170px] rounded-full object-cover"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-2 bg-yellow-400 p-1 rounded-full cursor-pointer"
            >
              <IoCamera size={25} color="white" />
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {/* 입력폼 */}
          <div className="w-[85%] mt-6 space-y-5">
            <div>
              <label className="text-[17px] font-semibold">닉네임</label>
              <input
                className="w-full mt-1 h-[52px] bg-white focus:none border-[#AAAAAA] rounded-[9.72px] px-[14.58px] text-[16px]"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[17px] font-semibold">이메일 주소</label>
              <input
                className="w-full mt-1 h-[52px] bg-white focus:none border-[#AAAAAA] rounded-[9.72px] px-[14.58px] text-[16px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="w-full px-[20px] pt-[70px] pb-8 bg-[#F3F3F3]">
        <button
          onClick={handleSave}
          className="w-[335px] h-[52px] bg-white text-black rounded-[9.72px] text-[16px] font-semibold"
        >
          저장
        </button>
      </div>
    </div>
  )
}

export default EditProfilePage
