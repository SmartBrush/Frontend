// import { useRef } from 'react'
// import { Camera } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// const CameraUploadButton = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const navigate = useNavigate()

//   const handleClick = () => {
//     fileInputRef.current?.click()
//   }

//   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const imageUrl = URL.createObjectURL(file)

//       const formData = new FormData()
//       formData.append('image', file)

//       const token = localStorage.getItem('access_token')
//       console.log('token:', token)

//       try {
//         const response = await fetch(
//           '${import.meta.env.VITE_API_BASE_URL}/api/diagnosis/upload',
//           {
//             method: 'POST',
//             body: formData,
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         )

//         const contentType = response.headers.get('content-type')

//         if (!response.ok) {
//           const errorText = await response.text()
//           throw new Error(`서버 오류 (${response.status}): ${errorText}`)
//         }

//         const result = contentType?.includes('application/json')
//           ? await response.json()
//           : { message: await response.text() }

//         navigate('/result', {
//           state: {
//             images: [
//               {
//                 id: Date.now(),
//                 src: imageUrl,
//                 label: '촬영된 이미지',
//               },
//             ],
//             diagnosis: result,
//           },
//         })
//       } catch (error) {
//         console.error('진단 요청 실패:', error)
//       }
//     }
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <button
//         className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center cursor-pointer"
//         onClick={handleClick}
//       >
//         <Camera className="w-5 h-5 text-black" />
//       </button>

//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleChange}
//         className="hidden"
//       />
//     </div>
//   )
// }

// export default CameraUploadButton

import { useRef } from 'react'
import { Camera } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

const CameraUploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    const formData = new FormData()
    formData.append('image', file)

    const token = localStorage.getItem('access_token')
    const url = `${API_BASE_URL}/api/diagnosis/upload`

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData, // FormData면 Content-Type 자동 설정
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })

      const contentType = res.headers.get('content-type')

      if (!res.ok) {
        // 서버가 텍스트/JSON 어느 쪽으로 에러를 줄지 몰라서 안전하게 처리
        let errMsg = ''
        try {
          errMsg = contentType?.includes('application/json')
            ? JSON.stringify(await res.json())
            : await res.text()
        } catch {
          errMsg = '알 수 없는 오류'
        }
        throw new Error(`서버 오류 (${res.status}): ${errMsg}`)
      }

      const result = contentType?.includes('application/json')
        ? await res.json()
        : { message: await res.text() }

      navigate('/result', {
        state: {
          images: [
            {
              id: Date.now(),
              src: imageUrl,
              label: '촬영된 이미지',
            },
          ],
          diagnosis: result,
        },
      })
    } catch (error) {
      console.error('진단 요청 실패:', error)
      // 필요하면 여기서 토스트/알림 처리
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
