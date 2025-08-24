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
    let updated: string[]

    // 토글
    if (form.scalpSymptoms.includes(enumValue)) {
      updated = form.scalpSymptoms.filter((v) => v !== enumValue)
    } else {
      updated = [...form.scalpSymptoms, enumValue]
    }

    // 'NO_ISSUE'는 단독 선택
    if (enumValue === 'NO_ISSUE') {
      updated = updated.includes('NO_ISSUE') ? ['NO_ISSUE'] : []
    } else {
      updated = updated.filter((v) => v !== 'NO_ISSUE')
    }

    onChange('scalpSymptoms', updated)
  }

  // 최소 1개 선택해야 다음 가능
  const isValid = form.scalpSymptoms && form.scalpSymptoms.length > 0

  return (
    <div className="bg-white max-w-[360px] mx-auto px-5 pt-6">
      <ProgressBar step={3.5} />

      <h2 className="text-2xl font-extrabold leading-snug mt-6">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      <p className="text-m text-black font-semibold mt-6 mb-2">
        해당 되는 사항을 선택해주세요.{' '}
        <span className="text-sm text-gray-500">(복수 선택 가능)</span>
      </p>

      <div className="grid gap-3">
        {options.map((opt) => {
          const enumValue = scalpSymptomMap[opt]
          const selected = form.scalpSymptoms.includes(enumValue)
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
      <div className="flex gap-4 mt-12 mb-10">
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

export default Question4_1
