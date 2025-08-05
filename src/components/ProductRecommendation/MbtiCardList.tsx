import { mbtiCardList } from '../../data/mbtiCardData'

const MbtiCardList = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {mbtiCardList.map((card, idx) => (
        <div
          key={idx}
          className={`w-[300px] p-4 rounded-xl shadow ${card.color} space-y-2`}
        >
          <h3 className="text-base font-bold">
            {card.icon} {card.title}
          </h3>
          <p className="text-sm">{card.description}</p>
          <p className="text-sm">✅ {card.good}</p>
          <p className="text-sm text-red-600">❌ {card.bad}</p>
        </div>
      ))}
    </div>
  )
}

export default MbtiCardList
