import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDiagnosisByDate } from '../apis/main'
import ScalpStatusCard from '../components/Result/ScalpStatusCard'
import ScalpRadarChart from '../components/Result/ScalpRadarChart'
import StatusSlider from '../components/Result/StatusSlider'
import ProductRecommendButton from '../components/Result/ProductRecommendButton'
import Back from '../assets/back.svg'

type Status = '양호' | '보통' | '심각'

interface DiagnosisDetail {
  scalpSensitivity: { level: Status; value: number }
  density: { level: Status; value: number }
  sebumLevel: { level: Status; value: number }
  poreSize: { level: Status; value: number }
  scaling: { level: Status; value: number }
  score: number
  status: Status
}

const getStatusColor = (s: Status | undefined) => {
  switch (s) {
    case '양호':
      return 'bg-green-500'
    case '보통':
      return 'bg-yellow-400'
    case '심각':
    default:
      return 'bg-red-500'
  }
}

const LastResultPage = () => {
  const { date } = useParams<{ date: string }>()

  const [diagnosisData, setDiagnosisData] = useState<DiagnosisDetail | null>(
    null,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  // const [displayName, setDisplayName] = useState<string>('회원')

  // 데이터 요청
  useEffect(() => {
    const fetchDiagnosis = async () => {
      if (!date) return

      setLoading(true)
      setErrorMsg(null)

      try {
        const result = await fetchDiagnosisByDate(date)
        setDiagnosisData(result.result)
      } catch (error) {
        setErrorMsg('진단 결과를 불러오지 못했습니다.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDiagnosis()
  }, [date])

  // 이름 API에서만 가져오기
  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const res = await fetch('/api/mypage')
  //       const d = await res.json()
  //       const picked = d.nickname ?? d.name ?? d.user?.nickname ?? d.user?.name
  //       if (picked) {
  //         setDisplayName(picked)
  //       }
  //     } catch {
  //       /* ignore */
  //     }
  //   })()
  // }, [])

  const hasDiag = !!diagnosisData
  const bgColor = getStatusColor(diagnosisData?.status)
  const valuePosition = Math.round(((diagnosisData?.score ?? 0) / 10) * 100)
  const navigate = useNavigate()

  const transformedDiagnosis = hasDiag
    ? {
        scalpSensitivityValue: diagnosisData?.scalpSensitivity.value,
        scalpSensitivityLevel: diagnosisData?.scalpSensitivity.level,
        densityValue: diagnosisData?.density.value,
        densityLevel: diagnosisData?.density.level,
        sebumLevelValue: diagnosisData?.sebumLevel.value,
        sebumLevel: diagnosisData?.sebumLevel.level,
        poreSizeValue: diagnosisData?.poreSize.value,
        poreSizeLevel: diagnosisData?.poreSize.level,
        scalingValue: diagnosisData?.scaling.value,
        scalingLevel: diagnosisData?.scaling.level,
        score: diagnosisData?.score,
        status: diagnosisData?.status,
      }
    : null

  // transformedDiagnosis가 null이 아니면 데이터를 전달
  if (!transformedDiagnosis) {
    return <div>진단 결과가 없습니다.</div>
  }

  return (
    <div className="px-4 bg-gray-100 min-h-screen pb-10">
      <div
        className="sticky top-0 z-50 bg-[#F3F3F3]
                py-[15px] flex items-center text-[20px] font-semibold text-gray-800"
      >
        <button
          onClick={() => navigate('/')}
          className="mr-2 cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={Back} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <span>두피 분석 결과</span>
      </div>

      <p className="text-center text-3xl font-bold mt-5">{date}</p>
      {/* <p className="text-center text-3xl font-bold mb-2">두피 분석 결과</p> */}
      {/* <p className="text-center text-blue-500">
        {displayName}님의 두피 분석 결과입니다!
      </p> */}

      {loading ? (
        <div>Loading...</div>
      ) : errorMsg ? (
        <div className="text-red-600 text-sm">{errorMsg}</div>
      ) : (
        <>
          <ScalpStatusCard
            status={transformedDiagnosis.status}
            score={transformedDiagnosis.score}
            bgColor={bgColor}
          />
          <ScalpRadarChart data={transformedDiagnosis} />

          <div className="mt-15 mb">
            <StatusSlider
              label="점수"
              valuePosition={valuePosition}
              color="red"
            />
          </div>
          <ProductRecommendButton />
        </>
      )}
    </div>
  )
}

export default LastResultPage
