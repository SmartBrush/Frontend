import { useEffect, useMemo, useState } from 'react'
import API from '../apis/api'
import { getMonthlyReport } from '../apis/reports'
import { METRICS, scoreToStatus, toneToBadge } from '../utils/metrics'
import SummaryCard from '../components/Monthly/SummaryCard'
import TrendChart from '../components/Monthly/TrendChart'
import ProductRecommendButton from '../components/Result/ProductRecommendButton'
import type { MetricKey, MonthlyRecord } from '../types/report'

const pickCachedNickname = (): string => {
  const c =
    localStorage.getItem('user_nickname') ??
    localStorage.getItem('user_name') ??
    localStorage.getItem('nickname') ??
    ''
  return c && !c.includes('@') ? c : '사용자'
}

const decodeJwt = (token: string) => {
  try {
    const part = token.split('.')[1]
    if (!part) return null
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4 === 2 ? '==' : b64.length % 4 === 3 ? '=' : ''
    return JSON.parse(atob(b64 + pad))
  } catch {
    return null
  }
}

const resolveNickname = async (): Promise<string> => {
  try {
    const r = await API.get('/api/mypage')
    const raw = r?.data?.data ?? r?.data ?? {}
    const rawNick: string = raw.nickname ?? raw.name ?? ''
    const safe = rawNick && !rawNick.includes('@') ? rawNick : ''
    if (safe) {
      localStorage.setItem('user_nickname', safe)
      localStorage.setItem('user_name', safe)
      return safe
    }
  } catch {
    //noop
  }

  try {
    const r = await API.get('/api/users/me')
    const raw = r?.data?.data ?? r?.data ?? {}
    const rawNick: string = raw.nickname ?? raw.name ?? ''
    const safe = rawNick && !rawNick.includes('@') ? rawNick : ''
    if (safe) {
      localStorage.setItem('user_nickname', safe)
      localStorage.setItem('user_name', safe)
      return safe
    }
  } catch {
    //noop
  }

  const token =
    localStorage.getItem('access_token') ??
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token') ??
    ''
  if (token) {
    const p = decodeJwt(token)
    const rawNick: string | undefined = (p?.nickname ?? p?.name) as
      | string
      | undefined
    const safe = rawNick && !rawNick.includes('@') ? rawNick : ''
    if (safe) {
      localStorage.setItem('user_nickname', safe)
      localStorage.setItem('user_name', safe)
      return safe
    }
  }
  return pickCachedNickname()
}

export default function MonthlyReportPage() {
  const [name, setName] = useState<string>(pickCachedNickname())
  const [months, setMonths] = useState<MonthlyRecord[] | null>(null)
  const [loading, setLoading] = useState(true)

  const [metricKey, setMetricKey] = useState<MetricKey>('oil') // 기본: 유분
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null) // '07' 같은 값

  useEffect(() => {
    ;(async () => {
      try {
        const resolved = await resolveNickname()
        setName(resolved)
        const report = await getMonthlyReport(resolved)
        setMonths(report.months)
      } catch {
        const fb = pickCachedNickname()
        setName(fb)
        const report = await getMonthlyReport(fb)
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
    <div className="mx-auto max-w-[420px] p-4">
      <header className="mt-1">
        <h2 className="text-[20px] font-extrabold text-gray-900">
          {name}님의 월별 레포트
        </h2>
        <p className="mt-1 text-[15px] font-bold text-black">두피검사 요약</p>
      </header>

      {/* 카드: 위 3개 / 아래 2개 */}
      <section className="mt-3 grid grid-cols-6 gap-3">
        {METRICS.map((m, idx) => {
          // ✅ 핵심: 활성 지표만 선택한 월 값, 나머지는 최신 달 값
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
  )
}
