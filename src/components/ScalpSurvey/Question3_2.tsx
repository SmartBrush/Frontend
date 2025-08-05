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

    onChange?.('eatingHabits', updated)
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <ProgressBar step={3} />

      <h2 className="font-bold text-lg">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      <p className="text-sm mb-2">
        식습관에 해당하는 것을 골라주세요.{' '}
        <span className="text-xs text-gray-500">(복수 선택 가능)</span>
      </p>

      <div className="grid gap-2">
        {options.map((opt) => {
          const enumValue = eatingHabitMap[opt]
          return (
            <button
              key={opt}
              onClick={() => toggleOption(opt)}
              className={`w-full py-2 rounded border ${
                form.eatingHabits.includes(enumValue)
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

export default Question3_2
