import { useEffect, useMemo, useState } from 'react'
import API from '../apis/api'
import { getMonthlyReport } from '../apis/reports'
import { METRICS, scoreToStatus, toneToBadge } from '../utils/metrics'
import SummaryCard from '../components/Monthly/SummaryCard'
import TrendChart from '../components/Monthly/TrendChart'
import ProductRecommendButton from '../components/Result/ProductRecommendButton'
import type { MetricKey, MonthlyRecord } from '../types/report'
import { useNavigate } from 'react-router-dom'
import Back from '../assets/back.svg'

// 안전한 문자열만 통과
const clean = (s: unknown): string =>
  typeof s === 'string' && s.trim() !== '' && !s.includes('@') ? s.trim() : ''

// 캐시된 닉네임 우선
const pickCachedNickname = (): string => {
  const c =
    localStorage.getItem('user_nickname') ??
    localStorage.getItem('user_name') ??
    localStorage.getItem('nickname') ??
    ''
  return clean(c) || '사용자'
}

// JWT payload에서 name/nickname 추출
const decodeJwt = (token: string) => {
  try {
    const part = token.split('.')[1]
    if (!part) return null
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4 === 2 ? '==' : b64.length % 4 === 3 ? '=' : ''
    return JSON.parse(atob(b64 + pad)) as Record<string, unknown>
  } catch {
    return null
  }
}

// 서버에서 이름 가져오기 → 보고서/토큰/캐시 순으로 폴백
const resolveDisplayName = async (): Promise<string> => {
  try {
    const r = await API.get<unknown>('/api/mypage')
    if (r && typeof r === 'object') {
      // r.data 또는 r.data.data 형태 모두 대응
      const raw = (r as any).data?.data ?? (r as any).data ?? (r as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      const name = clean(raw?.nickname ?? raw?.name)
      if (name) return name
    }
  } catch {
    /* */
  }
  try {
    const r = await API.get<unknown>('/api/users/me')
    if (r && typeof r === 'object') {
      const raw = (r as any).data?.data ?? (r as any).data ?? (r as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      const name = clean(raw?.nickname ?? raw?.name)
      if (name) return name
    }
  } catch {
    /* */
  }

  // 2) 토큰
  const token =
    localStorage.getItem('access_token') ??
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token') ??
    ''
  if (token) {
    const p = decodeJwt(token)
    const name = clean(p?.nickname ?? p?.name)
    if (name) return name
  }

  // 3) 캐시
  return pickCachedNickname()
}

export default function MonthlyReportPage() {
  const navigate = useNavigate()
  const [name, setName] = useState<string>(pickCachedNickname())
  const [months, setMonths] = useState<MonthlyRecord[] | null>(null)
  const [loading, setLoading] = useState(true)

  const [metricKey, setMetricKey] = useState<MetricKey>('oil') // 기본: 유분
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null) // '07' 같은 값

  useEffect(() => {
    ;(async () => {
      try {
        const [report, displayName] = await Promise.all([
          getMonthlyReport(),
          resolveDisplayName(),
        ])

        const finalName =
          clean(displayName) || clean(report.userName) || pickCachedNickname()

        setName(finalName)
        setMonths(report.months)

        // 캐시 최신화
        localStorage.setItem('user_nickname', finalName)
        localStorage.setItem('user_name', finalName)
      } catch {
        // 완전 실패 시에도 최소 폴백
        const fb = pickCachedNickname()
        setName(fb)
        const report = await getMonthlyReport()
        setMonths(report.months)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // 최신 달
  const latest = useMemo(() => {
    if (!months || months.length === 0) return null
    return months[months.length - 1]
  }, [months])

  // 기본 선택 월 = 최신 달
  useEffect(() => {
    if (!months || months.length === 0) return
    setSelectedLabel(months[months.length - 1].month.slice(5)) // 'MM'
  }, [months])

  // 사용자가 고른 월의 레코드
  const selectedRecord = useMemo(() => {
    if (!months || months.length === 0) return null
    if (!selectedLabel) return latest
    return months.find((m) => m.month.slice(5) === selectedLabel) ?? latest
  }, [months, selectedLabel, latest])

  if (loading)
    return <div className="p-5 text-sm text-gray-600">로딩 중...</div>
  if (!months || !latest) return <div className="p-5">데이터가 없습니다.</div>

  return (
    <>
      <div
        className="sticky top-0 z-50 bg-white
                px-4 py-[15px] flex items-center text-[20px] font-semibold text-gray-800"
      >
        <button
          onClick={() => navigate('/')}
          className="mr-2 cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={Back} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <span>월별 레포트</span>
      </div>
      <div className="mx-auto max-w-[420px] px-4 pb-[15px]">
        <header>
          <h2 className="text-[20px] font-extrabold text-gray-900">
            {name}님의 월별 레포트
          </h2>
          <p className="mt-1 text-[15px] font-bold text-black">두피검사 요약</p>
        </header>

        <section className="mt-3 grid grid-cols-6 gap-3">
          {METRICS.map((m, idx) => {
            // 활성 지표만 선택한 월 값, 나머지는 최신 달 값
            const baseValue = latest.values[m.key]
            const value =
              m.key === metricKey && selectedRecord
                ? selectedRecord.values[m.key]
                : baseValue

            const { label, tone } = scoreToStatus(value, m.direction)

            let pos = 'col-span-2'
            if (idx === 3) pos += ' col-start-2'
            if (idx === 4) pos += ' col-start-4'

            return (
              <div key={m.key} className={pos}>
                <SummaryCard
                  title={m.label}
                  value={value}
                  badgeText={label}
                  badgeClass={toneToBadge(tone)}
                  active={m.key === metricKey}
                  onClick={() => setMetricKey(m.key)}
                />
              </div>
            )
          })}
        </section>

        {/* 선택 지표 차트 (선택 월 상태를 공유) */}
        <section className="mt-4">
          <TrendChart
            data={months}
            metricKey={metricKey}
            selectedLabel={selectedLabel}
            onSelectLabel={setSelectedLabel}
          />
        </section>

        <ProductRecommendButton />
      </div>
    </>
  )
}
