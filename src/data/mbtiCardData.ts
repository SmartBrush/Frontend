// export type MbtiCardKey =
//   | 'oily_trouble'
//   | 'dry_trouble'
//   | 'oily_sensitive'
//   | 'dry_sensitive'
//   | 'balanced'
//   | 'clean_oily'
//   | 'dry_mild'
//   | 'oily_dandruff'

// export interface MbtiCardInfo {
//   type: string
//   title: string
//   description: string
//   good: string
//   bad: string
// }

// export const mbtiCardList: MbtiCardInfo[] = [
//   {
//     type: 'oily_trouble',
//     title: '🔥 트러블 폭풍형',
//     description:
//       '과도한 유분, 고염증, 고각질로 인해 두피가 민감하고 비듬이 심해질 수 있어요.',
//     good: '티트리오일, 살리실산, 녹차추출물 등의 진정 & 피지 조절 성분이 포함된 제품을 사용해보세요.',
//     bad: '실리콘, 향료, 무거운 오일 성분은 피해주세요.',
//   },
//   {
//     type: 'dry_trouble',
//     title: '🌋 건조 트러블형',
//     description:
//       '과도한 유분, 고염증, 고각질로 인해 두피가 건조하고 비듬이 심해질 수 있어요.',
//     good: '티트리오일, 살리실산, 녹차추출물 등의 진정 & 피지 조절 성분이 포함된 제품을 사용해보세요.',
//     bad: '실리콘, 향료, 무거운 오일 성분은 피해 주세요.',
//   },
//   {
//     type: 'oily_sensitive',
//     title: '🌊 지성 민감형',
//     description:
//       '과도한 피지와 민감한 두피로 인해 트러블이 자주 올라올 수 있어요.',
//     good: '병풀, 시카, 캐모마일 등 자극을 완화하는 진정 성분을 챙겨주세요.',
//     bad: '멘톨, 알코올, 합성향료는 오히려 자극이 될 수 있어요.',
//   },
//   {
//     type: 'dry_sensitive',
//     title: '❄️ 건조 비듬형',
//     description:
//       '유분은 적고 각질이 두드러지는 두피예요. 비듬과 간지러움이 고민이시죠?',
//     good: '살리실산, 징크피리치온, 티트리 성분이 들어간 비듬 케어 샴푸를 사용해보세요.',
//     bad: '실리콘, 무거운 오일 성분은 비듬을 더 악화시킬 수 있어요.',
//   },
//   {
//     type: 'balanced',
//     title: '⚖️ 밸런스형',
//     description: '두피 유분, 염증, 각질 상태가 전반적으로 균형 잡혀 있어요.',
//     good: '비오틴, 케라틴, 콜라겐, 아르간오일로 영양을 더해주세요.',
//     bad: '특별히 피해야 할 성분은 없지만, 자극적인 성분은 가급적 피해 주세요.',
//   },
//   {
//     type: 'clean_oily',
//     title: '💧 깔끔 지성형',
//     description:
//       '피지 분비는 많지만 각질과 염증은 적어 상대적으로 깔끔한 두피예요.',
//     good: '티트리, 녹차, 라벤더오일처럼 가벼운 지성 케어 성분이 좋아요.',
//     bad: '과한 오일, 실리콘 계열은 피지가 더 늘어날 수 있어요.',
//   },
//   {
//     type: 'dry_mild',
//     title: '🌿 민감 건조형',
//     description: '외부 자극에 약하고 쉽게 당기거나 따가운 두피예요.',
//     good: '시카, 캐모마일, 알란토인 같은 민감성 진정 성분이 좋아요.',
//     bad: '멘톨, 알코올, 향료는 피하고 저자극 제품을 선택해보세요.',
//   },
//   {
//     type: 'oily_dandruff',
//     title: '💥 지성 비듬형',
//     description:
//       '유분은 많고 각질이 두드러지는 두피예요. 비듬과 간지러움이 고민이시죠?',
//     good: '살리실산, 징크피리치온, 티트리 성분이 들어간 비듬 케어 샴푸를 사용해보세요.',
//     bad: '실리콘, 무거운 오일 성분은 비듬을 더 악화시킬 수 있어요.',
//   },
// ]
export type MbtiCardKey =
  | 'oily_trouble' // 트러블 폭풍형
  | 'oily_sensitive' // 지성 민감형
  | 'oily_dandruff' // 지성 비듬형(= oily_scaling)
  | 'clean_oily' // 깔끔/깐깐 지성형
  | 'dry_trouble' // 건조 트러블형
  | 'dry_sensitive' // 민감 건조형
  | 'dry_scaling' // 건조 비듬형
  | 'balanced' // 밸런스형

