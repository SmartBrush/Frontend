// import { useEffect, useMemo, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import API from '../apis/api'
// import ScalpStatusCard from '../components/Result/ScalpStatusCard'
// import ScalpRadarChart from '../components/Result/ScalpRadarChart'
// import StatusSlider from '../components/Result/StatusSlider'
// import CaptureImage from '../components/Result/CaptureImage'
// import ProductRecommendButton from '../components/Result/ProductRecommendButton'
// import sample1 from '../assets/sample1.png'
// import sample2 from '../assets/sample2.png'

// type Status = '양호' | '보통' | '심각'

// type ImageItem = { id: number; src: string; label: string }

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

// interface LocationState {
//   images?: ImageItem[]
//   diagnosis?: DiagnosisDetail
// }

// const looksLikeEmail = (s?: string) => !!s && /.+@.+\..+/.test(s)

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

// function safeParse<T>(raw: string | null): T | null {
//   if (!raw) return null
//   try {
//     return JSON.parse(raw) as T
//   } catch {
//     return null
//   }
// }

// const ResultPage = () => {
//   const location = useLocation()
//   const state = (location.state ?? {}) as LocationState

//   // 사용자별 세션키 네임스페이스
//   const userKey = useMemo(() => {
//     const cands = ['user_id', 'email', 'username', 'display_name', 'nickname', 'name'] as const
//     for (const k of cands) {
//       const v = localStorage.getItem(k)
//       if (v) return v
//     }
//     return 'guest'
//   }, [])
//   const SKEY_IMAGES = `result_images:${userKey}`
//   const SKEY_DIAG = `result_diagnosis:${userKey}`

//   // 이름: localStorage 우선 → 한 번만 API로 확정
//   const [displayName, setDisplayName] = useState<string>(() => {
//     const cached =
//       localStorage.getItem('display_name') ||
//       localStorage.getItem('nickname') ||
//       localStorage.getItem('name') ||
//       localStorage.getItem('username')
//     return cached && !looksLikeEmail(cached) ? cached : '회원'
//   })

//   // 이미지
//   const [images, setImages] = useState<ImageItem[]>(() => {
//     return (
//       state.images ??
//       safeParse<ImageItem[]>(sessionStorage.getItem(SKEY_IMAGES)) ?? [
//         { id: 1, src: sample1, label: '정수리' },
//         { id: 2, src: sample2, label: '앞머리' },
//       ]
//     )
//   })

//   // 진단(없으면 null 유지)
//   const [diag, setDiag] = useState<DiagnosisDetail | null>(() => {
//     return state.diagnosis ?? safeParse<DiagnosisDetail>(sessionStorage.getItem(SKEY_DIAG))
//   })

//   // 마운트 시: state 있으면 세션 백업 / 없으면 세션 복원
//   useEffect(() => {
//     if (state.images) {
//       sessionStorage.setItem(SKEY_IMAGES, JSON.stringify(state.images))
//       setImages(state.images)
//     } else {
//       const cached = safeParse<ImageItem[]>(sessionStorage.getItem(SKEY_IMAGES))
//       if (cached) setImages(cached)
//     }

//     if (state.diagnosis) {
//       sessionStorage.setItem(SKEY_DIAG, JSON.stringify(state.diagnosis))
//       setDiag(state.diagnosis)
//     } else {
//       const cached = safeParse<DiagnosisDetail>(sessionStorage.getItem(SKEY_DIAG))
//       if (cached) setDiag(cached)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [SKEY_DIAG, SKEY_IMAGES, state.images, state.diagnosis])

//   // 이름 확정(선택) – 실패해도 화면 유지
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
//           d.nickname ?? d.name ?? d.user?.nickname ?? d.user?.name ?? d.profile?.nickname ?? d.profile?.name
//         if (picked && !looksLikeEmail(picked)) {
//           localStorage.setItem('display_name', picked)
//           setDisplayName(picked)
//         }
//       } catch {
//         /* ignore */
//       }
//     })()
//   }, [])

