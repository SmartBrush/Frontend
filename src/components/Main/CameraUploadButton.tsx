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
//           'http://localhost:8080/api/diagnosis/upload',
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

const CameraUploadButton = () => {
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

      const token = localStorage.getItem('access_token')
      console.log('token:', token)

      try {
        const response = await fetch(
          'http://localhost:8080/api/diagnosis/upload',
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const contentType = response.headers.get('content-type')

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`서버 오류 (${response.status}): ${errorText}`)
        }

        const result = contentType?.includes('application/json')
          ? await response.json()
          : { message: await response.text() }

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
