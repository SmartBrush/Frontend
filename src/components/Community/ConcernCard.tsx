export interface ConcernCardProps {
  name: string
  content: string
  date: string
}

const ConcernCard = ({ name, content, date }: ConcernCardProps) => {
  return (
    <div className="w-full py-[12px]">
      <p className="text-[16px] text-black">{content}</p>
      <div className="flex items-center mt-[8px] text-[11px] text-[#8C8C8C]">
        <span className="mr-1">{name}</span>
        <span className="text-[#D9D9D9]">|</span>
        <span className="ml-1">{date}</span>
      </div>
    </div>
  )
}

export default ConcernCard
