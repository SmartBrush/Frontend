import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question1_2Props {
  form: SurveyForm
  onChange: (field: keyof SurveyForm, value: string | boolean | null) => void
  onNext: () => void
  onPrev: () => void
}

const Question1_2 = ({ form, onChange, onNext, onPrev }: Question1_2Props) => {
  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <ProgressBar step={1} />

      <h2 className="font-bold text-lg">
        딱 맞는 케어를 위해, 기본 정보를 알려주세요!
      </h2>

      <div>
        <p className="text-sm mb-2">
          염색이나 파마를 하셨나요? (최근 6개월 이내)
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => onChange('dyedOrPermedRecently', true)}
            className={`flex-1 py-2 rounded border ${
              form.dyedOrPermedRecently === true
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            예
          </button>
          <button
            onClick={() => onChange('dyedOrPermedRecently', false)}
            className={`flex-1 py-2 rounded border ${
              form.dyedOrPermedRecently === false
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            아니오
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm mb-2">
          가족 중 탈모를 가지고 있는 사람이 있나요?
        </p>
        <div className="grid gap-2">
          <button
            onClick={() => onChange('familyHairLoss', 'EXISTS')}
            className={`w-full py-2 rounded border ${
              form.familyHairLoss === 'EXISTS'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            있음
          </button>
          <button
            onClick={() => onChange('familyHairLoss', 'NONE')}
            className={`w-full py-2 rounded border ${
              form.familyHairLoss === 'NONE'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            없음
          </button>
          <button
            onClick={() => onChange('familyHairLoss', 'UNKNOWN')}
            className={`w-full py-2 rounded border ${
              form.familyHairLoss === 'UNKNOWN'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            모름
          </button>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onPrev}
          className="bg-[#D1D1D1] text-black font-semibold w-full py-3 mt-6 rounded"
        >
          이전
        </button>
        <button
          onClick={onNext}
          className="bg-[#D1D1D1] text-black font-semibold w-full py-3 mt-6 rounded"
        >
          다음
        </button>
      </div>
    </div>
  )
}

export default Question1_2
