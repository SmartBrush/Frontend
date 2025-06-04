interface ConcernCardProps {
  name: string
  content: string
}

const ConcernCard: React.FC<ConcernCardProps> = ({ name, content }) => {
  return (
    <div className="flex items-center border rounded-lg px-3 py-2 mb-2">
      <div className="w-10 h-10 bg-blue-500 rounded-full mr-3" />
      <div>
        <p className="text-sm font-medium text-gray-700">{name}</p>
        <p className="text-sm text-gray-500">{content}</p>
      </div>
    </div>
  )
}

export default ConcernCard
