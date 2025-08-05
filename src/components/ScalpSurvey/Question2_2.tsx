import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question2_2Props {
  form: SurveyForm
  onChange: (
    field: keyof SurveyForm,
    value: SurveyForm[keyof SurveyForm],
  ) => void
  onNext: () => void
  onPrev: () => void
}

const washingFrequencyMap: Record<string, string> = {
  '하루에 2번 이상': 'TWICE_OR_MORE_PER_DAY',
  '하루에 1번': 'ONCE_PER_DAY',
  '이틀에 1번': 'EVERY_TWO_DAYS',
  '사흘에 1번': 'EVERY_THREE_DAYS',
  '일주일에 1-2번': 'ONE_TO_TWO_PER_WEEK',
}

const options = Object.keys(washingFrequencyMap)

const Question2_2 = ({ form, onChange, onNext, onPrev }: Question2_2Props) => {
  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <ProgressBar step={2} />
      <h2 className="font-bold text-lg">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      <p className="text-sm mb-2">머리를 얼마나 자주 감으시나요?</p>

      <div className="grid gap-2">
        {options.map((opt) => {
          const enumValue = washingFrequencyMap[opt]
          return (
            <button
              key={opt}
              onClick={() => onChange('washingFrequency', enumValue)}
              className={`w-full py-2 rounded border ${
                form.washingFrequency === enumValue
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              }`}
            >
              {opt}
            </button>
          )
        })}
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

export default Question2_2
