import type { ScalpMbtiType } from '../types/scalp'

export const mbtiData: Record<
  ScalpMbtiType,
  {
    title: string
    description: string
    avoidIngredients: string[]
    recommendedIngredients: string[]
    tips: string[]
    radarValues: { label: string; value: number }[]
  }
> = {
  oily_trouble_type: {
    title: '🔥 트러블 폭풍형',
    description:
      '과도한 유분 + 고염증 + 고각질\n → 모공 막힘 + 피지 폭발 + 비듬 습격',
    avoidIngredients: ['실리콘', '미네랄오일', '합성향료'],
    recommendedIngredients: ['살리실산', '녹차 추출물', '마데카소사이드'],
    tips: ['두피 스크럽 주 1회', '피지 조절 샴푸 사용', '밤에는 모자 피하기'],
    radarValues: [
      { label: '유분', value: 85 },
      { label: '염증', value: 80 },
      { label: '각질', value: 70 },
      { label: '수분', value: 40 },
      { label: '자극', value: 75 },
    ],
  },

  oily_sensitive_type: {
    title: '🔥 지성 민감형',
    description:
      '과도한 유분 + 고염증 + 자극성\n → 피지 + 트러블 + 잦지만 각질은 적음',
    avoidIngredients: ['에탄올', '합성 계면활성제', '멘톨'],
    recommendedIngredients: ['티트리', '판테놀', '병풀 추출물'],
    tips: ['두피 쿨링 미스트 활용', '샴푸는 저자극 제품', '뜨거운 바람 최소화'],
    radarValues: [
      { label: '유분', value: 80 },
      { label: '염증', value: 75 },
      { label: '각질', value: 40 },
      { label: '수분', value: 45 },
      { label: '자극', value: 80 },
    ],
  },

  oily_scaling_type: {
    title: '💧 지성 비듬형',
    description:
      '과도한 유분 + 저염증 + 고각질\n → 기름 + 각질 + 비듬이 주 증상',
    avoidIngredients: ['실리콘', '중금속 염료', '파라벤'],
    recommendedIngredients: ['징크피리치온', '피록톤올아민', '로즈마리 추출물'],
    tips: ['하루 1회 이상 샴푸', '각질 제거 팩 주 1회', '정수리 중심 마사지'],
    radarValues: [
      { label: '유분', value: 85 },
      { label: '염증', value: 30 },
      { label: '각질', value: 75 },
      { label: '수분', value: 45 },
      { label: '자극', value: 50 },
    ],
  },

  seborrheic_type: {
    title: '🔥 깐깐 지성형',
    description:
      '과도한 유분 + 저염증 + 자극적\n → 기름 + 민감한 자극 + 간지러움 적응',
    avoidIngredients: ['알코올', '향료', '황산염'],
    recommendedIngredients: ['라벤더 오일', '알란토인', '카모마일'],
    tips: [
      '아침/저녁 수분 스프레이',
      '가벼운 보습 제품',
      '모자 착용 시간 줄이기',
    ],
    radarValues: [
      { label: '유분', value: 85 },
      { label: '염증', value: 35 },
      { label: '각질', value: 40 },
      { label: '수분', value: 55 },
      { label: '자극', value: 70 },
    ],
  },

  dry_trouble_type: {
    title: '🔥 건조 트러블형',
    description: '정상 유분 + 고염증 + 고각질\n → 건조 + 자극 + 비듬 동반',
    avoidIngredients: ['에탄올', '황산염', '합성 계면활성제'],
    recommendedIngredients: ['세라마이드', '판테놀', '오트밀'],
    tips: [
      '뜨거운 물 X, 미지근한 물로 샴푸',
      '샴푸 후 두피 보습제 사용',
      '드라이 시 찬바람',
    ],
    radarValues: [
      { label: '유분', value: 40 },
      { label: '염증', value: 80 },
      { label: '각질', value: 75 },
      { label: '수분', value: 30 },
      { label: '자극', value: 70 },
    ],
  },

  dry_sensitive_type: {
    title: '🌱 민감 건조형',
    description: '정상 유분 + 고자극 + 고건조\n → 당김 + 민감한 두피',
    avoidIngredients: ['에탄올', '합성향료', 'SLS'],
    recommendedIngredients: ['병풀 추출물', '히알루론산', '마데카소사이드'],
    tips: [
      '하루 1회 샴푸 유지',
      '수분 케어 제품 위주 사용',
      '두피 미스트 활용',
    ],
    radarValues: [
      { label: '유분', value: 40 },
      { label: '염증', value: 30 },
      { label: '각질', value: 50 },
      { label: '수분', value: 25 },
      { label: '자극', value: 85 },
    ],
  },

  dry_scaling_type: {
    title: '💧 건조 비듬형',
    description: '정상 유분 + 고각질 + 비정상\n → 각질 + 비듬이 주 증상',
    avoidIngredients: ['황산염', '에탄올', '멘톨'],
    recommendedIngredients: ['징크피리치온', '알로에베라', '시어버터'],
    tips: ['비듬 전용 샴푸 사용', '1일 1회 샴푸 유지', '드라이 시 찬바람'],
    radarValues: [
      { label: '유분', value: 35 },
      { label: '염증', value: 25 },
      { label: '각질', value: 80 },
      { label: '수분', value: 35 },
      { label: '자극', value: 50 },
    ],
  },

  balanced_type: {
    title: '🍀 밸런스형',
    description: '수분, 유분, 자극도 안정적\n → 이상적인 두피 컨디션',
    avoidIngredients: ['-'],
    recommendedIngredients: ['-'],
    tips: ['현재 루틴 유지', '과도한 관리 피하기', '스트레스 관리'],
    radarValues: [
      { label: '유분', value: 50 },
      { label: '염증', value: 30 },
      { label: '각질', value: 30 },
      { label: '수분', value: 70 },
      { label: '자극', value: 30 },
    ],
  },
}
