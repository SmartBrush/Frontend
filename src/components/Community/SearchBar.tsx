import { FiSearch } from "react-icons/fi"; // 아이콘 사용 (react-icons 설치 필요)

const SearchBar = () => {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center w-full p-3 rounded-lg bg-gray-100">
        <FiSearch className="text-gray-300 mr-2" size={18} />
        <input
          type="text"
          placeholder="두피 관련 고민을 검색해주세요."
          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-300 font-pretendard"
        />
      </div>
    </div>
  );
};

export default SearchBar;
