import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question1_1Props {
  form: SurveyForm
  onChange: <K extends keyof SurveyForm>(field: K, value: SurveyForm[K]) => void
  onNext: () => void
}

const Question1_1 = ({ form, onChange, onNext }: Question1_1Props) => {
  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <ProgressBar step={0.5} />
      <h2 className="font-bold text-lg">
        딱 맞는 케어를 위해, 기본 정보를 알려주세요!
      </h2>

      <div className="flex gap-4">
        <button
          onClick={() => onChange('gender', 'MALE')}
          className={`flex-1 py-2 rounded border ${
            form.gender === 'MALE'
              ? 'bg-black text-white'
              : 'bg-white text-black'
          }`}
        >
          남자
        </button>
        <button
          onClick={() => onChange('gender', 'FEMALE')}
          className={`flex-1 py-2 rounded border ${
            form.gender === 'FEMALE'
              ? 'bg-black text-white'
              : 'bg-white text-black'
          }`}
        >
          여자
        </button>
      </div>

      <input
        type="number"
        inputMode="numeric"
        placeholder="나이"
        value={form.age === 0 ? '' : form.age}
        onChange={(e) => onChange('age', Number(e.target.value))}
        className="w-full border rounded py-2 px-3 mt-2"
      />

      <div className="grid gap-2">
        <button
          onClick={() => onChange('hairLength', 'SHORT')}
          className={`w-full py-2 rounded border ${
            form.hairLength === 'SHORT'
              ? 'bg-black text-white'
              : 'bg-white text-black'
          }`}
        >
          짧은 길이(어깨 위)
        </button>
        <button
          onClick={() => onChange('hairLength', 'MEDIUM')}
          className={`w-full py-2 rounded border ${
            form.hairLength === 'MEDIUM'
              ? 'bg-black text-white'
              : 'bg-white text-black'
          }`}
        >
          중간 길이(가슴 위)
        </button>
        <button
          onClick={() => onChange('hairLength', 'LONG')}
          className={`w-full py-2 rounded border ${
            form.hairLength === 'LONG'
              ? 'bg-black text-white'
              : 'bg-white text-black'
          }`}
        >
          긴 머리
        </button>
      </div>

      <button
        onClick={onNext}
        className="bg-[#D1D1D1] text-black font-semibold w-full py-3 mt-6 rounded"
      >
        다음
      </button>
    </div>
  )
}

export default Question1_1
