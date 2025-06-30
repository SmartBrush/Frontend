import Line from '../components/Auth/OrLine'
import BlueBox from '../components/Auth/BlueBox'
import InputBox from '../components/Auth/InputBox'
import KakaoButton from '../components/Auth/KakaoButton'
import { useState } from 'react'

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const handleSingup = () => {
    console.log(email, password)
  }

  const handleKakaoLogin = () => {
    console.log('카카오')
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div className="w-[80%]">
        <h1 className="text-[40px] font-bold mb-5 text-center">회원가입</h1>
        <div className="mb-4">
          <InputBox
            label="이름"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </div>
        <div className="mb-4">
          <InputBox
            label="이메일"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </div>
        <div className="mb-3">
          <InputBox
            label="비밀번호"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
          />
        </div>
        <div className="mb-4">
          <InputBox
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            name="passwordCheck"
            type="password"
          />
        </div>

        <div className="mt-8 mb-5">
          <BlueBox text="회원가입" onClick={handleSingup} />
        </div>
        <Line />
        <KakaoButton onClick={handleKakaoLogin} />
      </div>
    </div>
  )
}

export default SignUpPage
