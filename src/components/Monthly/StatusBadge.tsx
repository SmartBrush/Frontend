interface Props {
  text: string
  className?: string // bg-... 들어오는 값
}
export default function StatusBadge({ text, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center justify-center
                  rounded-full px-3 py-1 text-[11px] font-bold leading-none
                  text-white shadow ${className}`}
    >
      {text}
    </span>
  )
}
