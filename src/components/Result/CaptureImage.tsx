import { useRef } from 'react'

type CaptureImageItem = {
  id: number
  src: string // 서버 URL or URL.createObjectURL
  label?: string
  uploading?: boolean // 업로드 진행 표시용(선택)
}

type CaptureImageProps = {
  images: CaptureImageItem[]
  showUploadButton?: boolean
  onPickFiles?: (files: FileList) => void // 부모에서 업로드 처리
}

const CaptureImage = ({
  images,
  showUploadButton = false,
  onPickFiles,
}: CaptureImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-center font-bold text-lg flex-1">
          촬영된 사진을 확인해보세요!
        </h3>

        {showUploadButton && (
          <>
            <button
              className="ml-4 shrink-0 px-3 py-1.5 text-sm rounded-lg border border-gray-300"
              onClick={() => inputRef.current?.click()}
            >
              사진 추가
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && onPickFiles?.(e.target.files)}
            />
          </>
        )}
      </div>

      {images.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500">
          아직 업로드된 사진이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          {images.map((img) => (
            <div key={img.id} className="flex flex-col items-center w-24">
              <div className="relative">
                <img
                  src={img.src}
                  alt={img.label ?? '촬영 사진'}
                  className="rounded-full w-24 h-24 aspect-square object-cover"
                  onError={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.visibility =
                      'hidden')
                  }
                />
                {img.uploading && (
                  <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center text-white text-xs">
                    업로드 중…
                  </div>
                )}
              </div>
              {img.label && (
                <p className="text-base text-center font-bold mt-2">
                  {img.label}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CaptureImage
