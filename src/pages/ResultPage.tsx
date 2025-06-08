import ScalpStatusCard from '../components/resultPage/ScalpStatusCard'
import ScalpRadarChart from '../components/resultPage/ScalpRadarChart'
import StatusSlider from '../components/resultPage/StatusSlider'
import CaptureImage from '../components/resultPage/CaptureImage'
import ProductRecommendButton from '../components/resultPage/ProductRecommendButton'
import sample1 from '../assets/sample1.png'
import sample2 from '../assets/sample2.png'

const ResultPage = () => {
  const dummyData = {
    radar: {
      scalpSensitivityValue: 70, // 두피민감도 : 높을수록 나쁨 -> 뒤집기
      densityValue: 60, // 모발 밀도 -> 높을수록 좋음
      sebumLevelValue: 80, //유분 정도 -> 너무 낮아도, 너무 높아도 안 좋음
      poreSizeValue: 80, // 모발 굵기 -> 높을수록 좋음
      scalingValue: 60, // 각질/비듬 정도 -> 높을수록 나쁨 -> 뒤집어
    },
    images: [
      { id: 1, src: sample1, label: '내 두피 사진' },
      { id: 2, src: sample2, label: '내 두피 사진' },
    ],
  }

  //
  const getStatusColor = (status: string) => {
    switch (status) {
      case '양호':
        return 'bg-green-500'
      case '보통':
        return 'bg-yellow-400'
      case '심각':
      default:
        return 'bg-red-500'
    }
  }

  const sebumBadLow = 29
  const sebumBadHigh = 81

  const sebumCenter = (sebumBadLow + sebumBadHigh) / 2
  const sebumMaxOffset = sebumCenter - sebumBadLow
  const sebumFactor = 100 / sebumMaxOffset

  // 변환 함수
  function transformsebum(value: number): number {
    const offset = Math.abs(value - sebumCenter)
    const raw = 100 - offset * sebumFactor
    return raw < 0 ? 0 : raw
  }

  //평균 점수 계산 (0-10점)
  const {
    scalpSensitivityValue,
    densityValue,
    sebumLevelValue,
    poreSizeValue,
    scalingValue,
  } = dummyData.radar

  const goodSensitivity = 100 - scalpSensitivityValue
  const goodScaling = 100 - scalingValue
  const goodSebum = transformsebum(sebumLevelValue)

  const rawAvg =
    (goodSensitivity + densityValue + goodSebum + poreSizeValue + goodScaling) /
    5

  const score = Math.round((rawAvg / 100) * 10 * 10) / 10 // 10점 만점, 소수점 1자리
  const status = score >= 7 ? '양호' : score >= 4 ? '보통' : '심각'
  const bgColor = getStatusColor(status)
  // 퍼센트 위치 계산 (일단은 0~10 -> 0%100%)
  const valuePosition = Math.round((score / 10) * 100)

  return (
    <div className="p-4 bg-gray-100 min-h-screen pb-20">
      <p className="text-center text-xl font-bold">두피 분석 결과</p>
      <p className="text-center text-blue-500">
        김도영님의 두피 분석 결과입니다!
      </p>
      <ScalpStatusCard status={status} score={score} bgColor={bgColor} />
      <ScalpRadarChart data={dummyData.radar} />
      <StatusSlider
        label="나의 위치는 어디?"
        valuePosition={valuePosition}
        color="red"
      />
      <CaptureImage images={dummyData.images} />
      <ProductRecommendButton />
    </div>
  )
}

export default ResultPage
