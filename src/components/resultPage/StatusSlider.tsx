import myIcon from '../../assets/my.png'

type StatusSliderProps = {
  label: string
  valuePosition: number //0 ~ 100(%)
  color: string
}

const StatusSlider = ({ label, valuePosition, color }: StatusSliderProps) => {
  return (
    <div className="my-2">
      <p className="text-center text-lg font-bold mb-2">{label}</p>

      <div className="relative h-10">
        <img
          src={myIcon}
          alt="my position"
          className="absolute w-5 h-5 -top-0"
          style={{
            left: `calc(${valuePosition}% + 12.5% - 10px)`,
            top: '15px',
          }}
        />
      </div>

      {/* 슬라이더 바 */}
      <div className="w-full bg-gray-300 h-2 rounded-full relative">
        <div
          className="absolute h-2 rounded-full"
          style={{
            left: `${valuePosition}%`,
            width: `25%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
      <div className="flex justify-between text-s font-bold mt-1">
        <span>주의</span>
        <span>성별/연령대 평균</span>
        <span>양호</span>
      </div>
    </div>
  )
}

export default StatusSlider
