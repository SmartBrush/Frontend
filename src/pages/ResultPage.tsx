import ScalpStatusCard from '../components/resultPage/ScalpStatusCard'
import ScalpRadarChart from '../components/resultPage/ScalpRadarChart'
import StatusSlider from '../components/resultPage/StatusSlider'
import CaptureImage from '../components/resultPage/CaptureImage'
import sample1 from '../assets/sample1.png'
import sample2 from '../assets/sample2.png'

const ResultPage = () => {
  const dummyData = {
    status: '심각',
    score: 5,
    radar: {
      scalpSensitivityValue: 20,
      densityValue: 80,
      scalingValue: 20,
      poreSizeValue: 50,
      sebumLevelValue: 20,
    },
    images: [
      { id: 1, src: sample1, label: '정수리' },
      { id: 2, src: sample2, label: '앞머리' },
    ],
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <p className="text-center text-balck-200">두피 분석 결과</p>
      <p className="text-center text-blue-500">
        김도영님의 두피 분석 결과입니다!
      </p>
      <ScalpStatusCard status={dummyData.status} score={dummyData.score} />
      <ScalpRadarChart data={dummyData.radar} />
      <StatusSlider label="나의 위치는 어디?" valuePosition={10} color="red" />
      <CaptureImage images={dummyData.images} />
    </div>
  )
}

export default ResultPage
