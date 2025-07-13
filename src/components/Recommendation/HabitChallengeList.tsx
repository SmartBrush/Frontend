// 습관 챌린지 카드 리스트
// 생활습관, 두피습관, 식습관&영양 -> 3개의 카테고리
// 각 카테고리 당 20개의 습관 text들을 랜덤으로 2개씩 노출

import { useEffect, useState } from 'react'

type CategoryKey = 'lifestyle' | 'scalpstyle' | 'nutritionstyle'

interface Category {
  id: CategoryKey
  label: string
  items: string[]
}

const categories: Category[] = [
  {
    id: 'lifestyle',
    label: '생활 습관',
    items: [
      '6-8시간 수면 유지',
      '물 2L 마시기',
      '스트레스 관리하기',
      '밤 11시 이전에 수면',
      '긴장 완화 루틴 만들기',
      '주 3회 이상 유산소 운동',
      '흡연 줄이기 or 금연',
      '음주 주 1회 이하',
      '모자 착용 시간 줄이기',
      '염색, 펌 자제',
      '스프레이 사용 최소화',
      '스마트폰 오래보기 줄이기',
      '자세 교정',
      '두피 자외선 차단',
      '고온, 건조 환경 피하기',
      '두피 긁기, 만지는 습관 x',
      '수건 세게 사용 금지',
      '두피 온도 관리',
      '정신적 피로 관리',
      '두피 상태 점검',
    ],
  },
  {
    id: 'scalpstyle',
    label: '두피 습관',
    items: [
      '미지근한 물로 샴푸',
      '손톱 대신 손끝으로 마사지',
      '샴푸는 하루 1회',
      '샴푸 3분 이상 헹구기',
      '두피 중심 샴푸, 모발은 거품만',
      '샴푸 전 빗질로 이물질 제거',
      '두피 스케일링은 주 1~2회',
      '트리트먼트는 모발에만',
      '드라이는 두피에서 15cm 거리 유지',
      '두피 건조 후 수분 토닉 사용',
      '드라이 전 열보호제 사용',
      '수건은 두드리듯 물기 제거',
      '머리 감은 후 즉시 건조',
      '땀 많이 흘린 날은 꼭 샴푸',
      '두피 전용 에센스 사용',
      '정기적으로 빗 세척 및 교체',
      '드라이 바람은 뜨거운 바람->찬 바람',
      '두피에 자극적인 제품 사용 자제',
      '주 1회 두피 마스크 or 팩하기',
      '두피 가려울 시 긁지 말고 냉찜질',
    ],
  },
  {
    id: 'nutritionstyle',
    label: '식습관&영양',
    items: [
      '하루 1회 단백질- 계란,생선 섭취',
      '철분- 간, 시금치, 굴 섭취',
      '아침 식사 거르지 않기',
      '비오틴(B7) 포함 식품 섭취',
      '아연-호박씨,굴,조개류 섭취',
      '오메가3-연어,고등어 섭취',
      '비타민c-귤,키위 섭취',
      '설탕 섭취 줄이기',
      '고지방/튀김류 줄이기',
      '물 하루 2L이상 마시기',
      '가공 식품 줄이기',
      '커피/카페인 음료 줄이기',
      '하루 3끼 균형잡힌 식사',
      '콜라겐-해조류 간헐적 섭취',
      '유산균 섭취로 장건강 유지',
      '비타민E-아보카도 섭취',
      '마그네슘-두부,바나나 섭취',
      '귀리 등 탈모 기능성 식품 고려',
      '패스트푸드 주 1회 이하',
      '술 대신 녹차나 허브차 섭취',
    ],
  },
]

// 배열에서 랜덤으로 count개 뽑기
function sample<T>(arr: T[], count: number): T[] {
  const _arr = [...arr]
  const result: T[] = []
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * _arr.length)
    result.push(_arr.splice(idx, 1)[0])
  }
  return result
}

const HabitChallengeList = () => {
  const [selection, setSelection] = useState<Record<CategoryKey, string[]>>({
    lifestyle: [],
    scalpstyle: [],
    nutritionstyle: [],
  })

  useEffect(() => {
    //마운트 시각에만 한 번 랜덤 추출
    const sel = {} as Record<CategoryKey, string[]>
    categories.forEach((cat) => {
      sel[cat.id] = sample(cat.items, 2)
    })
    setSelection(sel)
  }, [])

  if (!selection) return null //아직 로딩 중

  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2">{cat.label}</h3>
          {/* 랜덤으로 뽑힌 두 가지 텍스트*/}
          <ul className="text-sm mb-3 space-y-1">
            {selection[cat.id].map((text, i) => (
              <li key={i}>• {text}</li>
            ))}
          </ul>
          <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
            완료
          </button>
        </div>
      ))}
    </div>
  )
}
export default HabitChallengeList
