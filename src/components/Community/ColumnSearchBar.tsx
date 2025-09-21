import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { searchMagazines, type Magazine } from '../../apis/magazine'

interface SearchBarProps {
  value?: string
  onChange?: (v: string) => void
  onSearch?: (results: Magazine[]) => void
}

const ColumnSearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const [innerValue, setInnerValue] = useState('')

  useEffect(() => {
    if (value !== undefined) {
      setInnerValue(value)
    }
  }, [value])

  const handleChange = async (v: string) => {
    if (value === undefined) {
      setInnerValue(v)
    }
    onChange?.(v)

    // 검색어가 있을 때만 API 호출
    if (v.trim().length > 0) {
      try {
        const res = await searchMagazines(v)
        onSearch?.(res)
      } catch (e) {
        console.error('칼럼 검색 실패:', e)
      }
    } else {
      // 검색창 비우면 빈 배열 반환
      onSearch?.([])
    }
  }

  return (
    <div className="px-4 py-3">
      <div className="flex items-center w-full p-3 rounded-lg bg-gray-100">
        <FiSearch className="text-gray-300 mr-2" size={18} />
        <input
          type="text"
          value={value !== undefined ? value : innerValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="궁금한 칼럼을 검색하세요."
          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-300 font-[Pretendard]"
        />
      </div>
    </div>
  )
}

export default ColumnSearchBar
