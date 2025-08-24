import { mbtiCardList, type MbtiCardKey } from '../../data/mbtiCardData'

interface MbtiCardProps {
  mbtiType?: MbtiCardKey | null
}

const MbtiCardList = ({ mbtiType }: MbtiCardProps) => {
  if (!mbtiType) return null
  const card = mbtiCardList.find((c) => c.type === mbtiType)
  if (!card) return null

  return (
    <div className="relative mt-4">
      {/* 내용 박스 */}
      <div className="w-full rounded-xl border border-gray-200 bg-white px-5 py-5 pt-7 shadow-sm">
        <div className="text-sm text-gray-800 leading-6 whitespace-pre-line break-words space-y-2">
          {card.description && <p>{card.description}</p>}
          {card.good && (
            <p className="flex gap-2">
              <span>✅</span>
              <span className="break-words">{card.good}</span>
            </p>
          )}
          {card.bad && (
            <p className="flex gap-2">
              <span>❌</span>
              <span className="break-words">{card.bad}</span>
            </p>
          )}
        </div>
      </div>

      {/* MBTI pill */}
      <div className="absolute -top-3 left-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4E9366] text-white text-sm font-bold shadow">
        {card.title}
      </div>
    </div>
  )
}

export default MbtiCardList
