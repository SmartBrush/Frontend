import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question4_1Props {
  form: SurveyForm
  onChange: (field: keyof SurveyForm, value: string[]) => void
  onNext: () => void
  onPrev: () => void
}

// 자연어 → enum 매핑
const scalpSymptomMap: Record<string, string> = {
  '두피가 건조한 편이에요': 'DRY_SCALP',
  '오후가 되면 기름기가 느껴져요': 'OILY_IN_AFTERNOON',
  '하루 종일 기름져요': 'OILY_ALL_DAY',
  '붉은기, 뾰루지 등 트러블이 자주 생겨요': 'FREQUENT_TROUBLES',
  '가렵거나 비듬이 자주 생겨요': 'ITCHY_OR_DANDRUFF',
  '특별히 불편한 점이 없어요': 'NO_ISSUE',
}

const options = Object.keys(scalpSymptomMap)

const Question4_1 = ({ form, onChange, onNext, onPrev }: Question4_1Props) => {
  const toggleOption = (option: string) => {
    const enumValue = scalpSymptomMap[option]

    const updated = form.scalpSymptoms.includes(enumValue)
      ? form.scalpSymptoms.filter((item) => item !== enumValue)
      : [...form.scalpSymptoms, enumValue]

    onChange('scalpSymptoms', updated)
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <ProgressBar step={3.5} />

      <h2 className="font-bold text-lg">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      <p className="text-sm mb-2">
        해당 되는 사항을 선택해주세요.{' '}
        <span className="text-xs text-gray-500">(복수 선택 가능)</span>
      </p>

      <div className="grid gap-2">
        {options.map((opt) => {
          const enumValue = scalpSymptomMap[opt]
          return (
            <button
              key={opt}
              onClick={() => toggleOption(opt)}
              className={`w-full py-2 rounded border ${
                form.scalpSymptoms.includes(enumValue)
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <div className="flex gap-4">
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

export default Question4_1
