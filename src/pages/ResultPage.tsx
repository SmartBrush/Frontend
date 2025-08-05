import { useLocation } from 'react-router-dom'
import ScalpStatusCard from '../components/Result/ScalpStatusCard'
import ScalpRadarChart from '../components/Result/ScalpRadarChart'
import StatusSlider from '../components/Result/StatusSlider'
import CaptureImage from '../components/Result/CaptureImage'
import ProductRecommendButton from '../components/Result/ProductRecommendButton'
import sample1 from '../assets/sample1.png'
import sample2 from '../assets/sample2.png'

const ResultPage = () => {
  const location = useLocation()
  const uploadedImages = location.state?.images || []
  const diagnosis = location.state?.diagnosis || {}

  const {
    scalpSensitivityValue,
    scalpSensitivityLevel,
    densityValue,
    densityLevel,
    sebumLevelValue,
    sebumLevel,
    poreSizeValue,
    poreSizeLevel,
    scalingValue,
    scalingLevel,
    score,
    status,
  } = diagnosis

  const radarData = {
    scalpSensitivityValue,
    scalpSensitivityLevel,
    densityValue,
    densityLevel,
    sebumLevelValue,
    sebumLevel,
    poreSizeValue,
    poreSizeLevel,
    scalingValue,
    scalingLevel,
  }

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

  const bgColor = getStatusColor(status)
  const valuePosition = Math.round((score / 10) * 100)

  return (
    <div className="p-4 bg-gray-100 min-h-screen pb-20">
      <p className="text-center text-xl font-bold">두피 분석 결과</p>
      <p className="text-center text-blue-500">
        김도영님의 두피 분석 결과입니다!
      </p>
      <ScalpStatusCard status={status} score={score} bgColor={bgColor} />
      <ScalpRadarChart data={radarData} />
      <StatusSlider
        label="나의 위치는 어디?"
        valuePosition={valuePosition}
        color="red"
      />
      <CaptureImage
        images={
          uploadedImages.length > 0
            ? uploadedImages
            : [
                { id: 1, src: sample1, label: '정수리' },
                { id: 2, src: sample2, label: '앞머리' },
              ]
        }
      />
      <ProductRecommendButton />
    </div>
  )
}

export default ResultPage
