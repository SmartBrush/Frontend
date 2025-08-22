import { useState } from 'react'
// import { useEffect } from 'react'
import type { SurveyForm } from '../components/ScalpSurvey/SurveyForm'
import Question1_1 from '../components/ScalpSurvey/Question1_1'
import Question1_2 from '../components/ScalpSurvey/Question1_2'
import Question2_1 from '../components/ScalpSurvey/Question2_1'
import Question2_2 from '../components/ScalpSurvey/Question2_2'
import Question3_1 from '../components/ScalpSurvey/Question3_1'
import Question3_2 from '../components/ScalpSurvey/Question3_2'
import Question4_1 from '../components/ScalpSurvey/Question4_1'
import Question4_2 from '../components/ScalpSurvey/Question4_2'
import WelcomePage from '../components/ScalpSurvey/WelcomePage'
import { submitSurvey } from '../apis/survey'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const looksLikeEmail = (s?: string) => !!s && /.+@.+\..+/.test(s)

function safeGetLS(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    // localStorage 접근 불가(SSR/프라이버시 모드 등)
    return null
  }
}

function getStoredDisplayName(): string {
  const keys = ['display_name', 'nickname', 'name', 'username'] as const
  for (const k of keys) {
    const v = safeGetLS(k)
    if (v && !looksLikeEmail(v)) return v
  }
  return '회원'
}

function getStoredEmail(): string {
  const emailKeys = ['email', 'username'] as const
  for (const k of emailKeys) {
    const v = safeGetLS(k)
    if (v && looksLikeEmail(v)) return v
  }
  return ''
}

const ScalpSurveyPage = () => {
  const [page, setPage] = useState(0)
  // const navigate = useNavigate()
  const [form, setForm] = useState<SurveyForm>({
    nickname: getStoredDisplayName(),
    email: getStoredEmail(),
    gender: '',
    age: 0,
    hairLength: '',
    dyedOrPermedRecently: null,
    familyHairLoss: null,
    wearHatFrequently: null,
    uvExposureLevel: '',
    washingFrequency: '',
    usingProducts: [],
    eatingHabits: [],
    scalpSymptoms: [],
    sleepDuration: '',
    sleepStartTime: '',
  })

  const toggleMultiSelect = (
    field: keyof SurveyForm,
    value: SurveyForm[keyof SurveyForm],
  ) => {
    const current = form[field] as string[] // 예: 'scalpSymptoms'
    const updated = current.includes(value as string)
      ? current.filter((v) => v !== value)
      : [...current, value as string]

    setForm((prev) => ({
      ...prev,
      [field]: updated,
    }))
  }

  // 최초 진입 시 설문 완료 여부 확인
  // useEffect(() => {
  //   axios
  //     .get('/api/question', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data && Object.keys(res.data).length > 0) {
  //         console.log('설문 이미 존재함 → 홈 이동')
  //         setTimeout(() => navigate('/'), 0)
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response?.status === 404) {
  //         console.log('설문 없음 → 페이지 유지')
  //       } else {
  //         console.error('설문 조회 실패', err)
  //       }
  //     })
  // }, [navigate])

  //  인풋 변경 핸들러
  const handleChange = (
    field: keyof SurveyForm,
    value: SurveyForm[keyof SurveyForm],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    console.log('전송 데이터:', form)
    try {
      await submitSurvey(form)
      console.log('제출 성공')
    } catch (error) {
      console.error('제출 실패:', error)
    }
  }

  const pages = [
    <WelcomePage onNext={() => setPage(1)} />, // 0
    <Question1_1
      form={form}
      onChange={handleChange}
      onNext={() => setPage(2)}
    />, // 1
    <Question1_2
      form={form}
      onChange={handleChange}
      onNext={() => setPage(3)}
      onPrev={() => setPage(1)}
    />, // 2
    <Question2_1
      form={form}
      onChange={handleChange}
      onNext={() => setPage(4)}
      onPrev={() => setPage(2)}
    />, // 3
    <Question2_2
      form={form}
      onChange={handleChange}
      onNext={() => setPage(5)}
      onPrev={() => setPage(3)}
    />, // 4
    <Question3_1
      form={form}
      onChange={handleChange}
      onToggle={toggleMultiSelect}
      onNext={() => setPage(6)}
      onPrev={() => setPage(4)}
    />, // 5
    <Question3_2
      form={form}
      onChange={handleChange}
      onToggle={toggleMultiSelect}
      onNext={() => setPage(7)}
      onPrev={() => setPage(5)}
    />, // 6
    <Question4_1
      form={form}
      onChange={handleChange}
      onNext={() => setPage(8)}
      onPrev={() => setPage(6)}
    />, // 7
    <Question4_2
      form={form}
      onChange={handleChange}
      onNext={handleSubmit}
      onPrev={() => setPage(7)}
    />, // 8
  ]

  return <div className="max-w-md mx-auto p-4">{pages[page]}</div>
}

export default ScalpSurveyPage
