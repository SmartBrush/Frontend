import type { ScalpMbtiType } from '../../types/scalp'
import BarChart from './BarChart'
import { mbtiData } from '../../data/mbtiData'

interface scalpMbtiCardProps {
  mbtiType: ScalpMbtiType
}

const ScalpMbtiCard = ({ mbtiType }: scalpMbtiCardProps) => {
  const { title, description, radarValues } = mbtiData[mbtiType]

  return (
    <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between  border border-black">
      {/* 좌측 텍스트 영역 */}
      <div className="flex-1 space-y-1">
        <p className="text-sm text-orange-600 font-semibold">
          🔥 김도영님의 두피 MBTI
        </p>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <div>
          {description.split('\n').map((line, i) => (
            <p key={i} className="text-sm">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* 우측 간단 그래프 (아이콘처럼 축소) */}
      <div className="w-24">
        <BarChart data={radarValues.slice(0, 5)} />
      </div>
    </div>
  )
}
export default ScalpMbtiCard
