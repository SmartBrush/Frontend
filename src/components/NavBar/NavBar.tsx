import CommunityIcon from '../../assets/Community.svg'
import ResultIcon from '../../assets/Result.svg'
import MainIcon from '../../assets/Main.svg'
import RecommendIcon from '../../assets/Recommendation.png'
import MypageIcon from '../../assets/Mypage.svg'
import NavButton from './NavButton'

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 h-[72px] w-full max-w-[400px] bg-[#F5F5F5] rounded-t-[30px] shadow-md border-t border-gray-300">
      <div className="flex justify-around items-center py-3">
        <NavButton
          to="/community"
          iconSrc={CommunityIcon}
          alt="Community"
          label="커뮤니티"
        />
        <NavButton
          to="/reports"
          iconSrc={ResultIcon}
          alt="Result"
          label="결과"
        />
        <NavButton to="/" iconSrc={MainIcon} alt="Home" label="홈" />
        <NavButton
          to="/recommend"
          iconSrc={RecommendIcon}
          alt="Recommend"
          label="추천"
        />
        <NavButton
          to="/mypage"
          iconSrc={MypageIcon}
          alt="Mypage"
          label="내 정보"
        />
      </div>
    </div>
  )
}

export default NavBar
