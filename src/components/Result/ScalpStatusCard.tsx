type ScalpStatusCardProps = {
  status: '양호' | '보통' | '심각'
  score: number
  bgColor: string
}

const ScalpStatusCard = ({ status, score, bgColor }: ScalpStatusCardProps) => {
  return (
    <div className="mt-5 grid grid-cols-2 gap-7 px-10 text-center">
      <div className="rounded-xl border-2 border-gray-300 px-4 py-3 flex flex-col items-center">
        <span className="text-xl font-semibold">상태</span>
        <span
          className={`${bgColor} text-white rounded-full px-3 py-1 mt-2 text-xl text-base font-bold leading-none inline-flex items-center`}
        >
          {status}
        </span>
      </div>
      <div className="rounded-xl border-2 border-gray-300 px-3 py-3 flex flex-col items-center">
        <span className="text-xl font-semibold">점수</span>
        <span className="text-xl font-extrabold mt-2">{score}/10</span>
      </div>
    </div>
  )
}
export default ScalpStatusCard
