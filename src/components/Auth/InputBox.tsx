interface InputBoxProps {
  label?: string
  placeholder?: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
}

function InputBox({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  name,
}: InputBoxProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-black text-[20px] font-semibold">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="w-full h-[40px] px-4 rounded-xl border border-[#EDEDED] bg-white text-[16px] placeholder:text-[#BDBDBD] shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
    </div>
  )
}

export default InputBox
