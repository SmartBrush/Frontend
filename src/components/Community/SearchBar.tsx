import { FiSearch } from 'react-icons/fi'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center w-full p-3 rounded-lg bg-gray-100">
        <FiSearch className="text-gray-300 mr-2" size={18} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="두피 관련 고민을 검색해주세요."
          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-300 font-[Pretendard]"
        />
      </div>
    </div>
  )
}

export default SearchBar
