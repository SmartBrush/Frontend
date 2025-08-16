// // 습관 챌린지 카드 리스트
// // 생활습관, 두피습관, 식습관&영양 -> 3개의 카테고리
// // 각 카테고리 당 20개의 습관 text들을 랜덤으로 2개씩 노출

// import { useEffect, useState } from 'react'
// import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'
// // import { Upload } from 'lucide-react'

// type CategoryKey = 'lifestyle' | 'scalpstyle' | 'nutritionstyle'

// interface Category {
//   id: CategoryKey
//   label: string
//   emoji: string
//   items: string[]
// }

// interface HabitChallengeListProps {
//   onComplete: () => void
// }

// const categories: Category[] = [
//   {
//     id: 'lifestyle',
//     label: '생활 습관',
//     emoji: '💡',
//     items: [
//       '6-8시간 수면 유지',
//       '물 2L 마시기',
//       '스트레스 관리하기',
//       '밤 11시 이전에 수면',
//       '긴장 완화 루틴 만들기',
//       '주 3회 이상 유산소 운동',
//       '흡연 줄이기 or 금연',
//       '음주 주 1회 이하',
//       '모자 착용 시간 줄이기',
//       '염색, 펌 자제',
//       '스프레이 사용 최소화',
//       '스마트폰 오래보기 줄이기',
//       '자세 교정',
//       '두피 자외선 차단',
//       '고온, 건조 환경 피하기',
//       '두피 긁기, 만지는 습관 x',
//       '수건 세게 사용 금지',
//       '두피 온도 관리',
//       '정신적 피로 관리',
//       '두피 상태 점검',
//     ],
//   },
//   {
//     id: 'scalpstyle',
//     label: '두피 습관',
//     emoji: '💇‍♀️',
//     items: [
//       '미지근한 물로 샴푸',
//       '손톱 대신 손끝으로 마사지',
//       '샴푸는 하루 1회',
//       '샴푸 3분 이상 헹구기',
//       '두피 중심 샴푸, 모발은 거품만',
//       '샴푸 전 빗질로 이물질 제거',
//       '두피 스케일링은 주 1~2회',
//       '트리트먼트는 모발에만',
//       '드라이는 두피에서 15cm 거리 유지',
//       '두피 건조 후 수분 토닉 사용',
//       '드라이 전 열보호제 사용',
//       '수건은 두드리듯 물기 제거',
//       '머리 감은 후 즉시 건조',
//       '땀 많이 흘린 날은 꼭 샴푸',
//       '두피 전용 에센스 사용',
//       '정기적으로 빗 세척 및 교체',
//       '드라이 바람은 뜨거운 바람->찬 바람',
//       '두피에 자극적인 제품 사용 자제',
//       '주 1회 두피 마스크 or 팩하기',
//       '두피 가려울 시 긁지 말고 냉찜질',
//     ],
//   },
//   {
//     id: 'nutritionstyle',
//     label: '식습관&영양',
//     emoji: '🍽️',
//     items: [
//       '하루 1회 단백질- 계란,생선 섭취',
//       '철분- 간, 시금치, 굴 섭취',
//       '아침 식사 거르지 않기',
//       '비오틴(B7) 포함 식품 섭취',
//       '아연-호박씨,굴,조개류 섭취',
//       '오메가3-연어,고등어 섭취',
//       '비타민c-귤,키위 섭취',
//       '설탕 섭취 줄이기',
//       '고지방/튀김류 줄이기',
//       '물 하루 2L이상 마시기',
//       '가공 식품 줄이기',
//       '커피/카페인 음료 줄이기',
//       '하루 3끼 균형잡힌 식사',
//       '콜라겐-해조류 간헐적 섭취',
//       '유산균 섭취로 장건강 유지',
//       '비타민E-아보카도 섭취',
//       '마그네슘-두부,바나나 섭취',
//       '귀리 등 탈모 기능성 식품 고려',
//       '패스트푸드 주 1회 이하',
//       '술 대신 녹차나 허브차 섭취',
//     ],
//   },
// ]

// // 배열에서 랜덤으로 count개 뽑기
// function sample<T>(arr: T[], count: number): T[] {
//   const _arr = [...arr]
//   const result: T[] = []
//   for (let i = 0; i < count; i++) {
//     const idx = Math.floor(Math.random() * _arr.length)
//     result.push(_arr.splice(idx, 1)[0])
//   }
//   return result
// }

// const HabitChallengeList = ({ onComplete }: HabitChallengeListProps) => {
//   const [checked, setChecked] = useState<Record<string, boolean>>({})

//   const [selection, setSelection] = useState<Record<CategoryKey, string[]>>({
//     lifestyle: [],
//     scalpstyle: [],
//     nutritionstyle: [],
//   })