export interface MbtiCardInfo {
  type: MbtiCardKey
  title: string
  description: string
  good: string
  bad: string
}

/** (참고용) 백엔드 라벨 → 카드 키 */
export const MBTI_KO_TO_KEY: Record<string, MbtiCardKey> = {
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

export const mbtiCardList: MbtiCardInfo[] = [
  {
    type: 'oily_trouble',
    title: '🔥 트러블 폭풍형',
    description:
      '과도한 유분, 고염증, 고각질로 인해 두피가 민감하고 비듬이 심해질 수 있어요.',
    good: '티트리오일, 살리실산, 녹차추출물 등 진정 & 피지 조절 성분이 포함된 제품을 사용해보세요.',
    bad: '실리콘, 향료, 무거운 오일 성분은 피해주세요.',
  },
  {
    type: 'oily_sensitive',
    title: '🌊 지성 민감형',
    description:
      '과도한 피지와 민감한 두피로 인해 트러블이 자주 올라올 수 있어요.',
    good: '병풀/시카, 캐모마일, 판테놀 등 자극을 완화하는 진정 성분을 챙겨주세요.',
    bad: '멘톨, 알코올, 합성향료는 오히려 자극이 될 수 있어요.',
  },
  {
    type: 'oily_dandruff',
    title: '💥 지성 비듬형',
    description:
      '유분은 많고 각질이 두드러지는 두피예요. 비듬과 간지러움이 고민이시죠?',
    good: '살리실산, 징크피리치온, 티트리 성분이 들어간 비듬 케어 샴푸를 사용해보세요.',
    bad: '실리콘, 무거운 오일 성분은 비듬을 더 악화시킬 수 있어요.',
  },
  {
    type: 'clean_oily',
    title: '💧 깔끔 지성형',
    description:
      '피지 분비는 많지만 각질과 염증은 적어 상대적으로 깔끔한 두피예요.',
    good: '티트리, 녹차, 라벤더오일처럼 가벼운 지성 케어 성분이 좋아요.',
    bad: '과한 오일, 실리콘 계열은 피지가 더 늘어날 수 있어요.',
  },
  {
    type: 'dry_trouble',
    title: '🌋 건조 트러블형',
    description:
      '유분은 보통이지만 염증/각질이 높아 건조 트러블과 비듬이 동반될 수 있어요.',
    good: '세라마이드, 판테놀, 오트밀 등 진정·보습 성분 위주로 케어하세요.',
    bad: '강력 세정, 강한 쿨링 제품은 자극이 될 수 있어요.',
  },
  {
    type: 'dry_sensitive',
    title: '🌿 민감 건조형',
    description: '외부 자극에 약하고 쉽게 당기거나 따가운 두피예요.',
    good: '시카/병풀, 캐모마일, 알란토인 등 저자극 진정·보습 성분이 좋아요.',
    bad: '멘톨, 알코올, 향료는 피하고 저자극 제품을 선택해보세요.',
  },
  {
    type: 'dry_scaling',
    title: '❄️ 건조 비듬형',
    description: '유분은 적고 각질이 두드러져 비듬과 간지러움이 동반돼요.',
    good: '징크피리치온, 피록톤올아민, 알로에베라 등 비듬/진정/보습 성분을 추천해요.',
    bad: '황산염, 에탄올, 강한 멘톨 계열은 자극을 줄 수 있어요.',
  },
  {
    type: 'balanced',
    title: '⚖️ 밸런스형',
    description:
      '수분/유분/자극도가 전반적으로 균형 잡힌 이상적인 컨디션이에요.',
    good: '비오틴, 케라틴, 아르간오일 등 영양을 가볍게 더해보세요.',
    bad: '특별히 피할 성분은 없지만 과한 관리나 자극적인 성분은 지양하세요.',
  },
]
