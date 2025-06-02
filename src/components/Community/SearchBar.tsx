const SearchBar = () => {
  return (
    <div className="px-4 py-3">
      <input
        type="text"
        placeholder="두피 관련 고민을 검색해주세요."
        className="w-full p-3 rounded-lg bg-gray-100 text-sm"
      />
    </div>
  );
};

export default SearchBar;
