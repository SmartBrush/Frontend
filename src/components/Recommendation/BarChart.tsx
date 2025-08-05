interface BarChartProps {
  data: { label: string; value: number }[]
}

const BarChart = ({ data }: BarChartProps) => {
  return (
    <div className="flex justify-between items-end w-full h-20 gap-[1px]">
      {data.map(({ value }, index) => (
        <div
          key={index}
          className="w-[15px] bg-gray-400 "
          style={{ height: `${value}%` }}
        />
      ))}
    </div>
  )
}

export default BarChart
