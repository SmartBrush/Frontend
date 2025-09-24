interface MyPageMenuItemProps {
  icon: string
  label: string
  onClick?: () => void
}

const MyPageMenuItem = ({ icon, label, onClick }: MyPageMenuItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-between items-center bg-white w-[351px] h-[76px] rounded-[20px] px-4 py-3 shadow-sm cursor-pointer"
    >
      <div className="flex items-center gap-2 text-[16px] text-black">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <span className="text-gray-400 text-xl">&gt;</span>
    </button>
  )
}

export default MyPageMenuItem
