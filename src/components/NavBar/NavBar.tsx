import CommunityIcon from "../../assets/Community.svg";
import ResultIcon from "../../assets/Result.svg";
import MainIcon from "../../assets/Main.svg";
import RecommendIcon from "../../assets/Recommendation.svg";
import MypageIcon from "../../assets/Mypage.svg";
import NavButton from "./NavButton";

const NavBar = () => {
  return (
    <div className="fixed bottom-0 w-full max-w-[400px] bg-[#F5F5F5] justify-center rounded-t-[30px] shadow-md border-t border-gray-300 navbar">
      <div className="flex justify-around items-center py-3">
        <NavButton
          to="/community"
          iconSrc={CommunityIcon}
          alt="Community"
          label="커뮤니티"
        />
        <NavButton
          to="/result"
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
  );
};

export default NavBar;
