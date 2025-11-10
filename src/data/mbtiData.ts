import type { ScalpMbtiType } from '../types/scalp-mbti'

export type Level = 1 | 2 | 3 | 4
export type LevelRange = Level | [Level, Level]

// 3축 구조: 유분/민감도/각질 */
export type MbtiRatings = {
  oil: LevelRange // 유분
  sensitivity: LevelRange // 민감도(자극/염증)
  scaling: LevelRange // 각질/비듬
}

// 카드 공통 데이터(차트 값은 ratings로 통일)
export type MbtiCardCore = {
  title: string
  description: string
  // avoidIngredients: string[]
  // recommendedIngredients: string[]
  // tips: string[]
  ratings: MbtiRatings
}

export const mbtiData: Record<
  ScalpMbtiType,
  {
    title: string
    description: string
    // avoidIngredients: string[]
    // recommendedIngredients: string[]
    // tips: string[]
    ratings: MbtiRatings
  }
> = {
  oily_sensitive_type: {
    title: '🚨 지성 민감형',
    description: '기름지고 예민한 두피\n진정과 균형이 동시에 필요',
    // avoidIngredients: ['멘톨', '에탄올', '합성향료'],
    // recommendedIngredients: ['티트리', '판테놀', '병풀 추출물'],
    // tips: ['두피 쿨링 미스트 활용', '샴푸는 저자극 제품', '뜨거운 바람 최소화'],
    ratings: { oil: 3, sensitivity: 4, scaling: 2 },
  },

  oily_scaling_type: {
    title: '💧 지성 비듬형',
    description: '유분이 많고 각질이 두드러짐\n비듬케어가 필요',
    // avoidIngredients: ['실리콘', '중금속 염료', '파라벤'],
    // recommendedIngredients: ['징크피리치온', '피록톤올아민', '로즈마리 추출물'],
    // tips: ['하루 1회 이상 샴푸', '각질 제거 팩 주 1회', '정수리 중심 마사지'],
    ratings: { oil: 4, sensitivity: 2, scaling: 4 },
  },

  oily_clean_type: {
    title: '🫧 지성 깔끔형',
    description:
      '피지분비는 많고 각질/염증이 적음\n꼼꼼한 세정과 가벼운 각질 케어',
    // avoidIngredients: ['과한 오일', '실리콘 계열'],
    // recommendedIngredients: ['라벤더 오일', '티트리 오일', '녹차 추출물'],
    // tips: [
    //   '아침/저녁 수분 스프레이',
    //   '가벼운 보습 제품',
    //   '모자 착용 시간 줄이기',
    // ],
    ratings: { oil: 3, sensitivity: 1, scaling: 2 },
  },

  oily_trouble_type: {
    title: '🔥 지성 트러블형',
    description:
      '민감하고 트러블이 생기는 두피\n예민한 두피에는 진정 케어가 필요',
    // avoidIngredients: ['실리콘', '미네랄오일', '합성향료'],
    // recommendedIngredients: ['티트리 오일', '녹차 추출물'],
    // tips: ['두피 스크럽 주 1회', '피지 조절 샴푸 사용', '밤에는 모자 피하기'],
    ratings: { oil: 4, sensitivity: 4, scaling: 4 },
  },

  dry_sensitive_type: {
    title: '🍀 건성 민감형',
    description: '외부 자극에 약한 두피\n자극없이 순한 케어가 필요',
    // avoidIngredients: ['에탄올', '합성향료', '멘톨'],
    // recommendedIngredients: ['알로에베라', '히알루론산', '카모마일', '판테놀'],
    // tips: [
    //   '하루 1회 샴푸 유지',
    //   '수분 케어 제품 위주 사용',
    //   '두피 미스트 활용',
    // ],
    ratings: { oil: 1, sensitivity: 4, scaling: 1 },
  },
  dry_scaling_type: {
    title: '❄️ 건성 비듬형',
    description: '유분이 적고 각질이 두드러짐\n비듬과 간지러움 케어가 필요',
    // avoidIngredients: ['실리콘'],
    // recommendedIngredients: [
    //   '히알루론산',
    //   '알로에베라',
    //   '살리실산',
    //   '레조르신',
    // ],
    // tips: ['비듬 전용 샴푸 사용', '1일 1회 샴푸 유지', '드라이 시 찬바람'],
    ratings: { oil: 1, sensitivity: 1, scaling: 4 },
  },
  dry_clean_type: {
    title: '🧡 건성 깔끔형',
    description: '각질과 염증이 적지만 유분 부족\n수분이 많은 제품을 사용',
    // avoidIngredients: ['실리콘', '무거운 오일 성분'],
    // recommendedIngredients: [
    //   '알로에베라',
    //   '히알루론산',
    //   '아미노산계 계면활성제',
    // ],
    // tips: [
    //   '피지 조절에 포인트를 두어 마사지와 앰플 사용',
    //   '과한 드라이기 사용 자제',
    // ],
    ratings: { oil: 1, sensitivity: 1, scaling: 1 },
  },

  dry_trouble_type: {
    title: '🌸 건성 트러블형',
    description:
      '유분은 적고, 고각질의 민감한 두피\n진정과 비듬 케어가 필요합니다',
    // avoidIngredients: ['실리콘', '향료', '무거운 오일 성분'],
    // recommendedIngredients: ['알로에베라', '히알루론산'],
    // tips: [
    //   '뜨거운 물 X, 미지근한 물로 샴푸',
    //   '샴푸 후 두피 보습제 사용',
    //   '드라이 시 찬바람',
    // ],
    ratings: { oil: [1, 2], sensitivity: [3, 4], scaling: [3, 4] },
  },

  balanced_type: {
    title: '🗓️ 밸런스형',
    description: '균형 잡혀 있는 두피 타입.\n 지금처럼 유지해주세요.',
    // avoidIngredients: ['-'],
    // recommendedIngredients: ['비오틴', '케라틴', '콜라겐', '아르간오일'],
    // tips: ['현재 루틴 유지', '과도한 관리 피하기', '스트레스 관리'],
    ratings: { oil: 2, sensitivity: 1, scaling: 1 },
  },
}
