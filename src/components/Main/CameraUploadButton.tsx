import { useRef } from 'react'
import { Camera } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface CameraUploadButtonProps {
  onFileSelect?: (file: File) => void
}

const CameraUploadButton = ({ onFileSelect }: CameraUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)

      if (onFileSelect) {
        onFileSelect(file)
      }

      // ✅ 이미지 정보와 함께 /result 페이지로 이동
      navigate('/result', {
        state: {
          images: [
            {
              id: Date.now(), // 고유 ID
              src: imageUrl,
              label: '촬영된 이미지',
            },
          ],
        },
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <Camera className="w-5 h-5 text-black" />
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}

export default CameraUploadButton
