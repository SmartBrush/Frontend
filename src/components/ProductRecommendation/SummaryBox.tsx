// 진단 총평 박스 -> 기디 회의 이후 두피 mbit로 수정

interface SummaryBoxProps {
  summary: string
  detail: string
}

const SummaryBox = ({ summary, detail }: SummaryBoxProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <p className="font-semibold mb-[8px]">{summary}</p>
      <p className="text-sm text-gray-700">{detail}</p>
    </div>
  )
}
export default SummaryBox
