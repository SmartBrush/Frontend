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
  // 유효성 검사: 선택한 값이 있어야 다음 가능
  const isValid = Boolean(form.washingFrequency)

  return (
    <div className="bg-white max-w-[360px] mx-auto px-5 pt-6">
      <ProgressBar step={2} />

      <h2 className="text-2xl font-extrabold leading-snug mt-6">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      <p className="text-m text-black font-semibold mt-6 mb-4">
        머리를 얼마나 자주 감으시나요?
      </p>

      <div className="grid gap-4">
        {options.map((opt) => {
          const enumValue = washingFrequencyMap[opt]
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange('washingFrequency', enumValue)}
              className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
                ${
                  form.washingFrequency === enumValue
                    ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                    : 'bg-white text-[#111] border-gray-300 hover:bg-gray-100'
                }`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-4 mt-21 mb-10">
        <button
          type="button"
          onClick={onPrev}
          className="w-full h-12 rounded-xl border border-gray-300 bg-[#E5E7EB] text-[#111] font-semibold transition-colors hover:bg-gray-200 active:bg-[#4E9366] active:text-white active:border-[#4E9366] cursor-pointer"
        >
          이전
        </button>
        <button
          type="button"
          onClick={() => {
            if (isValid) onNext()
          }}
          disabled={!isValid}
          aria-disabled={!isValid}
          title={isValid ? '' : '필수 항목을 먼저 선택해주세요.'}
          className={`w-full h-12 rounded-xl font-semibold border transition-colors
            ${
              isValid
                ? 'bg-[#4E9366] text-white border-[#4E9366] hover:bg-[#4B8F63] cursor-pointer'
                : 'bg-[#E5E7EB] text-[#111] border-gray-300 cursor-not-allowed'
            }`}
        >
          다음
        </button>
      </div>
    </div>
  )
}

export default Question2_2
