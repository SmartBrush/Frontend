import { useMemo } from 'react'
import greenFace from '../../assets/green.png'
import yellowFace from '../../assets/yellow.png'
import redFace from '../../assets/red.png'

interface WelcomePageProps {
  onNext: () => void
}

const looksLikeEmail = (s?: string) => !!s && /.+@.+\..+/.test(s)

const getDisplayName = (): string => {
  try {
    const keys = ['display_name', 'nickname', 'name', 'username'] as const
    for (const k of keys) {
      const v = localStorage.getItem(k) || ''
      if (v && !looksLikeEmail(v)) return v
    }
  } catch {
    /* localStorage 미지원 환경 대비 */
  }
  return '회원'
}

const WelcomePage = ({ onNext }: WelcomePageProps) => {
  const displayName = useMemo(getDisplayName, [])

  return (
    <div className="text-center space-y-6 mt-20">
      <h2 className="text-3xl font-bold">{displayName}님 환영합니다</h2>
      <p className="text-s text-black font-semibold">
        두피어나는 몇가지 질문들을 통해
        <br />
        당신을 위한 맞춤 두피 케어 정보를 제공합니다!
      </p>

      <div className="flex justify-center gap-1 mt-30">
        <img src={greenFace} alt="happy" className="w-20 h-20" />
        <img src={yellowFace} alt="soso" className="w-20 h-20" />
        <img src={redFace} alt="angry" className="w-20 h-20" />
      </div>

      <button
        onClick={onNext}
        className="bg-[#4E9366] text-white py-3 px-15 rounded-full text-sm shadow-md mt-25"
      >
        맞춤 두피 케어 받아보기
      </button>
    </div>
  )
}

export default WelcomePage
