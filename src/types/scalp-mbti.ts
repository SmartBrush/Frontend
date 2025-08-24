import type { MbtiCardKey } from '../data/mbtiCardData'

export type ScalpMbtiType =
  | 'oily_trouble_type'
  | 'oily_sensitive_type'
  | 'oily_scaling_type'
  | 'clean_oily_type'
  | 'dry_trouble_type'
  | 'dry_sensitive_type'
  | 'dry_scaling_type'
  | 'balanced_type'

export const LABEL_TO_TYPE: Record<string, ScalpMbtiType> = {
  '트러블 폭풍형': 'oily_trouble_type',
  '지성 민감형': 'oily_sensitive_type',
  '지성 비듬형': 'oily_scaling_type',
  '깔끔 지성형': 'clean_oily_type',
  '깐깐 지성형': 'clean_oily_type',
  '건조 트러블형': 'dry_trouble_type',
  '민감 건조형': 'dry_sensitive_type',
  '건조 비듬형': 'dry_scaling_type',
  밸런스형: 'balanced_type',
}

export function labelToType(label?: string | null): ScalpMbtiType | null {
  if (!label) return null
  const t = LABEL_TO_TYPE[label.trim()]
  if (t) return t
  const ns = label.replace(/\s+/g, '')
  const found = Object.entries(LABEL_TO_TYPE).find(
    ([k]) => k.replace(/\s+/g, '') === ns,
  )
  return found ? found[1] : null
}

export const TYPE_TO_CARDKEY: Record<ScalpMbtiType, MbtiCardKey> = {
  oily_trouble_type: 'oily_trouble',
  oily_sensitive_type: 'oily_sensitive',
  oily_scaling_type: 'oily_dandruff', // (= oily_scaling)
  clean_oily_type: 'clean_oily',
  dry_trouble_type: 'dry_trouble',
  dry_sensitive_type: 'dry_sensitive',
  dry_scaling_type: 'dry_scaling',
  balanced_type: 'balanced',
}

export function labelToCardKey(label?: string | null): MbtiCardKey | null {
  const t = labelToType(label)
  return t ? TYPE_TO_CARDKEY[t] : null
}
