import API from './api'
import type { MbtiCardKey } from '../data/mbtiCardData'

export type ScalpMbtiSummary = {
  nickname?: string
  email?: string
  scalpMbti?: string // 예: "지성 민감형"
  diagnosedDate?: string
}

// 한국어 라벨 → 카드 키
const MBTI_KO_MAP: Record<string, MbtiCardKey> = {
  '트러블 폭풍형': 'oily_trouble',
  '지성 민감형': 'oily_sensitive',
  '지성 비듬형': 'oily_dandruff',
  '깔끔 지성형': 'clean_oily',
  '깐깐 지성형': 'clean_oily',
  '건조 트러블형': 'dry_trouble',
  '민감 건조형': 'dry_sensitive',
  '건조 비듬형': 'dry_scaling',
  밸런스형: 'balanced',
}

// ── 요약 형태인지 확인
function isSummary(x: unknown): x is ScalpMbtiSummary {
  return (
    typeof x === 'object' &&
    x !== null &&
    'scalpMbti' in (x as Record<string, unknown>) &&
    (typeof (x as ScalpMbtiSummary).scalpMbti === 'string' ||
      typeof (x as ScalpMbtiSummary).scalpMbti === 'undefined')
  )
}

/** 내 두피 MBTI 요약 가져오기 */
export async function getMyScalpMbtiSummary(): Promise<ScalpMbtiSummary> {
  const { data } = await API.get<ScalpMbtiSummary>('/api/me/scalp-mbti', {
    params: { _: Date.now() },
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
  })
  return isSummary(data) ? data : {}
}

/** 한국어 라벨 → 카드 키 */
export function toCardKeyFromKo(label?: string | null): MbtiCardKey | null {
  if (!label) return null
  const exact = MBTI_KO_MAP[label.trim()]
  if (exact) return exact

  const ns = label.replace(/\s+/g, '')
  const found = Object.entries(MBTI_KO_MAP).find(
    ([k]) => k.replace(/\s+/g, '') === ns,
  )
  return found ? found[1] : null
}
