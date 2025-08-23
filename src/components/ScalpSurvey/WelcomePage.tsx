import { useEffect, useState } from 'react'
import greenFace from '../../assets/goodstatus.png'
import yellowFace from '../../assets/normalIstatus.png'
import redFace from '../../assets/badstatus.png'
import BlueBox from '../Auth/BlueBox'
import { fetchDisplayName } from '../../apis/survey'

interface WelcomePageProps {
  onNext: () => void
}

const WelcomePage = ({ onNext }: WelcomePageProps) => {
  const [displayName, setDisplayName] = useState<string>('회원')

  useEffect(() => {
    let mounted = true
    fetchDisplayName().then((name) => {
      if (mounted) setDisplayName(name)
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">{displayName}님 환영합니다</h2>
        <p className="text-s text-black">
          <span className="font-bold">두피어나</span>는 몇가지 질문들을 통해
          <br />
          당신을 위한 맞춤 두피 케어 정보를 제공합니다!
        </p>

        <div className="flex justify-center gap-1 mt-[20%]">
          <img src={greenFace} alt="happy" className="w-[100px] h-[100px]" />
          <img src={yellowFace} alt="soso" className="w-[100px] h-[100px]" />
          <img src={redFace} alt="angry" className="w-[100px] h-[100px]" />
        </div>

        <div className="mt-25 mx-auto">
          <BlueBox
            text="맞춤 두피 케어 받아보기"
            onClick={onNext}
            variant="rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
