// interface BlueBoxProps {
//   text: string
//   onClick?: () => void
//   disabled?: boolean
// }

// function BlueBox({ text, onClick, disabled = false }: BlueBoxProps) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className="w-full h-12 bg-[#4E9366] text-white text-sm font-semibold rounded-md
//         hover:bg-[#4B8F63] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
//     >
//       {text}
//     </button>
//   )
// }

// export default BlueBox

interface BlueBoxProps {
  text: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'rounded'
  rounded?: number // ✅ border-radius(px) 직접 지정
}

function BlueBox({
  text,
  onClick,
  disabled = false,
  variant = 'default',
  rounded = 8,
}: BlueBoxProps) {
  const baseClass =
    'w-full h-12 text-white text-sm font-semibold shadow-md ' +
    'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-[#4E9366] hover:bg-[#4B8F63]'

  const radiusClass = variant === 'rounded' ? `rounded-full` : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${radiusClass}`}
      style={{
        borderRadius: variant === 'default' ? `${rounded}px` : undefined,
      }} // ✅ px 단위로 조절
    >
      {text}
    </button>
  )
}

export default BlueBox