//   // 안전 데이터(있을 때만 사용)
//   const safeDiag: DiagnosisDetail = useMemo(
//     () => ({
//       scalpSensitivityValue: diag?.scalpSensitivityValue ?? 0,
//       scalpSensitivityLevel: diag?.scalpSensitivityLevel ?? '보통',
//       densityValue: diag?.densityValue ?? 0,
//       densityLevel: diag?.densityLevel ?? '보통',
//       sebumLevelValue: diag?.sebumLevelValue ?? 0,
//       sebumLevel: diag?.sebumLevel ?? '보통',
//       poreSizeValue: diag?.poreSizeValue ?? 0,
//       poreSizeLevel: diag?.poreSizeLevel ?? '보통',
//       scalingValue: diag?.scalingValue ?? 0,
//       scalingLevel: diag?.scalingLevel ?? '보통',
//       score: diag?.score ?? 0,
//       status: diag?.status ?? '보통',
//     }),
//     [diag],
//   )

//   const hasDiag = !!diag
//   const bgColor = getStatusColor(diag?.status)
//   const valuePosition = Math.round(((diag?.score ?? 0) / 10) * 100)

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen pb-20">
//       <p className="text-center text-3xl font-bold mt-5 mb-2">두피 분석 결과</p>
//       <p className="text-center text-blue-500">{displayName}님의 두피 분석 결과입니다!</p>

//       {hasDiag ? (
//         <>
//           <ScalpStatusCard status={safeDiag.status} score={safeDiag.score} bgColor={bgColor} />
//           <ScalpRadarChart data={safeDiag} />
//           <div className="mt-15 mb">
//             <StatusSlider label="" valuePosition={valuePosition} color="red" />
//           </div>
//           <ProductRecommendButton />
//         </>
//       ) : (
//         <div className="bg-white rounded-lg shadow p-6 mt-4 text-center">
//           <p className="text-sm text-gray-700">아직 진단 결과가 없어요.</p>
//           <p className="text-xs text-gray-500 mt-1">촬영 후 진단을 완료하면 결과가 표시됩니다.</p>
//         </div>
//       )}

//       {/* 촬영 이미지 섹션은 그대로 노출 */}
//       <CaptureImage images={images} />
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

