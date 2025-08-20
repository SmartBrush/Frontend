import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question1_1Props {
  form: SurveyForm
  onChange: <K extends keyof SurveyForm>(field: K, value: SurveyForm[K]) => void
  onNext: () => void
}

const Question1_1 = ({ form, onChange, onNext }: Question1_1Props) => {
  return (
    <div className="bg-white max-w-[360px] mx-auto px-5 pt-6">
      <div className="max-w-[360px] mx-auto w-full space-y-6">
        <ProgressBar step={0.5} />

        <h2 className="text-2xl font-extrabold leading-snug mt-6">
          딱 맞는 케어를 위해,
          <br /> 기본 정보를 알려주세요!
        </h2>

        <p className="text-m text-black font-semibold">
          성별과 나이를 입력해주세요.
        </p>

        {/* 성별 */}
        <div className="flex gap-4">
          <button
            onClick={() => onChange('gender', 'MALE')}
            className={`flex-1 h-12 rounded-xl border shadow-sm transition-colors
              ${
                form.gender === 'MALE'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            남자
          </button>
          <button
            onClick={() => onChange('gender', 'FEMALE')}
            className={`flex-1 h-12 rounded-xl border shadow-sm transition-colors
              ${
                form.gender === 'FEMALE'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            여자
          </button>
        </div>

        {/* 나이 */}
        <input
          type="number"
          inputMode="numeric"
          placeholder="나이"
          value={form.age === 0 ? '' : form.age}
          onChange={(e) => onChange('age', Number(e.target.value))}
          className="w-full h-12 rounded-xl bg-white border-2 border-gray-300 px-4 text-[#111] placeholder:text-[#9AA0A6]
                     focus:outline-none focus:ring-2 focus:ring-[#4E9366]"
        />

        <p className="text-m text-black font-semibold">
          현재 머리 길이를 선택해주세요.
        </p>

        {/* 머리 길이 */}
        <div className="grid gap-3">
          <button
            onClick={() => onChange('hairLength', 'SHORT')}
            className={`w-full h-12 rounded-xl border px-4 text-left shadow-sm transition-colors
              ${
                form.hairLength === 'SHORT'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            짧은 길이(어깨 위)
          </button>
          <button
            onClick={() => onChange('hairLength', 'MEDIUM')}
            className={`w-full h-12 rounded-xl border px-4 text-left shadow-sm transition-colors
              ${
                form.hairLength === 'MEDIUM'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            중간 길이(가슴 위)
          </button>
          <button
            onClick={() => onChange('hairLength', 'LONG')}
            className={`w-full h-12 rounded-xl border px-4 text-left shadow-sm transition-colors
              ${
                form.hairLength === 'LONG'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300'
              }`}
          >
            긴 머리
          </button>
        </div>

        {/* 다음 버튼 */}
        <div className="mt-4 mb-0">
          <button
            onClick={onNext}
            className="w-full h-12 rounded-xl bg-[#E5E7EB] text-[#111] font-semibold border border-gray-300 bg-[#E5E7EB] text-[#111] font-semibold transition-colors hover:bg-gray-200 active:bg-[#4E9366] active:text-white active:border-[#4E9366]"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}

export default Question1_1
