import ColumnCard from './ColumnCard'
import type { Magazine } from '../../apis/magazine'

interface Props {
  items: Magazine[]
}

export default function ColumnListSection({ items }: Props) {
  return (
    <section className="px-4 mt-6">
      <h2 className="mb-3 text-lg font-semibold">웰니스</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <ColumnCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
