interface BlueBoxProps {
  text: string
  onClick?: () => void
  disabled?: boolean
}

function BlueBox({ text, onClick, disabled = false }: BlueBoxProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-12 bg-[#6AB5FF] text-white text-sm font-semibold rounded-md 
        hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {text}
    </button>
  )
}

export default BlueBox
