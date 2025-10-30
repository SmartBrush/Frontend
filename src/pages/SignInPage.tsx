import { useState } from 'react'
import InputBox from '../components/Auth/InputBox'
import BlueBox from '../components/Auth/BlueBox'
import Line from '../components/Auth/OrLine'
import KakaoButton from '../components/Auth/KakaoButton'
import { login } from '../apis/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API from '../apis/api'
import LoadingOverlay from '../components/Main/LoadingOverlay'

type ProfileInfoResponse = { hasProfile: boolean }

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const validateField = (field: string, value: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      switch (field) {
        case 'email':
          if (!value.trim()) newErrors.email = '이메일을 입력해주세요.'
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            newErrors.email = '올바른 이메일 형식이 아닙니다.'
          else newErrors.email = ''
          break
        case 'password':
          newErrors.password =
            value.length >= 8 ? '' : '비밀번호는 8자 이상이어야 합니다.'
          break
      }
      return newErrors
    })
  }

  const handleLogin = async () => {
    if (!email || !password || errors.email || errors.password) {
      alert('입력값을 다시 확인해주세요.')
      return
    }

    setLoading(true)
    try {
      const res = await login({ email, password })
      const accessToken = res.accessToken
      if (!accessToken) throw new Error('토큰이 존재하지 않습니다.')

      localStorage.setItem('access_token', accessToken)
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      let hasProfile: boolean | null = null
      try {
        const { data } = await API.get<ProfileInfoResponse>('/api/question')
        hasProfile = !!data?.hasProfile
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          hasProfile = false
        } else {
          alert(
            '프로필 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          )
          setLoading(false)
          return
        }
      }

      if (hasProfile === true) {
        navigate('/')
      } else {
        navigate('/question')
      }
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data?.message || '로그인에 실패했습니다.'
        alert(message)
      } else {
        alert('네트워크 오류가 발생했습니다.')
      }
    }
  }

  const handleKakaoLogin = () => {
    console.log('카카오')
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[100%] relative">
      {loading && (
        <LoadingOverlay message="빗과 연결중입니다. 잠시만 기다려주세요." />
      )}

      <form
        className="w-[80%]"
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <h1 className="text-[40px] font-bold mb-8 text-center">로그인</h1>
        <div className="mb-5">
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
        <div className="mb-5">
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
        <div className="mt-10 mb-5">
          <BlueBox
            text={loading ? '로그인 중…' : '로그인'}
            onClick={handleLogin}
            disabled={loading}
          />
        </div>
        <div className="flex items-center justify-center gap-1 mb-10 text-sm text-gray-600">
          <span>계정이 없으신가요?</span>
          <button
            type="button"
            className="text-[#6AB5FF] cursor-pointer hover:text-blue-500 disabled:opacity-50"
            onClick={() => navigate('/signup')}
            disabled={loading}
          >
            회원가입
          </button>
        </div>

        <Line />
        <KakaoButton onClick={handleKakaoLogin} />
      </form>
    </div>
  )
}

export default SignInPage
