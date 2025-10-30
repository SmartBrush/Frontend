import Line from '../components/Auth/OrLine'
import BlueBox from '../components/Auth/BlueBox'
import InputBox from '../components/Auth/InputBox'
import KakaoButton from '../components/Auth/KakaoButton'
import { useState } from 'react'
import { signup } from '../apis/auth'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  })

  const validateField = (field: string, value: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }

      switch (field) {
        case 'name':
          newErrors.name = value.trim() ? '' : '이름을 입력해주세요.'
          break
        case 'email':
          if (!value.trim()) {
            newErrors.email = '이메일을 입력해주세요.'
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors.email = '올바른 이메일 형식이 아닙니다.'
          } else {
            newErrors.email = ''
          }
          break
        case 'password':
          newErrors.password =
            value.length >= 8 ? '' : '비밀번호는 8자 이상이어야 합니다.'
          // 비밀번호가 바뀌면 확인 비밀번호도 다시 검사
          newErrors.passwordCheck =
            passwordCheck && value !== passwordCheck
              ? '비밀번호가 일치하지 않습니다.'
              : ''
          break
        case 'passwordCheck':
          newErrors.passwordCheck =
            value === password ? '' : '비밀번호가 일치하지 않습니다.'
          break
        default:
          break
      }

      return newErrors
    })
  }

  const handleSignup = async () => {
    // 현재 에러 상태 중 하나라도 존재하면 제출 막기
    const hasError = Object.values(errors).some((e) => e !== '')
    const hasEmptyField = !name || !email || !password || !passwordCheck

    if (hasError || hasEmptyField) {
      alert('입력값을 모두 정확히 작성해주세요.')
      return
    }

    try {
      await signup({
        email,
        password,
        passwordCheck,
        nickname: name,
      })
      alert('회원가입을 완료했습니다.')
      navigate('/login')
    } catch (error) {
      console.error('회원가입 실패', error)
      alert('회원가입에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleKakaoLogin = () => {
    console.log('카카오')
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[100%]">
      <div className="w-[80%]">
        <h1 className="text-[40px] font-bold mb-3 text-center">회원가입</h1>
        <div className="mb-4">
          <InputBox
            label="이름"
            placeholder="이름"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              validateField('name', e.target.value)
            }}
            name="name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <InputBox
            label="이메일"
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              validateField('email', e.target.value)
            }}
            name="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-3">
          <InputBox
            label="비밀번호"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              validateField('password', e.target.value)
            }}
            name="password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <InputBox
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => {
              setPasswordCheck(e.target.value)
              validateField('passwordCheck', e.target.value)
            }}
            name="passwordCheck"
            type="password"
          />
          {errors.passwordCheck && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordCheck}</p>
          )}
        </div>

        <div className="mt-8 mb-5">
          <BlueBox text="회원가입" onClick={handleSignup} />
        </div>
        <Line />
        <KakaoButton onClick={handleKakaoLogin} />
      </div>
    </div>
  )
}

export default SignUpPage
