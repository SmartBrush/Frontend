import type { MbtiCardKey } from '../data/mbtiCardData'

export type ScalpMbtiType =
  | 'oily_sensitive_type' //지성 민감형
  | 'oily_scaling_type' //지성 비듬형
  | 'oily_clean_type' // 지성 깔끔형
  | 'oily_trouble_type' // 지성 트러블형
  | 'dry_sensitive_type' //건성 민감형
  | 'dry_scaling_type' //건성 비듬형
  | 'dry_clean_type' // 건성 깔끔형
  | 'dry_trouble_type' // 건성 트러블형
  | 'balanced_type' // 밸런스형

export const LABEL_TO_TYPE: Record<string, ScalpMbtiType> = {
  '지성 민감형': 'oily_sensitive_type',
  '지성 비듬형': 'oily_scaling_type',
  '지성 깔끔형': 'oily_clean_type',
  '지성 트러블형': 'oily_trouble_type',
  '건성 민감형': 'dry_sensitive_type',
  '건성 비듬형': 'dry_scaling_type',
  '건성 깔끔형': 'dry_clean_type',
  '건성 트러블형': 'dry_trouble_type',
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
  oily_sensitive_type: 'oily_sensitive',
  oily_scaling_type: 'oily_scaling', // (= oily_scaling)
  oily_clean_type: 'oily_clean',
  oily_trouble_type: 'oily_trouble',
  dry_sensitive_type: 'dry_sensitive',
  dry_scaling_type: 'dry_scaling',
  dry_clean_type: 'dry_clean',
  dry_trouble_type: 'dry_trouble',
  balanced_type: 'balanced',
}

export function labelToCardKey(label?: string | null): MbtiCardKey | null {
  const t = labelToType(label)
  return t ? TYPE_TO_CARDKEY[t] : null
}