const safeParse = <T,>(raw: string | null): T | null => {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

const readDisplayName = (): string => {
  const cached =
    localStorage.getItem('display_name') ||
    localStorage.getItem('nickname') ||
    localStorage.getItem('name') ||
    localStorage.getItem('username')
  return cached && !looksLikeEmail(cached) ? cached : '회원'
}

const readUserKey = (): string => {
  const cands = [
    'user_id',
    'email',
    'username',
    'display_name',
    'nickname',
    'name',
  ] as const
  for (const k of cands) {
    const v = localStorage.getItem(k)
    if (v) return v
  }
  return 'guest'
}

declare global {
  interface WindowEventMap {
    'profile-updated': Event
  }
}

const ResultPage = () => {
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState

  // 사용자 키를 state로 관리 (로그인 직후에도 즉시 반응)
  const [userKey, setUserKey] = useState<string>(() => readUserKey())
  const SKEY_IMAGES = useMemo(() => `result_images:${userKey}`, [userKey])
  const SKEY_DIAG = useMemo(() => `result_diagnosis:${userKey}`, [userKey])
  const SKEY_CURRENT_USER = 'result_current_user'
  // 이름
  const [displayName, setDisplayName] = useState<string>(() =>
    readDisplayName(),
  )

  // 데이터(초기엔 비워서 '이전 사용자 잔상' 차단)
  const [images, setImages] = useState<ImageItem[]>([])
  const [diag, setDiag] = useState<DiagnosisDetail | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await API.get('/api/mypage')
        const me = res.data as {
          id?: string | number
          email?: string
          username?: string
          nickname?: string
          name?: string
          user?: { id?: string | number; nickname?: string; name?: string }
          profile?: { nickname?: string; name?: string }
        }

        const nextName =
          me.nickname ??
          me.name ??
          me.user?.nickname ??
          me.user?.name ??
          me.profile?.nickname ??
          me.profile?.name ??
          '회원'

        const nextKey = String(
          me.id ?? me.user?.id ?? me.email ?? me.username ?? nextName,
        )

        // 사용자 변경 감지
        if (nextKey && nextKey !== userKey) {
          // 1) 이전 사용자 캐시 정리
          Object.keys(sessionStorage).forEach((k) => {
            if (
              k.startsWith('result_diagnosis:') ||
              k.startsWith('result_images:')
            ) {
              sessionStorage.removeItem(k)
            }
          })
          sessionStorage.setItem('result_current_user', nextKey)

          // 2) 로컬 스토리지 갱신
          localStorage.setItem('user_id', nextKey)
          localStorage.setItem('display_name', nextName)
          localStorage.setItem('nickname', nextName)
          localStorage.setItem('name', nextName)

          // 3) 상태 즉시 반영 (다른 페이지 갔다 올 필요 없음)
          setUserKey(nextKey) // ← SKEY_DIAG/IMAGES 의존성으로 재로딩됨
          setDisplayName(nextName) // 헤더 이름 즉시 변경
          setDiag(null) // 잔상 제거
          setImages([])
        } else if (nextName !== displayName) {
          localStorage.setItem('display_name', nextName)
          localStorage.setItem('nickname', nextName)
          localStorage.setItem('name', nextName)
          setDisplayName(nextName)
        }
      } catch {
        // ignore
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 로그인/프로필 변경에 즉시 반응
  useEffect(() => {
    const refreshIdentity = () => {
      setUserKey(readUserKey())
      setDisplayName(readDisplayName())
    }
    window.addEventListener('profile-updated', refreshIdentity)
    window.addEventListener('storage', refreshIdentity) // 다른 탭
    return () => {
      window.removeEventListener('profile-updated', refreshIdentity)
      window.removeEventListener('storage', refreshIdentity)
    }
  }, [])

  useEffect(() => {
    const lastUser = sessionStorage.getItem(SKEY_CURRENT_USER) // 이전에 결과 저장했던 사용자

    // 1) 이번 네비게이션이 진단 플로우에서 왔다면: 저장 & 표시
    if (state.diagnosis) {
      setDiag(state.diagnosis)
      setImages(state.images ?? [])

      sessionStorage.setItem(SKEY_CURRENT_USER, userKey)
      sessionStorage.setItem(SKEY_DIAG, JSON.stringify(state.diagnosis))
      if (state.images && state.images.length > 0) {
        sessionStorage.setItem(SKEY_IMAGES, JSON.stringify(state.images))
      } else {
        sessionStorage.removeItem(SKEY_IMAGES)
      }
      return
    }

    // 2) 진단 플로우 상태가 없을 때
    // 2-1) 같은 사용자라면 세션에서 복원
    if (lastUser && lastUser === userKey) {
      const cachedDiag = safeParse<DiagnosisDetail>(
        sessionStorage.getItem(SKEY_DIAG),
      )
      const cachedImgs =
        safeParse<ImageItem[]>(sessionStorage.getItem(SKEY_IMAGES)) ?? []
      setDiag(cachedDiag ?? null)
      setImages(cachedImgs)
      return
    }

    // 2-2) 다른 사용자라면 즉시 초기화하고 캐시 정리
    setDiag(null)
    setImages([])
    if (lastUser && lastUser !== userKey) {
      sessionStorage.removeItem(`result_diagnosis:${lastUser}`)
      sessionStorage.removeItem(`result_images:${lastUser}`)
    }
    sessionStorage.removeItem(SKEY_DIAG)
    sessionStorage.removeItem(SKEY_IMAGES)
    sessionStorage.setItem(SKEY_CURRENT_USER, userKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey, SKEY_DIAG, SKEY_IMAGES, state.diagnosis, state.images])

  // 안전 데이터(있을 때만 사용)
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
          {images.length > 0 && <CaptureImage images={images} />}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 mt-4 text-center">
          <p className="text-sm text-gray-700">아직 진단 결과가 없어요.</p>
          <p className="text-xs text-gray-500 mt-1">
            촬영 후 진단을 완료하면 결과가 표시됩니다.
          </p>
        </div>
      )}
    </div>
  )
}

export default ResultPage
