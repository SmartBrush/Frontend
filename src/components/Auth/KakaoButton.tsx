import kakaoIcon from '../../assets/kakaoLogo.svg'

interface KakaoButtonProps {
  text?: string
  onClick?: () => void
}

function KakaoButton({
  text = '카카오로 계속하기',
  onClick,
}: KakaoButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-[58px] bg-[#FAE100] rounded-3xl flex items-center justify-center gap-2 text-[#191600] font-semibold text-[16px] hover:bg-[#FFE602] cursor-pointer"
    >
      <img src={kakaoIcon} alt="Kakao" className="w-5 h-5" />
      <span>{text}</span>
    </button>
  )
}

export default KakaoButton
