import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question3_2Props {
  form: SurveyForm
  onChange?: <K extends keyof SurveyForm>(
    field: K,
    value: SurveyForm[K],
  ) => void
  onToggle?: (field: keyof SurveyForm, value: string) => void
  onNext: () => void
  onPrev: () => void
}

const eatingHabitMap: Record<string, string> = {
  '규칙적인 식사를 한다': 'REGULAR_MEALS',
  '자극적인 음식을 자주 먹는다': 'SPICY_OR_STIMULATING',
  '인스턴트/배달 음식을 자주 먹는다': 'INSTANT_OR_DELIVERY',
  '육류 위주 식단이다': 'MEAT_HEAVY',
  '과일, 채소를 자주 섭취한다': 'FRUITS_AND_VEGETABLES',
}

const options = Object.keys(eatingHabitMap)

const Question3_2 = ({ form, onChange, onNext, onPrev }: Question3_2Props) => {
  const toggleOption = (option: string) => {
    const enumValue = eatingHabitMap[option]
    const updated = form.eatingHabits.includes(enumValue)
      ? form.eatingHabits.filter((item) => item !== enumValue)
      : [...form.eatingHabits, enumValue]
    onChange?.('eatingHabits', updated as SurveyForm['eatingHabits'])
  }

  // ✅ 최소 1개 선택해야 다음 가능
  const isValid = form.eatingHabits && form.eatingHabits.length > 0

  return (
    <div className="bg-white max-w-[360px] mx-auto px-5 pt-6">
      <ProgressBar step={3} />

      <h2 className="text-2xl font-extrabold leading-snug mt-6">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      <p className="text-m text-black font-semibold mt-6 mb-2">
        식습관에 해당하는 것을 골라주세요.{'\u00A0'}
        <span className="text-sm text-gray-500">(복수 선택 가능)</span>
      </p>

      <div className="grid gap-3">
        {options.map((opt) => {
          const enumValue = eatingHabitMap[opt]
          const selected = form.eatingHabits.includes(enumValue)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggleOption(opt)}
              className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
                ${
                  selected
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
      <div className="flex gap-4 mt-27 mb-10">
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
          title={isValid ? '' : '최소 1개 이상 선택해주세요.'}
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

export default Question3_2
