import { useNavigate } from 'react-router-dom'
import React from 'react'

interface QuestionButtonComponentProps {
  text: string
  navigateTo: string
  navigateTF?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

function WhiteButton({
  text,
  navigateTo,
  navigateTF = true,
  disabled = false,
  onClick,
}: QuestionButtonComponentProps) {
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event)
    if (navigateTF)
      navigate(navigateTo.startsWith('/') ? navigateTo : `/${navigateTo}`)
  }

  return (
    <button
      className={`w-[327px] h-[58px] text-[16px] font-semibold text-[#191919] text-center mb-[35px] rounded-full border border-[#EDEDED] bg-white/80 shadow-md hover:bg-[#BDBDBD] ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={!disabled ? handleClick : undefined}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default WhiteButton
