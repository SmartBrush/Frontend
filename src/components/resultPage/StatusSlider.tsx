type StatusSliderProps = {
  label: string
  valuePosition: number
  color: string
}

const StatusSlider = ({ label, valuePosition, color }: StatusSliderProps) => {
  return (
    <div className="my-2">
      <p className="text-sm mb-1">{label}</p>
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
      <div className="flex justify-between text-xs mt-1">
        <span>주의</span>
        <span>성별/연령대 평균</span>
        <span>양호</span>
      </div>
    </div>
  )
}

export default StatusSlider
