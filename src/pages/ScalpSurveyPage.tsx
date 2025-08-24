import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

const ScalpSurveyPage = () => {
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  const [form, setForm] = useState<SurveyForm>({
    nickname: '',
    email: '',
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

  const handleChange = (
    field: keyof SurveyForm,
    value: SurveyForm[keyof SurveyForm],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleMultiSelect = (
    field: keyof SurveyForm,
    value: SurveyForm[keyof SurveyForm],
  ) => {
    const current = form[field] as string[]
    const updated = current.includes(value as string)
      ? current.filter((v) => v !== value)
      : [...current, value as string]

    setForm((prev) => ({
      ...prev,
      [field]: updated,
    }))
  }

  const handleSubmit = async () => {
    console.log('전송 데이터:', form)
    try {
      await submitSurvey(form)
      console.log('제출 성공')
      navigate('/') // 제출 성공 후 메인으로 이동
    } catch (error) {
      console.error('제출 실패:', error)
    }
  }

  const pages = [
    <WelcomePage onNext={() => setPage(1)} />,
    <Question1_1
      form={form}
      onChange={handleChange}
      onNext={() => setPage(2)}
    />,
    <Question1_2
      form={form}
      onChange={handleChange}
      onNext={() => setPage(3)}
      onPrev={() => setPage(1)}
    />,
    <Question2_1
      form={form}
      onChange={handleChange}
      onNext={() => setPage(4)}
      onPrev={() => setPage(2)}
    />,
    <Question2_2
      form={form}
      onChange={handleChange}
      onNext={() => setPage(5)}
      onPrev={() => setPage(3)}
    />,
    <Question3_1
      form={form}
      onChange={handleChange}
      onToggle={toggleMultiSelect}
      onNext={() => setPage(6)}
      onPrev={() => setPage(4)}
    />,
    <Question3_2
      form={form}
      onChange={handleChange}
      onToggle={toggleMultiSelect}
      onNext={() => setPage(7)}
      onPrev={() => setPage(5)}
    />,
    <Question4_1
      form={form}
      onChange={handleChange}
      onNext={() => setPage(8)}
      onPrev={() => setPage(6)}
    />,
    <Question4_2
      form={form}
      onChange={handleChange}
      onNext={handleSubmit}
      onPrev={() => setPage(7)}
    />,
  ]

  return <div className="max-w-md mx-auto">{pages[page]}</div>
}

export default ScalpSurveyPage
