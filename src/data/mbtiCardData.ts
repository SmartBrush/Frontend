export type MbtiCardKey =
  | 'oily_sensitive' // 지성 민감형
  | 'oily_scaling' // 지성 비듬형
  | 'oily_clean' // 지성 깔끔형
  | 'oily_trouble' // 지성 트러블형
  | 'dry_sensitive' // 건성 민감형
  | 'dry_scaling' // 건성 비듬형
  | 'dry_clean' //건성 깔끔형
  | 'dry_trouble' // 건성 트러블형
  | 'balanced' // 밸런스형

export interface MbtiCardInfo {
  type: MbtiCardKey
  title: string
  good: string
  bad: string
  tips: string
}

export const MBTI_KO_TO_KEY: Record<string, MbtiCardKey> = {
  '지성 민감형': 'oily_sensitive',
  '지성 비듬형': 'oily_scaling',
  '지성 깔끔형': 'oily_clean',
  '지성 트러블형': 'oily_trouble',
  '건성 민감형': 'dry_sensitive',
  '건성 비듬형': 'dry_scaling',
  '건성 깔끔형': 'dry_clean',
  '건성 트러블형': 'dry_trouble',
  밸런스형: 'balanced',
}

export const mbtiCardList: MbtiCardInfo[] = [
  {
    type: 'oily_sensitive',
    title: '🚨 지성 민감형',
    good: '티트리 오일, 녹차 추출물 등 피지 조절 성분\n카모마일, 판테놀 등 진정 효과가 있는 성분',
    bad: '멘톨, 알코올, 합성향료 등 자극 유발 성분',
    tips: '혈행이 원활하도록 목의 근육을 풀어주고\n두피를 진정시킬 수 있는\n저자극성 샴푸 사용이 필요합니다.',
  },
  {
    type: 'oily_scaling',
    title: '💧 지성 비듬형',
    good: '티트리 오일, 녹차 추출물 등 피지 조절 성분\n살리실산, 레조르신 등 각질 용해 성분',
    bad: '실리콘, 무거운 오일 성분',
    tips: '약알칼리성 샴푸나 향진균제 비듬 샴푸 사용을\n권장합니다. 지성 비듬형은 청결이 중요하며,\n뜨거운 물이나 바람도 두피의 유분율을 촉진하므로 주의해야 합니다.',
  },

  {
    type: 'oily_clean',
    title: '🫧 지성 깔끔형',
    good: '티트리 오일, 녹차 추출물 등 피지 조절 성분\n라벤더 오일 등 가벼운 식물성 오일',
    bad: '과한 오일, 실리콘 계열',
    tips: '샴푸 전에 브러싱을 통해 노폐물을 제거하고 혈행을 촉진시키는 것이 중요합니다. 또한 지성 샴푸를 사용하여 세정 후 가볍게 두피와 모발을 말려주세요.',
  },
  {
    type: 'oily_trouble',
    title: '🔥 지성 트러블형',
    good: '실리콘, 미네랄오일, 합성향료',
    bad: '실리콘, 향료, 무거운 오일 성분은 피해주세요.',
    tips: '살균, 세정에 신경을 쓰는 것이 중요합니다.\n지나치게 자극적인 제품으로 샴푸를 하게 되면\n피지선에 악영향을 끼치므로, 저자극성 샴푸를\n사용하세요.',
  },
  {
    type: 'dry_sensitive',
    title: '🍀 건성 민감형',
    good: ' 알로에베라, 히알루론산 등 보습 성분\n카모마일, 판테놀 등 진정 효과가 있는 성분',
    bad: '멘톨, 알코올, 합성향료 등 자극 유발 성분',
    tips: '과다한 스타일링제의 접촉은 피하고, 모발 건조 시 드라이기 이용이나 사우나 등을 피하는 것이\n좋습니다.',
  },
  {
    type: 'dry_scaling',
    title: '❄️ 건성 비듬형',
    good: ' 알로에베라, 히알루론산 등 보습 성분\n살리실산, 레조르신 등 각질 용해 성분',
    bad: '실리콘',
    tips: '유분이 많은 트리트먼트를 사용해서 유수분을\n보충하고 건조를 방지하는 관리가 필요합니다.\n약산성 샴푸나 향진균제 샴푸를 사용하세요.',
  },
  {
    type: 'dry_clean',
    title: '🧡 건성 깔끔형',
    good: '알로에베라, 히알루론산 등 보습 성분\n가벼운 아미노산계 계면활성제',
    bad: '실리콘, 무거운 오일 성분',
    tips: '피지 조절에 포인트를 두어 마사지와 앰플을\n사용하고, 드라이기의 과도한 열사용을 자제하는\n것이 중요합니다.',
  },
  {
    type: 'dry_trouble',
    title: '🌸 건성 트러블형',
    good: '알로에베라, 히알루론산 등 보습 성분',
    bad: ' 실리콘, 향료, 무거운 오일 성분',
    tips: '오래된 각질 및 비듬의 제거와 피지분비가 원활하게\n이루어지도록 일반 샴푸보다는 보습성이 함유된\n샴푸 사용을 권장합니다.',
  },

  {
    type: 'balanced',
    title: '🗓️ 밸런스형',
    good: '비오틴, 케라틴, 콜라겐, 아르간오일',
    bad: '특별히 피해야 할 성분은 없지만,\n자극적인 성분은 가급적 피해주세요.',
    tips: '현상태를 유지할 수 있도록 각질제거, 유수분\n밸런스 유지에 중점을 둔 관리가 필요합니다.',
  },
]
