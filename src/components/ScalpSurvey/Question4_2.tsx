import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question4_2Props {
  form: SurveyForm
  onChange: (field: keyof SurveyForm, value: string) => void
  onNext: () => void
  onPrev: () => void
}

const sleepHourMap: Record<string, string> = {
  '4시간 이하': 'UNDER_4_HOURS',
  '5~6시간': 'BETWEEN_5_AND_6_HOURS',
  '7~8시간': 'BETWEEN_7_AND_8_HOURS',
  '9시간 이상': 'OVER_9_HOURS',
}

const sleepTimeMap: Record<string, string> = {
  '오전 12시 이전': 'BEFORE_MIDNIGHT',
  '오전 1시 이후': 'AFTER_1AM',
}

const sleepHourOptions = ['4시간 이하', '5~6시간', '7~8시간', '9시간 이상']
const sleepTimeOptions = ['오전 12시 이전', '오전 1시 이후']

const Question4_2 = ({ form, onChange, onNext, onPrev }: Question4_2Props) => {
  // 둘 다 선택해야 제출 가능
  const isValid = Boolean(form.sleepDuration) && Boolean(form.sleepStartTime)

  return (
    <div className="bg-white max-w-[360px] mx-auto px-5 pt-6">
      <ProgressBar step={4} />

      <h2 className="text-2xl font-extrabold leading-snug mt-6">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      {/* 수면 시간 */}
      <div className="mt-6">
        <p className="text-m text-black font-semibold mb-2">
          하루 평균 수면 시간은 어느 정도인가요?
        </p>
        <div className="grid gap-3">
          {sleepHourOptions.map((opt) => {
            const enumValue = sleepHourMap[opt]
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange('sleepDuration', enumValue)}
                className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
                  ${
                    form.sleepDuration === enumValue
                      ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                      : 'bg-white text-[#111] border-gray-300 hover:bg-gray-100'
                  }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      {/* 취침 시간 */}
      <div className="mt-6">
        <p className="text-m text-black font-semibold mb-2">
          평소 취침 시간은 언제인가요?
        </p>
        <div className="grid gap-3">
          {sleepTimeOptions.map((opt) => {
            const enumValue = sleepTimeMap[opt]
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange('sleepStartTime', enumValue)}
                className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
                  ${
                    form.sleepStartTime === enumValue
                      ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                      : 'bg-white text-[#111] border-gray-300 hover:bg-gray-100'
                  }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-4 mt-8 mb-1">
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
          title={isValid ? '' : '수면 시간과 취침 시간을 선택해주세요.'}
          className={`w-full h-12 rounded-xl font-semibold border transition-colors
            ${
              isValid
                ? 'bg-[#4E9366] text-white border-[#4E9366] hover:bg-[#4B8F63] cursor-pointer'
                : 'bg-[#E5E7EB] text-[#111] border-gray-300 cursor-not-allowed'
            }`}
        >
          제출하기
        </button>
      </div>
    </div>
  )
}

export default Question4_2
