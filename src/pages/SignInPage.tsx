import { useState } from 'react'
import InputBox from '../components/Auth/InputBox'
import BlueBox from '../components/Auth/BlueBox'
import Line from '../components/Auth/OrLine'
import KakaoButton from '../components/Auth/KakaoButton'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log(email, password)
  }

  const handleKakaoLogin = () => {
    console.log('카카오')
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div className="w-[80%]">
        <h1 className="text-[40px] font-bold mb-8 text-center">로그인</h1>
        <div className="mb-5">
          <InputBox
            label="이메일"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </div>
        <div className="mb-5">
          <InputBox
            label="비밀번호"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
          />
        </div>
        <div className="mt-10 mb-5">
          <BlueBox text="로그인" onClick={handleLogin} />
        </div>
        <div className="flex items-center justify-center gap-1 mb-10 text-sm text-gray-600">
          <span>계정이 없으신가요?</span>
          <button className="text-[#6AB5FF] cursor-pointer hover:text-blue-500">
            회원가입
          </button>
        </div>

        <Line />
        <KakaoButton onClick={handleKakaoLogin} />
      </div>
    </div>
  )
}

export default SignInPage
