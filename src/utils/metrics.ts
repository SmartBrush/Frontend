import type { MetricKey } from '../types/report'

export type Direction = 'higherIsBetter' | 'higherIsWorse'
export type Tone = 'good' | 'warn' | 'bad'

export interface MetricConfig {
  key: MetricKey
  label: string
  direction: Direction
}

export const METRICS: MetricConfig[] = [
  { key: 'density', label: '모발 밀도', direction: 'higherIsBetter' },
  { key: 'oil', label: '유분 정도', direction: 'higherIsWorse' },
  { key: 'thickness', label: '모발 굵기', direction: 'higherIsBetter' },
  { key: 'sensitivity', label: '두피 민감도', direction: 'higherIsWorse' },
  { key: 'scaling', label: '각질/비듬', direction: 'higherIsWorse' },
]

// 상태 판정: 기본 임계값 (0~100 가정, 추후 조정)
export function scoreToStatus(
  value: number,
  dir: Direction,
): { label: '양호' | '보통' | '심각'; tone: Tone } {
  if (dir === 'higherIsWorse') {
    if (value < 40) return { label: '양호', tone: 'good' }
    if (value < 70) return { label: '보통', tone: 'warn' }
    return { label: '심각', tone: 'bad' }
  } else {
    if (value >= 60) return { label: '양호', tone: 'good' }
    if (value >= 40) return { label: '보통', tone: 'warn' }
    return { label: '심각', tone: 'bad' }
  }
}

// tone 파라미터도 Tone으로 고정
export function toneToBadge(tone: Tone): string {
  switch (tone) {
    case 'good':
      return 'bg-green-500'
    case 'warn':
      return 'bg-amber-400'
    case 'bad':
      return 'bg-red-500'
  }
}
