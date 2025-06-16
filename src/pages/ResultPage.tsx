// import { useLocation } from 'react-router-dom'
// import ScalpStatusCard from './ScalpStatusCard'
// import ScalpRadarChart from './ScalpRadarChart'
// import StatusSlider from './StatusSlider'
// import CaptureImage from './CaptureImage'
// import ProductRecommendButton from './ProductRecommendButton'
// import sample1 from '../../assets/sample1.png'
// import sample2 from '../../assets/sample2.png'

// const ResultPage = () => {
//   const location = useLocation()
//   const uploadedImages = location.state?.images || []

//   const dummyData = {
//     radar: {
//       scalpSensitivityValue: 70, // 두피민감도 : 높을수록 나쁨 -> 뒤집기
//       densityValue: 60, // 모발 밀도 -> 높을수록 좋음
//       sebumLevelValue: 80, //유분 정도 -> 너무 낮아도, 너무 높아도 안 좋음
//       poreSizeValue: 80, // 모발 굵기 -> 높을수록 좋음
//       scalingValue: 60, // 각질/비듬 정도 -> 높을수록 나쁨 -> 뒤집어
//     },

//     // ✅ 전달된 이미지가 있으면 그것을, 없으면 기본 샘플
//     images:
//       uploadedImages.length > 0
//         ? uploadedImages
//         : [
//             { id: 1, src: sample1, label: '정수리' },
//             { id: 2, src: sample2, label: '앞머리' },
//           ],
//   }

//   //
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case '양호':
//         return 'bg-green-500'
//       case '보통':
//         return 'bg-yellow-400'
//       case '심각':
//       default:
//         return 'bg-red-500'
//     }
//   }

//   const sebumBadLow = 29
//   const sebumBadHigh = 81

//   const sebumCenter = (sebumBadLow + sebumBadHigh) / 2
//   const sebumMaxOffset = sebumCenter - sebumBadLow
//   const sebumFactor = 100 / sebumMaxOffset

//   // 변환 함수
//   function transformsebum(value: number): number {
//     const offset = Math.abs(value - sebumCenter)
//     const raw = 100 - offset * sebumFactor
//     return raw < 0 ? 0 : raw
//   }

//   //평균 점수 계산 (0-10점)
//   const {
//     scalpSensitivityValue,
//     densityValue,
//     sebumLevelValue,
//     poreSizeValue,
//     scalingValue,
//   } = dummyData.radar

//   const goodSensitivity = 100 - scalpSensitivityValue
//   const goodScaling = 100 - scalingValue
//   const goodSebum = transformsebum(sebumLevelValue)

//   const rawAvg =
//     (goodSensitivity + densityValue + goodSebum + poreSizeValue + goodScaling) /
//     5

//   const score = Math.round((rawAvg / 100) * 10 * 10) / 10 // 10점 만점, 소수점 1자리
//   const status = score >= 7 ? '양호' : score >= 4 ? '보통' : '심각'
//   const bgColor = getStatusColor(status)
//   // 퍼센트 위치 계산 (일단은 0~10 -> 0%100%)
//   const valuePosition = Math.round((score / 10) * 100)

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen pb-20">
//       <p className="text-center text-xl font-bold">두피 분석 결과</p>
//       <p className="text-center text-blue-500">
//         김도영님의 두피 분석 결과입니다!
//       </p>
//       <ScalpStatusCard status={status} score={score} bgColor={bgColor} />
//       <ScalpRadarChart data={dummyData.radar} />
//       <StatusSlider
//         label="나의 위치는 어디?"
//         valuePosition={valuePosition}
//         color="red"
//       />
//       <CaptureImage images={dummyData.images} />
//       <ProductRecommendButton />
//     </div>
//   )
// }

// export default ResultPage

// import { useLocation } from 'react-router-dom'
// import ScalpStatusCard from './ScalpStatusCard'
// import ScalpRadarChart from './ScalpRadarChart'
// import StatusSlider from './StatusSlider'
// import CaptureImage from './CaptureImage'
// import ProductRecommendButton from './ProductRecommendButton'
// import sample1 from '../../assets/sample1.png'
// import sample2 from '../../assets/sample2.png'