//   useEffect(() => {
//     //마운트 시각에만 한 번 랜덤 추출
//     const sel = {} as Record<CategoryKey, string[]>
//     categories.forEach((cat) => {
//       sel[cat.id] = sample(cat.items, 2)
//     })
//     setSelection(sel)
//   }, [])

//   const toggleCheck = (text: string) => {
//     const updated = { ...checked, [text]: !checked[text] }
//     setChecked(updated)

//     // 전체 선택된 습관 배열
//     const allSelectedTexts = Object.values(selection).flat()

//     //모든 항목이 true인지 확인
//     const allChecked = allSelectedTexts.every((t) => updated[t])

//     if (allChecked) {
//       onComplete()
//     }
//   }

//   if (!selection) return null //아직 로딩 중

//   return (
//     <div className="relative bg-white p-4 rounded-xl space-y-4  border border-black">
//       <h2 className="text-sm font-bold text-orange-500">🗓️ 습관 챌린지</h2>

//       {categories.map((cat) => (
//         <div
//           key={cat.id}
//           className="bg-white rounded-xl shadow px-4 py-3 space-y-2  border border-black"
//         >
//           <h3 className="text-sm font-semibold">
//             {cat.emoji}
//             {cat.label}
//           </h3>
//           {selection[cat.id].map((text, i) => (
//             <div
//               key={i}
//               className="flex items-center justify-between rounded-lg px-3 py-1"
//             >
//               <div className="text-sm leading-snug">
//                 <div>{text}</div>
//               </div>
//               <button onClick={() => toggleCheck(text)}>
//                 {checked[text] ? (
//                   <FaCheckSquare className="text-green-500" />
//                 ) : (
//                   <FaRegSquare className="text-gray-400" />
//                 )}
//               </button>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   )
// }
// export default HabitChallengeList

import { useEffect, useMemo, useState } from 'react'
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'
import {
  fetchTodayHabits,
  toggleHabit,
  type DailyHabitItemDTO,
  type DailyHabitResponseDTO,
  type HabitCategory,
} from '../../apis/habits'

interface HabitChallengeListProps {
  onComplete: () => void
}

const LABELS: Record<HabitCategory, string> = {
  LIFESTYLE: '생활 습관',
  SCALP: '두피 습관',
  NUTRITION: '식습관&영양',
}

const ORDER: HabitCategory[] = ['LIFESTYLE', 'SCALP', 'NUTRITION']

const HabitChallengeList = ({ onComplete }: HabitChallengeListProps) => {
  const [data, setData] = useState<DailyHabitResponseDTO | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetchTodayHabits()
        if (!mounted) return
        setData(res)
      } catch (e) {
        console.log(e)
        setError('습관 목록을 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const allItems = useMemo(() => {
    if (!data) return [] as DailyHabitItemDTO[]
    return ORDER.flatMap((cat) => data.itemsByCategory[cat] ?? [])
  }, [data])

  const allChecked = allItems.length > 0 && allItems.every((it) => it.completed)

  useEffect(() => {
    if (allChecked) onComplete()
  }, [allChecked, onComplete])

  const onToggle = async (item: DailyHabitItemDTO) => {
    if (!data) return
    // 낙관적 업데이트
    const prev = data
    const next: DailyHabitResponseDTO = {
      ...data,
      itemsByCategory: {
        ...data.itemsByCategory,
        [item.category]: data.itemsByCategory[item.category].map((it) =>
          it.id === item.id ? { ...it, completed: !it.completed } : it,
        ),
      },
    }
    setData(next)
    setSavingId(item.id)
    try {
      await toggleHabit(item.id) // 서버에서 토글
    } catch {
      // 실패 시 롤백
      setData(prev)
    } finally {
      setSavingId(null)
    }
  }

  if (loading) {
    return (
      <div className="relative bg-white p-4 rounded-xl border">
        <p className="text-sm">불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative bg-white p-4 rounded-xl border">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="relative bg-white p-4 rounded-xl space-y-4 border">
      <h2 className="text-sm font-bold text-orange-500">습관 챌린지</h2>

      {ORDER.map((cat) => {
        const items = data.itemsByCategory[cat] ?? []
        return (
          <div
            key={cat}
            className="bg-white rounded-xl shadow px-4 py-3 space-y-2 border"
          >
            <h3 className="text-sm font-semibold">{LABELS[cat]}</h3>

            {items.map((it) => (
              <div
                key={it.id}
                className="flex items-center justify-between rounded-lg px-3 py-1"
              >
                <div className="text-sm leading-snug">
                  <div>{it.itemText}</div>
                </div>
                <button
                  onClick={() => onToggle(it)}
                  disabled={savingId === it.id}
                  aria-label="toggle-completed"
                >
                  {it.completed ? (
                    <FaCheckSquare className="text-green-500" />
                  ) : (
                    <FaRegSquare className="text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default HabitChallengeList
