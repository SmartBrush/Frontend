import type { Magazine } from '../../apis/magazine'

interface Props {
  item: Magazine
}

export default function ColumnMainSection({ item }: Props) {
  return (
    <section className="px-4 mt-4">
      <a
        href={item.link}
        className="relative block w-full rounded-xl overflow-hidden"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[220px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs text-white opacity-80">
            {item.category} | {item.date}
          </p>
          <p className="text-white font-semibold text-base leading-snug">
            {item.title}
          </p>
        </div>
      </a>
    </section>
  )
}