// const ResultPage = () => {
//   const location = useLocation()
//   const uploadedImages = location.state?.images || []
//   const diagnosis = location.state?.diagnosis || {}

//   const defaultRadar = {
//     scalpSensitivityValue: 70,
//     densityValue: 60,
//     sebumLevelValue: 80,
//     poreSizeValue: 80,
//     scalingValue: 60,
//   }

//   const parsedRadar =
//     Object.keys(diagnosis).length > 0
//       ? {
//           scalpSensitivityValue:
//             diagnosis['모낭홍반농포']?.class_index === 0 ? 30 : 80, // 예시 변환
//           densityValue: 30,
//           sebumLevelValue: diagnosis['비듬']?.class_index === 3 ? 85 : 50, // 예시 변환
//           poreSizeValue: 40,
//           scalingValue: diagnosis['미세각질']?.class_index === 3 ? 75 : 40, // 예시 변환
//         }
//       : defaultRadar

//   const dummyData = {
//     radar: parsedRadar,
//     images:
//       uploadedImages.length > 0
//         ? uploadedImages
//         : [
//             { id: 1, src: sample1, label: '정수리' },
//             { id: 2, src: sample2, label: '앞머리' },
//           ],
//   }

//   //
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case '양호':
//         return 'bg-green-500'
//       case '보통':
//         return 'bg-yellow-400'
//       case '심각':
//       default:
//         return 'bg-red-500'
//     }
//   }

//   const sebumBadLow = 29
//   const sebumBadHigh = 81

//   const sebumCenter = (sebumBadLow + sebumBadHigh) / 2
//   const sebumMaxOffset = sebumCenter - sebumBadLow
//   const sebumFactor = 100 / sebumMaxOffset

//   // 변환 함수
//   function transformsebum(value: number): number {
//     const offset = Math.abs(value - sebumCenter)
//     const raw = 100 - offset * sebumFactor
//     return raw < 0 ? 0 : raw
//   }

//   //평균 점수 계산 (0-10점)
//   const {
//     scalpSensitivityValue,
//     densityValue,
//     sebumLevelValue,
//     poreSizeValue,
//     scalingValue,
//   } = dummyData.radar

//   const goodSensitivity = 100 - scalpSensitivityValue
//   const goodScaling = 100 - scalingValue
//   const goodSebum = transformsebum(sebumLevelValue)

//   const rawAvg =
//     (goodSensitivity + densityValue + goodSebum + poreSizeValue + goodScaling) /
//     5

//   const score = Math.round((rawAvg / 100) * 10 * 10) / 10 // 10점 만점, 소수점 1자리
//   const status = score >= 7 ? '양호' : score >= 4 ? '보통' : '심각'
//   const bgColor = getStatusColor(status)
//   // 퍼센트 위치 계산 (일단은 0~10 -> 0%100%)
//   const valuePosition = Math.round((score / 10) * 100)

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen pb-20">
//       <p className="text-center text-xl font-bold">두피 분석 결과</p>
//       <p className="text-center text-blue-500">
//         김도영님의 두피 분석 결과입니다!
//       </p>
//       <ScalpStatusCard status={status} score={score} bgColor={bgColor} />
//       <ScalpRadarChart data={dummyData.radar} />
//       <StatusSlider
//         label="나의 위치는 어디?"
//         valuePosition={valuePosition}
//         color="red"
//       />
//       <CaptureImage images={dummyData.images} />
//       <ProductRecommendButton />
//     </div>
//   )
// }

// export default ResultPage

// import { useLocation } from 'react-router-dom'
// import ScalpStatusCard from './ScalpStatusCard'
// import ScalpRadarChart from './ScalpRadarChart'
// import StatusSlider from './StatusSlider'
// import CaptureImage from './CaptureImage'
// import ProductRecommendButton from './ProductRecommendButton'
// import sample1 from '../../assets/sample1.png'
// import sample2 from '../../assets/sample2.png'

