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

    // "없음"은 단독 선택
    if (enumValue === 'NONE') {
      updated = ['NONE']
    } else {
      updated = updated.filter((item) => item !== 'NONE')
    }

    onChange?.('usingProducts', updated as SurveyForm['usingProducts'])
  }

  // 최소 1개 선택해야 다음 가능
  const isValid = form.usingProducts && form.usingProducts.length > 0

  return (
    <div className="bg-white max-w-[360px] mx-auto px-5 pt-6">
      <ProgressBar step={2.5} />

      <h2 className="text-2xl font-extrabold leading-snug mt-6">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      <p className="text-m text-black font-semibold mt-6 mb-2">
        어떤 제품을 사용 중인가요?{' '}
        <span className="text-gray-500 text-sm">(복수 선택 가능)</span>
      </p>

      <div className="grid gap-3">
        {options.map((opt) => {
          const enumValue = productMap[opt]
          const selected = form.usingProducts.includes(enumValue)
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

export default Question3_1
