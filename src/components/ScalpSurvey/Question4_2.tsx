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
  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <ProgressBar step={4} />

      <h2 className="font-bold text-lg">
        정확한 두피 분석을 위해, <br />
        생활 습관을 알려주세요!
      </h2>

      <div>
        <p className="text-sm mb-2">하루 평균 수면 시간은 어느 정도인가요?</p>
        <div className="grid gap-2">
          {sleepHourOptions.map((opt) => {
            const enumValue = sleepHourMap[opt]
            return (
              <button
                key={opt}
                onClick={() => onChange('sleepDuration', enumValue)}
                className={`w-full py-2 rounded border ${
                  form.sleepDuration === enumValue
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="text-sm mb-2">평소 취침 시간은 언제인가요?</p>
        <div className="grid gap-2">
          {sleepTimeOptions.map((opt) => {
            const enumValue = sleepTimeMap[opt]
            return (
              <button
                key={opt}
                onClick={() => onChange('sleepStartTime', enumValue)}
                className={`w-full py-2 rounded border ${
                  form.sleepStartTime === enumValue
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex gap-4 pt-4 pb-28">
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
          제출하기
        </button>
      </div>
    </div>
  )
}

export default Question4_2