// const ResultPage = () => {
//   const location = useLocation()
//   const uploadedImages = location.state?.images || []
//   const diagnosis = location.state?.diagnosis || {}

//   // class_index → 점수 변환 함수
//   const getScoreFromClassIndex = (classIndex?: number): number => {
//     switch (classIndex) {
//       case 0:
//         return 30 // 양호
//       case 1:
//       case 2:
//         return 55 // 보통
//       case 3:
//         return 80 // 심각
//       default:
//         return 55 // 기본 양호
//     }
//   }

//   // 평균 class_index 계산
//   const 비듬Index = diagnosis['비듬']?.class_index
//   const 미세각질Index = diagnosis['미세각질']?.class_index
//   let 평균각질Index: number | undefined

//   if (비듬Index !== undefined && 미세각질Index !== undefined) {
//     평균각질Index = Math.round((비듬Index + 미세각질Index) / 2)
//   } else {
//     평균각질Index = 비듬Index ?? 미세각질Index
//   }

//   const defaultRadar = {
//     scalpSensitivityValue: 70,
//     densityValue: 60,
//     sebumLevelValue: 80,
//     poreSizeValue: 80,
//     scalingValue: 60,
//   }

//   const parsedRadar =
//     Object.keys(diagnosis).length > 0
//       ? {
//           scalpSensitivityValue: getScoreFromClassIndex(
//             diagnosis['모낭홍반농포']?.class_index,
//           ),
//           densityValue: 55,
//           sebumLevelValue: getScoreFromClassIndex(
//             diagnosis['비듬']?.class_index,
//           ),
//           poreSizeValue: 55,
//           scalingValue: getScoreFromClassIndex(평균각질Index), // ✅ 평균값 사용
//         }
//       : defaultRadar

//   const dummyData = {
//     radar: parsedRadar,
//     images:
//       uploadedImages.length > 0
//         ? uploadedImages
//         : [
//             { id: 1, src: sample1, label: '정수리' },
//             { id: 2, src: sample2, label: '앞머리' },
//           ],
//   }

//   // 진단 점수 → 상태 텍스트
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case '양호':
//         return 'bg-green-500'
//       case '보통':
//         return 'bg-yellow-400'
//       case '심각':
//       default:
//         return 'bg-red-500'
//     }
//   }

//   // 유분 점수 변환 (가운데값 기준 대칭)
//   const sebumBadLow = 29
//   const sebumBadHigh = 81
//   const sebumCenter = (sebumBadLow + sebumBadHigh) / 2
//   const sebumMaxOffset = sebumCenter - sebumBadLow
//   const sebumFactor = 100 / sebumMaxOffset

//   const transformsebum = (value: number): number => {
//     const offset = Math.abs(value - sebumCenter)
//     const raw = 100 - offset * sebumFactor
//     return raw < 0 ? 0 : raw
//   }

//   // 평균 점수 계산 (0~10점 환산)
//   const {
//     scalpSensitivityValue,
//     densityValue,
//     sebumLevelValue,
//     poreSizeValue,
//     scalingValue,
//   } = dummyData.radar

//   const goodSensitivity = 100 - scalpSensitivityValue
//   const goodScaling = 100 - scalingValue
//   const goodSebum = transformsebum(sebumLevelValue)

//   const rawAvg =
//     (goodSensitivity + densityValue + goodSebum + poreSizeValue + goodScaling) /
//     5

//   const score = Math.round((rawAvg / 100) * 10 * 10) / 10 // 소수점 1자리
//   const status = score >= 7 ? '양호' : score >= 4 ? '보통' : '심각'
//   const bgColor = getStatusColor(status)
//   const valuePosition = Math.round((score / 10) * 100)

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen pb-20">
//       <p className="text-center text-xl font-bold">두피 분석 결과</p>
//       <p className="text-center text-blue-500">
//         김도영님의 두피 분석 결과입니다!
//       </p>
//       <ScalpStatusCard status={status} score={score} bgColor={bgColor} />
//       <ScalpRadarChart data={dummyData.radar} />
//       <StatusSlider
//         label="나의 위치는 어디?"
//         valuePosition={valuePosition}
//         color="red"
//       />
//       <CaptureImage images={dummyData.images} />
//       <ProductRecommendButton />
//     </div>
//   )
// }

