// // src/pages/ResultPage.tsx
// import { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import API from '../apis/api'
// import ScalpStatusCard from '../components/Result/ScalpStatusCard'
// import ScalpRadarChart from '../components/Result/ScalpRadarChart'
// import StatusSlider from '../components/Result/StatusSlider'
// import CaptureImage from '../components/Result/CaptureImage'
// import ProductRecommendButton from '../components/Result/ProductRecommendButton'
// import sample1 from '../assets/sample1.png'
// import sample2 from '../assets/sample2.png'

// const looksLikeEmail = (s?: string) => !!s && /.+@.+\..+/.test(s)

// type ProfileChunk = {
//   name?: string
//   nickname?: string
//   username?: string
// }
// type MyPageData = ProfileChunk & {
//   user?: ProfileChunk
//   profile?: ProfileChunk
// }
// type Envelope<T> = T | { data: T } | { result: T }

// const unwrap = <T,>(x: Envelope<T>): T => {
//   if (typeof x === 'object' && x !== null) {
//     if ('data' in (x as object)) return (x as { data: T }).data
//     if ('result' in (x as object)) return (x as { result: T }).result
//   }
//   return x as T
// }

// const pickName = (d: MyPageData): string | null => {
//   const cands = [
//     d.nickname,
//     d.name,
//     d.username,
//     d.user?.nickname,
//     d.user?.name,
//     d.profile?.nickname,
//     d.profile?.name,
//   ]
//   for (const c of cands) {
//     if (c && !looksLikeEmail(c)) return c
//   }
//   return null
// }

// const ResultPage = () => {
//   const location = useLocation()
//   const uploadedImages = location.state?.images || []
//   const diagnosis = location.state?.diagnosis || {}

//   const {
//     scalpSensitivityValue,
//     scalpSensitivityLevel,
//     densityValue,
//     densityLevel,
//     sebumLevelValue,
//     sebumLevel,
//     poreSizeValue,
//     poreSizeLevel,
//     scalingValue,
//     scalingLevel,
//     score,
//     status,
//   } = diagnosis

//   const [displayName, setDisplayName] = useState<string>('고객')

//   // 이름: localStorage → 프로필 API 1회 조회 후 캐시
//   useEffect(() => {
//     const cached =
//       localStorage.getItem('display_name') ||
//       localStorage.getItem('nickname') ||
//       localStorage.getItem('name') ||
//       localStorage.getItem('username')

//     if (cached && !looksLikeEmail(cached)) {
//       setDisplayName(cached)
//       return
//     }

//     ;(async () => {
//       const endpoints = [
//         '/api/mypage', // 실제로 쓰는 엔드포인트를 맨 앞에
//         '/api/mypage/info',
//         '/api/user/me',
//         '/api/users/me',
//         '/api/profile',
//         '/api/me',
//       ]
//       for (const url of endpoints) {
//         try {
//           const res = await API.get<Envelope<MyPageData>>(url)
//           const me = unwrap(res.data)
//           const name = pickName(me)
//           if (name) {
//             localStorage.setItem('display_name', name)
//             setDisplayName(name)
//             break
//           }
//         } catch {
//           // 다음 후보 시도
//         }
//       }
//     })()
//   }, [])

//   const radarData = {
//     scalpSensitivityValue,
//     scalpSensitivityLevel,
//     densityValue,
//     densityLevel,
//     sebumLevelValue,
//     sebumLevel,
//     poreSizeValue,
//     poreSizeLevel,
//     scalingValue,
//     scalingLevel,
//   }

//   const getStatusColor = (s: string) => {
//     switch (s) {
//       case '양호':
//         return 'bg-green-500'
//       case '보통':
//         return 'bg-yellow-400'
//       case '심각':
//       default:
//         return 'bg-red-500'
//     }
//   }

//   const bgColor = getStatusColor(status)
//   const valuePosition = Math.round((score / 10) * 100)

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen pb-20">
//       <p className="text-center text-3xl font-bold mt-5 mb-2">두피 분석 결과</p>
//       <p className="text-center text-blue-500">
//         {displayName}님의 두피 분석 결과입니다!
//       </p>

//       <ScalpStatusCard status={status} score={score} bgColor={bgColor} />
//       <ScalpRadarChart data={radarData} />
//       <div className="mt-15 mb">
//         <StatusSlider label="" valuePosition={valuePosition} color="red" />
//       </div>
//       <ProductRecommendButton />
//       <CaptureImage
//         images={
//           uploadedImages.length > 0
//             ? uploadedImages
//             : [
//                 { id: 1, src: sample1, label: '정수리' },
//                 { id: 2, src: sample2, label: '앞머리' },
//               ]
//         }
//       />
//     </div>
//   )
// }

// export default ResultPage
// src/pages/ResultPage.tsx
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import API from '../apis/api'
import ScalpStatusCard from '../components/Result/ScalpStatusCard'
import ScalpRadarChart from '../components/Result/ScalpRadarChart'
import StatusSlider from '../components/Result/StatusSlider'
import CaptureImage from '../components/Result/CaptureImage'
import ProductRecommendButton from '../components/Result/ProductRecommendButton'
import sample1 from '../assets/sample1.png'
import sample2 from '../assets/sample2.png'

/* ---------- 타입 ---------- */
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

/* ---------- 유틸 ---------- */
const looksLikeEmail = (s?: string) => !!s && /.+@.+\..+/.test(s)

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

const SKEY_IMAGES = 'result_images'
const SKEY_DIAG = 'result_diagnosis'

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

/* ---------- 컴포넌트 ---------- */
const ResultPage = () => {
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState

  // 이름: MyPage와 동일하게 간단히(localStorage 우선)
  const [displayName, setDisplayName] = useState<string>(() => {
    const cached =
      localStorage.getItem('display_name') ||
      localStorage.getItem('nickname') ||
      localStorage.getItem('name') ||
      localStorage.getItem('username')
    return cached && !looksLikeEmail(cached) ? cached : '회원'
  })

  // 이미지/진단: state → 세션 저장, 없으면 세션 복원
  const [images, setImages] = useState<ImageItem[]>(() => {
    return (
      state.images ??
      safeParse<ImageItem[]>(sessionStorage.getItem(SKEY_IMAGES)) ?? [
        { id: 1, src: sample1, label: '정수리' },
        { id: 2, src: sample2, label: '앞머리' },
      ]
    )
  })

  const [diag, setDiag] = useState<DiagnosisDetail | null>(() => {
    return (
      state.diagnosis ??
      safeParse<DiagnosisDetail>(sessionStorage.getItem(SKEY_DIAG))
    )
  })

  // 마운트 시 state가 있으면 세션에 백업
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
  }, [state.images, state.diagnosis])

  // (선택) 이름을 한 번만 API로 확정해서 캐시에 저장 – 실패해도 화면은 그대로 유지
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
        if (picked && !looksLikeEmail(picked)) {
          localStorage.setItem('display_name', picked)
          setDisplayName(picked)
        }
      } catch {
        /* ignore */
      }
    })()
  }, [])

  // 안전 기본값으로 렌더(undef 방지)
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

  const bgColor = getStatusColor(diag?.status)
  const valuePosition = Math.round(((diag?.score ?? 0) / 10) * 100)

  return (
    <div className="p-4 bg-gray-100 min-h-screen pb-20">
      <p className="text-center text-3xl font-bold mt-5 mb-2">두피 분석 결과</p>
      <p className="text-center text-blue-500">
        {displayName}님의 두피 분석 결과입니다!
      </p>

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

      <CaptureImage images={images} />
    </div>
  )
}

export default ResultPage
