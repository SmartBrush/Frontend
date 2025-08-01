// 진단 총평 박스 -> 기디 회의 이후 두피 mbit로 수정

interface SummaryBoxProps {
  summary: string
  detail: string
}

const SummaryBox = ({ summary, detail }: SummaryBoxProps) => {
  return (
    <div className="bg-[#e0f5ec] text-[#006644] rounded-xl px-4 py-3 shadow mb-5">
      <p className="font-bold text-sm mb-[6px]">{summary}</p>
      <p className="text-sm text-gray-snug">{detail}</p>
    </div>
  )
}
export default SummaryBox