// export default ResultPage

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

  // class_index → 점수 변환 함수
  const getScoreFromClassIndex = (classIndex?: number): number => {
    switch (classIndex) {
      case 0:
        return 30 // 양호
      case 1:
      case 2:
        return 55 // 보통
      case 3:
        return 80 // 심각
      default:
        return 55
    }
  }

  const getInvertedScoreFromClassIndex = (classIndex?: number): number => {
    switch (classIndex) {
      case 0:
        return 80 // 양호 → 높게
      case 1:
      case 2:
        return 55 // 보통
      case 3:
        return 30 // 심각 → 낮게
      default:
        return 55
    }
  }

  // 평균 계산 함수
  const averageClassIndex = (
    ...indices: (number | undefined)[]
  ): number | undefined => {
    const valid = indices.filter((v): v is number => v !== undefined)
    if (valid.length === 0) return undefined
    return Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
  }

  // 항목별 class_index 추출 및 점수 매핑
  const 민감도Index = averageClassIndex(
    diagnosis['모낭사이홍반']?.class_index,
    diagnosis['모낭홍반농포']?.class_index,
  )

  const 각질Index = averageClassIndex(
    diagnosis['미세각질']?.class_index,
    diagnosis['비듬']?.class_index,
  )

  const 탈모Index = diagnosis['탈모']?.class_index
  const 피지Index = diagnosis['피지과다']?.class_index

  const defaultRadar = {
    scalpSensitivityValue: 70,
    densityValue: 60,
    sebumLevelValue: 80,
    poreSizeValue: 60, // 모발 굵기 (프론트 고정)
    scalingValue: 60,
  }

  const parsedRadar =
    Object.keys(diagnosis).length > 0
      ? {
          scalpSensitivityValue: getScoreFromClassIndex(민감도Index),
          densityValue: getInvertedScoreFromClassIndex(탈모Index),
          sebumLevelValue: getScoreFromClassIndex(피지Index),
          poreSizeValue: 60, // 모발 굵기 (고정)
          scalingValue: getScoreFromClassIndex(각질Index),
        }
      : defaultRadar

  const dummyData = {
    radar: parsedRadar,
    images:
      uploadedImages.length > 0
        ? uploadedImages
        : [
            { id: 1, src: sample1, label: '정수리' },
            { id: 2, src: sample2, label: '앞머리' },
          ],
  }

  // 상태 색상
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

  // 유분 점수 변환 (가운데값 기준 대칭)
  const sebumBadLow = 29
  const sebumBadHigh = 81
  const sebumCenter = (sebumBadLow + sebumBadHigh) / 2
  const sebumMaxOffset = sebumCenter - sebumBadLow
  const sebumFactor = 100 / sebumMaxOffset

  const transformsebum = (value: number): number => {
    const offset = Math.abs(value - sebumCenter)
    const raw = 100 - offset * sebumFactor
    return raw < 0 ? 0 : raw
  }

  // 평균 점수 계산 (0~10점 환산)
  const {
    scalpSensitivityValue,
    densityValue,
    sebumLevelValue,
    poreSizeValue,
    scalingValue,
  } = dummyData.radar

  const goodSensitivity = 100 - scalpSensitivityValue
  const goodScaling = 100 - scalingValue
  // const goodSebum = transformsebum(sebumLevelValue)
  const goodSebum = 100 - sebumLevelValue

  const rawAvg =
    (goodSensitivity + densityValue + goodSebum + poreSizeValue + goodScaling) /
    5

  const score = Math.round((rawAvg / 100) * 10 * 10) / 10
  const status = score <= 4 ? '심각' : score <= 6.5 ? '보통' : '양호'
  const bgColor = getStatusColor(status)
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
