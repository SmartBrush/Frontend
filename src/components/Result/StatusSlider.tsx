import myIcon from '../../assets/my.png'

type StatusSliderProps = {
  label: string
  valuePosition: number
  color: string
}

const clamp = (v: number) => Math.max(0, Math.min(100, v))

const StatusSlider = ({ label, valuePosition, color }: StatusSliderProps) => {
  const pos = clamp(valuePosition) // 아이콘/채움 위치 (%)
  const markerHalf = 10 // 아이콘 절반(px) = w-5(20px)/2

  return (
    <div className="my-4">
      <p className="text-center text-lg font-extrabold mb-2">{label}</p>

      {/* 바 + 아이콘 */}
      <div className="relative w-full max-w-[320px] mx-auto mt-8">
        {/* 바 본체 */}
        <div className="w-full h-4 bg-[#E0DDDD] rounded relative overflow-hidden">
          {/* 왼쪽부터 pos%까지 채움 */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${pos}%`,
              backgroundColor: color,
            }}
          />
          {/* 중앙 점선 기준선 */}
          <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-gray-300" />
        </div>

        {/* 내 위치 아이콘 */}
        <img
          src={myIcon}
          alt="my position"
          className="absolute w-5 h-5 -top-6"
          style={{ left: `calc(${pos}% - ${markerHalf}px)` }}
        />
      </div>

      {/* 라벨 */}
      <div className="flex justify-between text-sm font-bold mt-2 w-full  px-2">
        <span className="pl-1">주의</span>
        <span className="text-gray-400">성별/연령대 평균</span>
        <span className="pr-1">양호</span>
      </div>
    </div>
  )
}

export default StatusSlider
