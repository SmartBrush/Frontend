type SpinnerProps = {
  size?: number // px
  className?: string
  speed?: number // 한 바퀴 도는 시간 (ms)
}

const Spinner = ({ size = 36, className = '', speed = 2000 }: SpinnerProps) => {
  const s = `${size}px`
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="로딩 중"
      className={`inline-block ${className}`}
      style={{ width: s, height: s }}
    >
      <span className="sr-only">Loading...</span>
      <div
        className="w-full h-full rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin"
        style={{ borderTopColor: '#4E9366', animationDuration: `${speed}ms` }}
      />
    </div>
  )
}

export default Spinner
