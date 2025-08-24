import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question2_1Props {
  form: SurveyForm
  onChange: <K extends keyof SurveyForm>(field: K, value: SurveyForm[K]) => void
  onNext: () => void
  onPrev: () => void
}

const Question2_1 = ({ form, onChange, onNext, onPrev }: Question2_1Props) => {
  const isValid =
    typeof form.wearHatFrequently === 'boolean' &&
    (form.uvExposureLevel === 'FREQUENT_OUTDOOR' ||
      form.uvExposureLevel === 'NORMAL' ||
      form.uvExposureLevel === 'MOSTLY_INDOOR')

  return (
    <div className="bg-white max-w-[360px] mx-auto px-5 pt-6">
      <ProgressBar step={1.5} />

      <h2 className="text-2xl font-extrabold leading-snug mt-6">
        딱 맞는 케어를 위해,
        <br />
        기본 정보를 알려주세요!
      </h2>

      {/* 모자 착용 여부 */}
      <div className="mt-6 space-y-3">
        <p className="text-m text-black font-semibold">
          평소에 모자를 자주 착용하시나요?
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onChange('wearHatFrequently', true)}
            className={`flex-1 h-12 rounded-xl border transition-colors cursor-pointer
              ${
                form.wearHatFrequently === true
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300 hover:bg-gray-100'
              }`}
          >
            예
          </button>
          <button
            type="button"
            onClick={() => onChange('wearHatFrequently', false)}
            className={`flex-1 h-12 rounded-xl border transition-colors cursor-pointer
              ${
                form.wearHatFrequently === false
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300 hover:bg-gray-100'
              }`}
          >
            아니오
          </button>
        </div>
      </div>

      {/* 자외선 노출 정도 */}
      <div className="mt-10 space-y-3">
        <p className="text-m text-black font-semibold">
          평소 자외선에 노출되는 시간이 많은가요?
        </p>
        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => onChange('uvExposureLevel', 'FREQUENT_OUTDOOR')}
            className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
              ${
                form.uvExposureLevel === 'FREQUENT_OUTDOOR'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300 hover:bg-gray-100'
              }`}
          >
            실외활동 잦음 (일주일에 4번 이상 외출)
          </button>
          <button
            type="button"
            onClick={() => onChange('uvExposureLevel', 'NORMAL')}
            className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
              ${
                form.uvExposureLevel === 'NORMAL'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300 hover:bg-gray-100'
              }`}
          >
            보통 (일주일에 2~3번 외출)
          </button>
          <button
            type="button"
            onClick={() => onChange('uvExposureLevel', 'MOSTLY_INDOOR')}
            className={`w-full h-12 rounded-xl border px-4 text-left transition-colors cursor-pointer
              ${
                form.uvExposureLevel === 'MOSTLY_INDOOR'
                  ? 'bg-[#4E9366] text-white border-[#4E9366] font-semibold'
                  : 'bg-white text-[#111] border-gray-300 hover:bg-gray-100'
              }`}
          >
            실내 위주 생활 (일주일에 1번 이하 외출)
          </button>
        </div>
      </div>

      {/* 이전/다음 버튼 */}
      <div className="flex gap-4 mt-25 mb-10">
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

export default Question2_1
