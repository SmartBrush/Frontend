export interface MbtiCardInfo {
  type: string
  title: string
  description: string
  good: string
  bad: string
  icon: string
  color: string
}

export const mbtiCardList: MbtiCardInfo[] = [
  {
    type: 'oily_trouble',
    title: '🔥 트러블 폭풍형',
    icon: '🔍',
    color: 'bg-red-100',
    description:
      '과도한 유분, 고염증, 고각질로 인해 두피가 민감하고 비듬이 심해질 수 있어요.',
    good: '티트리오일, 살리실산, 녹차추출물 등의 진정 & 피지 조절 성분이 포함된 제품을 사용해보세요.',
    bad: '실리콘, 향료, 무거운 오일 성분은 피해주세요.',
  },
  {
    type: 'dry_trouble',
    title: '🌋 건조 트러블형',
    icon: '🔥',
    color: 'bg-orange-100',
    description:
      '과도한 유분, 고염증, 고각질로 인해 두피가 건조하고 비듬이 심해질 수 있어요.',
    good: '티트리오일, 살리실산, 녹차추출물 등의 진정 & 피지 조절 성분이 포함된 제품을 사용해보세요.',
    bad: '실리콘, 향료, 무거운 오일 성분은 피해 주세요.',
  },
  {
    type: 'oily_sensitive',
    title: '🌊 지성 민감형',
    icon: '🔥',
    color: 'bg-yellow-100',
    description:
      '과도한 피지와 민감한 두피로 인해 트러블이 자주 올라올 수 있어요.',
    good: '병풀, 시카, 캐모마일 등 자극을 완화하는 진정 성분을 챙겨주세요.',
    bad: '멘톨, 알코올, 합성향료는 오히려 자극이 될 수 있어요.',
  },
  {
    type: 'dry_sensitive',
    title: '❄️ 건조 비듬형',
    icon: '❄️',
    color: 'bg-green-100',
    description:
      '유분은 적고 각질이 두드러지는 두피예요. 비듬과 간지러움이 고민이시죠?',
    good: '살리실산, 징크피리치온, 티트리 성분이 들어간 비듬 케어 샴푸를 사용해보세요.',
    bad: '실리콘, 무거운 오일 성분은 비듬을 더 악화시킬 수 있어요.',
  },
  {
    type: 'balanced',
    title: '⚖️ 밸런스형',
    icon: '🌈',
    color: 'bg-gray-100',
    description: '두피 유분, 염증, 각질 상태가 전반적으로 균형 잡혀 있어요.',
    good: '비오틴, 케라틴, 콜라겐, 아르간오일로 영양을 더해주세요.',
    bad: '특별히 피해야 할 성분은 없지만, 자극적인 성분은 가급적 피해 주세요.',
  },
  {
    type: 'clean_oily',
    title: '💧 깔끔 지성형',
    icon: '💦',
    color: 'bg-blue-100',
    description:
      '피지 분비는 많지만 각질과 염증은 적어 상대적으로 깔끔한 두피예요.',
    good: '티트리, 녹차, 라벤더오일처럼 가벼운 지성 케어 성분이 좋아요.',
    bad: '과한 오일, 실리콘 계열은 피지가 더 늘어날 수 있어요.',
  },
  {
    type: 'dry_mild',
    title: '🌿 민감 건조형',
    icon: '🍃',
    color: 'bg-lime-100',
    description: '외부 자극에 약하고 쉽게 당기거나 따가운 두피예요.',
    good: '시카, 캐모마일, 알란토인 같은 민감성 진정 성분이 좋아요.',
    bad: '멘톨, 알코올, 향료는 피하고 저자극 제품을 선택해보세요.',
  },
  {
    type: 'oily_dandruff',
    title: '💥 지성 비듬형',
    icon: '💣',
    color: 'bg-teal-100',
    description:
      '유분은 많고 각질이 두드러지는 두피예요. 비듬과 간지러움이 고민이시죠?',
    good: '살리실산, 징크피리치온, 티트리 성분이 들어간 비듬 케어 샴푸를 사용해보세요.',
    bad: '실리콘, 무거운 오일 성분은 비듬을 더 악화시킬 수 있어요.',
  },
]
