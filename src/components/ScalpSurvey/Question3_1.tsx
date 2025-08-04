import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question3_1Props {
  form: SurveyForm
  onChange?: <K extends keyof SurveyForm>(
    field: K,
    value: SurveyForm[K],
  ) => void
  onToggle: (
    field: keyof SurveyForm,
    value: SurveyForm[keyof SurveyForm],
  ) => void
  onNext: () => void
  onPrev: () => void
}

const productMap: Record<string, string> = {
  샴푸: 'SHAMPOO',
  린스: 'RINSE',
  트리트먼트: 'TREATMENT',
  '두피 에센스': 'ESSENCE',
  '탈모 약물': 'HAIR_LOSS_MEDICINE',
  없음: 'NONE',
}

const options = Object.keys(productMap)

const Question3_1 = ({ form, onChange, onNext, onPrev }: Question3_1Props) => {
  const toggleOption = (option: string) => {
    const enumValue = productMap[option]

    let updated: string[]
    if (form.usingProducts.includes(enumValue)) {
      updated = form.usingProducts.filter((item) => item !== enumValue)
    } else {
      updated = [...form.usingProducts, enumValue]
    }

    // "없음" 선택 시 다른 항목 제거
    if (enumValue === 'NONE') {
      updated = ['NONE']
    } else {
      updated = updated.filter((item) => item !== 'NONE')
    }

    onChange?.('usingProducts', updated)
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <ProgressBar step={2.5} />

      <h2 className="font-bold text-lg">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      <p className="text-sm mb-2">
        어떤 제품을 사용 중인가요?{' '}
        <span className="text-gray-500 text-xs">(복수 선택 가능)</span>
      </p>

      <div className="grid gap-2">
        {options.map((opt) => {
          const enumValue = productMap[opt]
          return (
            <button
              key={opt}
              onClick={() => toggleOption(opt)}
              className={`w-full py-2 rounded border ${
                form.usingProducts.includes(enumValue)
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

export default Question3_1
