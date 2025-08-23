interface ProgressBarProps {
  step: number // 0.5, 1.0, 1.5, ..., 4.0
}

const ProgressBar = ({ step }: ProgressBarProps) => {
  const totalBlocks = 4
  const filledBlocks = Math.floor(step) // 1.0 단위로 채움
  const hasHalf = step % 1 !== 0 // 0.5 단계일 경우

  return (
    <div className="flex justify-between items-center w-full max-w-xs mx-auto mt-4 mb-6">
      {[...Array(totalBlocks)].map((_, i) => {
        let bgColor = 'bg-gray-300'
        if (i < filledBlocks) {
          bgColor = 'bg-[#4E9366]'
        } else if (i === filledBlocks && hasHalf) {
          bgColor = '' // half 색은 style로 별도 지정
        }

        // ✅ 첫/끝 블록은 mx-0, 나머지는 mx-1
        const marginClass = i === 0 || i === totalBlocks - 1 ? 'mx-0' : 'mx-1'

        return (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${bgColor} ${marginClass}`}
            style={{
              background:
                i === filledBlocks && hasHalf
                  ? 'linear-gradient(to right, #4E9366 50%, #D1D5DB 50%)'
                  : undefined,
            }}
          />
        )
      })}
    </div>
  )
}

export default ProgressBar
