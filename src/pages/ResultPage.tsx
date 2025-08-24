import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import API from '../apis/api'
import ScalpStatusCard from '../components/Result/ScalpStatusCard'
import ScalpRadarChart from '../components/Result/ScalpRadarChart'
import StatusSlider from '../components/Result/StatusSlider'
import CaptureImage from '../components/Result/CaptureImage'
import ProductRecommendButton from '../components/Result/ProductRecommendButton'
import sample2 from '../assets/hair.png'

type Status = '양호' | '보통' | '심각'

type ImageItem = { id: number; src: string; label: string }

interface DiagnosisDetail {
  scalpSensitivityValue: number
  scalpSensitivityLevel: Status
  densityValue: number
  densityLevel: Status
  sebumLevelValue: number
  sebumLevel: Status
  poreSizeValue: number
  poreSizeLevel: Status
  scalingValue: number
  scalingLevel: Status
  score: number
  status: Status
}

interface LocationState {
  images?: ImageItem[]
  diagnosis?: DiagnosisDetail
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

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

const ResultPage = () => {
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState

  // 사용자별 세션키 네임스페이스
  const userKey = useMemo(() => {
    return 'guest' // 캐싱 제거 → 단일 키 사용
  }, [])
  const SKEY_IMAGES = `result_images:${userKey}`
  const SKEY_DIAG = `result_diagnosis:${userKey}`

  // 이름은 API로만 가져옴
  const [displayName, setDisplayName] = useState<string>('회원')

  // 이미지
  const [images, setImages] = useState<ImageItem[]>(() => {
    return (
      state.images ??
      safeParse<ImageItem[]>(sessionStorage.getItem(SKEY_IMAGES)) ?? [
        {
          id: 1,
          src: 'https://s3.us-east-1.amazonaws.com/dupiona.site/diagnosis/1234@naver.com/5871a80f-056d-47b7-b5e7-ce21fdb6ba13.jpg',
          label: '',
        },
        { id: 2, src: sample2, label: '' },
      ]
    )
  })

  // 진단(없으면 null 유지)
  const [diag, setDiag] = useState<DiagnosisDetail | null>(() => {
    return (
      state.diagnosis ??
      safeParse<DiagnosisDetail>(sessionStorage.getItem(SKEY_DIAG))
    )
  })

  // 마운트 시: state 있으면 세션 백업 / 없으면 세션 복원
  useEffect(() => {
    if (state.images) {
      sessionStorage.setItem(SKEY_IMAGES, JSON.stringify(state.images))
      setImages(state.images)
    } else {
      const cached = safeParse<ImageItem[]>(sessionStorage.getItem(SKEY_IMAGES))
      if (cached) setImages(cached)
    }

    if (state.diagnosis) {
      sessionStorage.setItem(SKEY_DIAG, JSON.stringify(state.diagnosis))
      setDiag(state.diagnosis)
    } else {
      const cached = safeParse<DiagnosisDetail>(
        sessionStorage.getItem(SKEY_DIAG),
      )
      if (cached) setDiag(cached)
    }
  }, [SKEY_DIAG, SKEY_IMAGES, state.images, state.diagnosis])

  // 이름 API에서만 가져오기
  useEffect(() => {
    ;(async () => {
      try {
        const res = await API.get('/api/mypage')
        const d = res.data as {
          nickname?: string
          name?: string
          user?: { nickname?: string; name?: string }
          profile?: { nickname?: string; name?: string }
        }
        const picked =
          d.nickname ??
          d.name ??
          d.user?.nickname ??
          d.user?.name ??
          d.profile?.nickname ??
          d.profile?.name
        if (picked) {
          setDisplayName(picked)
        }
      } catch {
        /* ignore */
      }
    })()
  }, [])

  // 안전 데이터
  const safeDiag: DiagnosisDetail = useMemo(
    () => ({
      scalpSensitivityValue: diag?.scalpSensitivityValue ?? 0,
      scalpSensitivityLevel: diag?.scalpSensitivityLevel ?? '보통',
      densityValue: diag?.densityValue ?? 0,
      densityLevel: diag?.densityLevel ?? '보통',
      sebumLevelValue: diag?.sebumLevelValue ?? 0,
      sebumLevel: diag?.sebumLevel ?? '보통',
      poreSizeValue: diag?.poreSizeValue ?? 0,
      poreSizeLevel: diag?.poreSizeLevel ?? '보통',
      scalingValue: diag?.scalingValue ?? 0,
      scalingLevel: diag?.scalingLevel ?? '보통',
      score: diag?.score ?? 0,
      status: diag?.status ?? '보통',
    }),
    [diag],
  )

  const hasDiag = !!diag
  const bgColor = getStatusColor(diag?.status)
  const valuePosition = Math.round(((diag?.score ?? 0) / 10) * 100)

  return (
    <div className="p-4 bg-gray-100 min-h-screen pb-20">
      <p className="text-center text-3xl font-bold mt-5 mb-2">두피 분석 결과</p>
      <p className="text-center text-blue-500">
        {displayName}님의 두피 분석 결과입니다!
      </p>

      {hasDiag ? (
        <>
          <ScalpStatusCard
            status={safeDiag.status}
            score={safeDiag.score}
            bgColor={bgColor}
          />
          <ScalpRadarChart data={safeDiag} />
          <div className="mt-15 mb">
            <StatusSlider label="" valuePosition={valuePosition} color="red" />
          </div>
          <ProductRecommendButton />
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 mt-4 text-center">
          <p className="text-sm text-gray-700">아직 진단 결과가 없어요.</p>
          <p className="text-xs text-gray-500 mt-1">
            촬영 후 진단을 완료하면 결과가 표시됩니다.
          </p>
        </div>
      )}

      <CaptureImage images={images} />
    </div>
  )
}

export default ResultPage

// import { useEffect, useState } from 'react'
// import API from '../apis/api'
// import ScalpStatusCard from '../components/Result/ScalpStatusCard'
// import ScalpRadarChart from '../components/Result/ScalpRadarChart'
// import StatusSlider from '../components/Result/StatusSlider'
// import CaptureImage from '../components/Result/CaptureImage'
// import ProductRecommendButton from '../components/Result/ProductRecommendButton'
// import sample2 from '../assets/hair.png'

// type Status = '양호' | '보통' | '심각'

// interface DiagnosisDetail {
//   scalpSensitivityValue: number
//   scalpSensitivityLevel: Status
//   densityValue: number
//   densityLevel: Status
//   sebumLevelValue: number
//   sebumLevel: Status
//   poreSizeValue: number
//   poreSizeLevel: Status
//   scalingValue: number
//   scalingLevel: Status
//   score: number
//   status: Status
// }

// const getStatusColor = (s: Status | undefined) => {
//   switch (s) {
//     case '양호':
//       return 'bg-green-500'
//     case '보통':
//       return 'bg-yellow-400'
//     case '심각':
//     default:
//       return 'bg-red-500'
//   }
// }

// const ResultPage = () => {
//   const [displayName, setDisplayName] = useState<string>('회원')

//   // 사진 하드코딩
//   const images = [
//     {
//       id: 1,
//       src: 'https://s3.us-east-1.amazonaws.com/dupiona.site/diagnosis/1234@naver.com/5871a80f-056d-47b7-b5e7-ce21fdb6ba13.jpg',
//       label: '정수리',
//     },
//     { id: 2, src: sample2, label: '앞머리' },
//   ]

//   // 진단은 일단 null (API 연결 필요시 확장)
//   const [diag] = useState<DiagnosisDetail | null>(null)

//   useEffect(() => {
//     ;(async () => {
//       try {
//         const res = await API.get('/api/mypage')
//         const d = res.data as {
//           nickname?: string
//           name?: string
//           user?: { nickname?: string; name?: string }
//           profile?: { nickname?: string; name?: string }
//         }
//         const picked =
//           d.nickname ??
//           d.name ??
//           d.user?.nickname ??
//           d.user?.name ??
//           d.profile?.nickname ??
//           d.profile?.name
//         if (picked) {
//           setDisplayName(picked)
//         }
//       } catch {
//         /* ignore */
//       }
//     })()
//   }, [])

//   const hasDiag = !!diag
//   const bgColor = getStatusColor(diag?.status)
//   const valuePosition = Math.round(((diag?.score ?? 0) / 10) * 100)

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen pb-20">
//       <p className="text-center text-3xl font-bold mt-5 mb-2">두피 분석 결과</p>
//       <p className="text-center text-blue-500">
//         {displayName}님의 두피 분석 결과입니다!
//       </p>

//       {hasDiag ? (
//         <>
//           <ScalpStatusCard
//             status={diag?.status ?? '보통'}
//             score={diag?.score ?? 0}
//             bgColor={bgColor}
//           />
//           <ScalpRadarChart data={diag!} />
//           <div className="mt-15 mb">
//             <StatusSlider label="" valuePosition={valuePosition} color="red" />
//           </div>
//           <ProductRecommendButton />
//         </>
//       ) : (
//         <div className="bg-white rounded-lg shadow p-6 mt-4 text-center">
//           <p className="text-sm text-gray-700">아직 진단 결과가 없어요.</p>
//           <p className="text-xs text-gray-500 mt-1">
//             촬영 후 진단을 완료하면 결과가 표시됩니다.
//           </p>
//         </div>
//       )}

//       {/* 하드코딩된 사진 출력 */}
//       <CaptureImage images={images} />
//     </div>
//   )
// }

// export default ResultPage
