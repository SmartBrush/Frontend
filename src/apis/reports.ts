import API from './api'
import type { MonthlyRecord, MonthlyReportResponse } from '../types/report'

const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null

const toNumber = (v: unknown, fallback = 0): number => {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v)
    return Number.isFinite(n) ? n : fallback
  }
  return fallback
}

const pick = (
  obj: Record<string, unknown>,
  keys: readonly string[],
): unknown => {
  for (const k of keys) if (k in obj) return obj[k]
  return undefined
}

const toMonthLabel = (row: Record<string, unknown>): string => {
  const m = row['month']
  if (typeof m === 'string' && /^\d{4}-\d{2}$/.test(m)) return m

  const y = toNumber(row['year'] ?? row['y'], NaN)
  const mmRaw = row['monthNo'] ?? row['month_no'] ?? row['month'] ?? row['m']
  const mm = toNumber(mmRaw, NaN)

  if (!Number.isNaN(y) && !Number.isNaN(mm))
    return `${y}-${String(mm).padStart(2, '0')}`
  return 'unknown'
}

const toObjectArray = (
  data: unknown,
): ReadonlyArray<Record<string, unknown>> => {
  if (Array.isArray(data)) return data.filter(isObject)

  if (isObject(data)) {
    // 래핑 배열 우선 탐색
    const wrapKeys = [
      'months',
      'data',
      'average',
      'items',
      'content',
      'list',
      'result',
    ] as const
    for (const k of wrapKeys) {
      const v = data[k]
      if (Array.isArray(v)) return v.filter(isObject)
      if (isObject(v)) {
        const inner = toObjectArray(v)
        if (inner.length) return inner
      }
    }

    const out: Record<string, unknown>[] = []
    for (const [key, val] of Object.entries(data)) {
      if (!isObject(val)) continue
      if (/^\d{4}-\d{1,2}$/.test(key)) {
        const [ys, ms] = key.split('-')
        const y = Number(ys)
        const m = Number(ms)
        if (Number.isFinite(y) && Number.isFinite(m)) {
          out.push({ year: y, month: m, ...val })
        }
      }
    }
    if (out.length) return out
  }

  return []
}

// 지난 3개월(이번 달 제외) 월평균
export async function getMonthlyReport(
  userName?: string,
): Promise<MonthlyReportResponse> {
  const { data } = await API.get<unknown>('/api/main/diagnosis/average')

  const rows = toObjectArray(data)

  const months: MonthlyRecord[] = rows
    .map((row) => {
      const month = toMonthLabel(row)

      const density = toNumber(
        pick(row, ['density', 'densityValue', 'density_score']),
        0,
      )
      const oil = toNumber(
        pick(row, [
          'oil',
          'sebum',
          'sebumLevelValue',
          'sebum_score',
          'oil_score',
        ]),
        0,
      )
      const thickness = toNumber(
        pick(row, ['thickness', 'poreSizeValue', 'thickness_score']),
        0,
      )
      const sensitivity = toNumber(
        pick(row, [
          'sensitivity',
          'scalpSensitivityValue',
          'sensitivity_score',
        ]),
        0,
      )
      const scaling = toNumber(
        pick(row, ['scaling', 'scalingValue', 'dandruff', 'scaling_score']),
        0,
      )

      return {
        month,
        values: { density, oil, thickness, sensitivity, scaling },
      }
    })
    .filter((r) => r.month !== 'unknown')
    .sort((a, b) => a.month.localeCompare(b.month))

  // 사용자명 추출(있으면)
  let extractedUser = userName ?? '사용자'
  if (isObject(data)) {
    const cand = data['userName'] ?? data['username']
    if (typeof cand === 'string' && cand.trim() !== '') extractedUser = cand
  }

  return { userName: extractedUser, months }
}

// 옵션: 월별 날짜별 status
export interface DayStatus {
  date: string
  status: string
}

export async function getMonthlyStatuses(
  year: number,
  month: number,
): Promise<DayStatus[]> {
  const { data } = await API.get<unknown>(
    '/api/main/diagnosis/status/by-month',
    { params: { year, month } },
  )

  if (Array.isArray(data)) {
    const out: DayStatus[] = []
    for (const el of data) {
      if (!isObject(el)) continue
      const dateVal = el['date'] ?? el['day'] ?? el['dt']
      const statusVal = el['status'] ?? el['state'] ?? ''
      out.push({ date: String(dateVal ?? ''), status: String(statusVal ?? '') })
    }
    return out
  }

  if (isObject(data)) {
    const out: DayStatus[] = []
    for (const [k, v] of Object.entries(data))
      out.push({ date: String(k), status: String(v ?? '') })
    return out
  }

  return []
}
