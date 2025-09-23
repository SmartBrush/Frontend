import type { Magazine } from '../../apis/magazine'

interface Props {
  item: Magazine
}

export default function ColumnCard({ item }: Props) {
  return (
    <a href={item.link} className="block rounded-lg overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-[120px] object-cover"
      />
      <div className="mt-2">
        <p className="text-sm font-semibold leading-snug line-clamp-2">
          {item.title}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {item.date} | by {item.writer}
        </p>
      </div>
    </a>
  )
}
