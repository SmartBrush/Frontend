import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question1_2Props {
  form: SurveyForm
  onChange: (field: keyof SurveyForm, value: string | boolean | null) => void
  onNext: () => void
  onPrev: () => void
}

const Question1_2 = ({ form, onChange, onNext, onPrev }: Question1_2Props) => {
  const isValid =
    typeof form.dyedOrPermedRecently === 'boolean' &&
    (form.familyHairLoss === 'EXISTS' ||
      form.familyHairLoss === 'NONE' ||
      form.familyHairLoss === 'UNKNOWN')

  return (
    <div className="bg-white max-w-[360px] mx-auto px-5 pt-6">
      <ProgressBar step={1} />

      <h2 className="text-2xl font-extrabold leading-snug mt-6">
        딱 맞는 케어를 위해,
        <br />
        기본 정보를 알려주세요!
      </h2>

      {/* 염색/파마 */}
      <div className="mt-6 space-y-3">
        <p className="text-m text-black font-semibold">
          염색이나 파마를 하셨나요?{' '}
          <span className="font-normal text-[#6b7280]">(최근 6개월 이내)</span>
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onChange('dyedOrPermedRecently', true)}
            className={`flex-1 h-12 rounded-xl border transition-colors cursor-pointer
              ${
                form.dyedOrPermedRecently === true
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            예
          </button>
          <button
            type="button"
            onClick={() => onChange('dyedOrPermedRecently', false)}
            className={`flex-1 h-12 rounded-xl border transition-colors cursor-pointer
              ${
                form.dyedOrPermedRecently === false
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            아니오
          </button>
        </div>
      </div>

      {/* 가족력 */}
      <div className="mt-15 space-y-3">
        <p className="text-m text-black font-semibold">
          가족 중 탈모를 가지고 있는 사람이 있나요?
        </p>

        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => onChange('familyHairLoss', 'EXISTS')}
            className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
              ${
                form.familyHairLoss === 'EXISTS'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            있음
          </button>
          <button
            type="button"
            onClick={() => onChange('familyHairLoss', 'NONE')}
            className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
              ${
                form.familyHairLoss === 'NONE'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            없음
          </button>
          <button
            type="button"
            onClick={() => onChange('familyHairLoss', 'UNKNOWN')}
            className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
              ${
                form.familyHairLoss === 'UNKNOWN'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            모름
          </button>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-4 mt-23 mb-10">
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

export default Question1_2
