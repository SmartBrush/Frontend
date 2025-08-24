import type { ScalpMbtiType } from '../../types/scalp-mbti'
import BarChart from './BarChart'
import { mbtiData } from '../../data/mbtiData'

interface ScalpMbtiCardProps {
  /** 서버/부모에서 내려주는 진단 타입. 진단 전이면 null/undefined 로 넘겨주세요. */
  mbtiType?: ScalpMbtiType | null
  /** 상단에 보여줄 사용자명 */
  displayName: string
  /** (선택) 진단 완료 여부를 부모가 명시적으로 제어하고 싶을 때 */
  diagnosed?: boolean
  /** (선택) 진단하기 버튼을 쓸 경우 콜백 (없으면 버튼 안 보여줌) */
  onClickDiagnose?: () => void
}

const DIAG_FLAG_KEY = 'scalp_diagnosed'

const ScalpMbtiCard = ({
  mbtiType,
  displayName,
  diagnosed,
  onClickDiagnose,
}: ScalpMbtiCardProps) => {
  // 부모가 diagnosed를 내려주면 그걸 우선, 없으면 로컬스토리지 플래그 사용
  const isDiagnosed =
    typeof diagnosed === 'boolean'
      ? diagnosed
      : typeof window !== 'undefined' &&
        localStorage.getItem(DIAG_FLAG_KEY) === '1'

  // 진단 전 / 타입 없음 → 안내 카드
  if (!isDiagnosed || !mbtiType) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
        <p className="text-sm font-semibold text-gray-800">
          {displayName}님의 두피 MBTI
        </p>
        <p className="mt-1 text-sm">두피 MBTI가 아직 없습니다!</p>
        {onClickDiagnose && (
          <button
            type="button"
            onClick={onClickDiagnose}
            className="mt-3 px-3 py-2 rounded-lg bg-[#4E9366] text-white text-sm font-bold"
          >
            사진으로 진단하기
          </button>
        )}
      </div>
    )
  }

  // 타입 존재 시 데이터 조회 (안전 가드)
  const info = mbtiData[mbtiType]
  if (!info) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
        <p className="text-sm font-semibold text-gray-800">
          {displayName}님의 두피 MBTI
        </p>
        <p className="mt-1 text-sm text-red-600">
          알 수 없는 MBTI 타입입니다. 다시 시도해 주세요.
        </p>
      </div>
    )
  }

  const { title, description, radarValues } = info

  return (
    <div
      className="bg-white p-4 rounded-2xl shadow flex items-center justify-between border border-black"
      data-mbti-block
    >
      <div className="flex-1 space-y-1">
        <p className="text-sm text-orange-600 font-semibold">
          🔥 {displayName}님의 두피 MBTI
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
      <div className="w-24">
        <BarChart data={radarValues.slice(0, 5)} />
      </div>
    </div>
  )
}

export default ScalpMbtiCard
