import StatusBadge from './StatusBadge'

interface Props {
  title: string
  value: number
  badgeText: string
  badgeClass: string
  active?: boolean
  onClick?: () => void
}

export default function SummaryCard({
  title,
  value,
  badgeText,
  badgeClass,
  active = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl bg-white transition shadow-sm
                  ${
                    active
                      ? 'border-2 border-black'
                      : 'border border-gray-300 hover:border-gray-400'
                  }`}
    >
      <div className="flex h-[110px] flex-col items-center justify-between px-3 py-3">
        <div className="text-[12px] font-semibold text-gray-600">{title}</div>
        <div className="text-[30px] font-extrabold leading-none text-gray-900">
          {value.toFixed(1)}
        </div>
        <StatusBadge text={badgeText} className={badgeClass} />
      </div>
    </button>
  )
}
