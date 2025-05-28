import { useNavigate } from 'react-router-dom'

type NavButtonProps = {
  to: string
  iconSrc: string
  alt: string
  label: string
}

const NavButton = ({ to, iconSrc, alt, label }: NavButtonProps) => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className="flex flex-col items-center  cursor-pointer"
      type="button"
    >
      <img src={iconSrc} alt={alt} className="w-[18px] h-auto mb-1" />
      <div className="text-black text-[10px] mt-[8px] font-semibold">
        {label}
      </div>
    </button>
  )
}

export default NavButton
