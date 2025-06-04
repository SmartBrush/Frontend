import React from 'react'

type ScalpStatusCardProps = {
  status: string
  score: number
}

const ScalpStatusCard = ({ status, score }: ScalpStatusCardProps) => {
  return (
    <div className="flex justify-around bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <span className="font-bold">상태</span>
        <span className="bg-red-500 text-white rounded-full px-3 py-1 mt-1">
          {status}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold">점수</span>
        <span className="text-lg font-fold mt-1">{score}/10</span>
      </div>
    </div>
  )
}
export default ScalpStatusCard
