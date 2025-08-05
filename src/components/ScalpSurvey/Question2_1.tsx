import type { SurveyForm } from './SurveyForm'
import ProgressBar from './ProgressBar'

interface Question2_1Props {
  form: SurveyForm
  onChange: <K extends keyof SurveyForm>(field: K, value: SurveyForm[K]) => void
  onNext: () => void
  onPrev: () => void
}

const Question2_1 = ({ form, onChange, onNext, onPrev }: Question2_1Props) => {
  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <ProgressBar step={1.5} />
      <h2 className="font-bold text-lg">
        딱 맞는 케어를 위해,
        <br />
        기본 정보를 알려주세요!
      </h2>

      {/* 모자 착용 여부 */}
      <div>
        <p className="text-sm mb-2">평소에 모자를 자주 착용하시나요?</p>
        <div className="flex gap-4">
          <button
            onClick={() => onChange('wearHatFrequently', true)}
            className={`flex-1 py-2 rounded border ${
              form.wearHatFrequently === true
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            예
          </button>
          <button
            onClick={() => onChange('wearHatFrequently', false)}
            className={`flex-1 py-2 rounded border ${
              form.wearHatFrequently === false
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            아니오
          </button>
        </div>
      </div>

      {/* 자외선 노출 정도 */}
      <div>
        <p className="text-sm mb-2">평소 자외선에 노출되는 시간이 많은가요?</p>
        <div className="grid gap-2">
          <button
            onClick={() => onChange('uvExposureLevel', 'FREQUENT_OUTDOOR')}
            className={`w-full py-2 rounded border text-left px-3 ${
              form.uvExposureLevel === 'FREQUENT_OUTDOOR'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            실외활동 잦음 (일주일에 4번 이상 외출)
          </button>
          <button
            onClick={() => onChange('uvExposureLevel', 'NORMAL')}
            className={`w-full py-2 rounded border text-left px-3 ${
              form.uvExposureLevel === 'NORMAL'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            보통 (일주일에 2~3번 외출)
          </button>
          <button
            onClick={() => onChange('uvExposureLevel', 'MOSTLY_INDOOR')}
            className={`w-full py-2 rounded border text-left px-3 ${
              form.uvExposureLevel === 'MOSTLY_INDOOR'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            실내 위주 생활 (일주일에 1번 이하 외출)
          </button>
        </div>
      </div>

      {/* 이전/다음 버튼 */}
      <div className="flex gap-4 pt-4">
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

export default Question2_1
