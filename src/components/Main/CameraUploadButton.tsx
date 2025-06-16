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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)

      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await fetch(
          'http://localhost:8080/api/diagnosis/upload',
          {
            method: 'POST',
            body: formData,
          },
        )
        const result = await response.json()

        navigate('/result', {
          state: {
            images: [
              {
                id: Date.now(),
                src: imageUrl,
                label: '촬영된 이미지',
              },
            ],
            diagnosis: result, // ✅ 진단 결과 함께 전달
          },
        })
      } catch (error) {
        console.error('진단 요청 실패:', error)
      }
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
