type CaptureImageProps = {
  images: { id: number; src: string; label: string }[]
}

const CaptureImage = ({ images }: CaptureImageProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h3 className="text-center font-bold mb-2 text-lg">
        나의 촬영 사진을 확인하세요
      </h3>
      <div className="grid grid-cols-2 gap-4 justify-items-center">
        {images.map((img) => (
          <div key={img.id} className="flex flex-col items-center w-24">
            <img
              src={img.src}
              alt={img.label}
              className="rounded-full w-24 h-24 object-cover"
            />
            <p className="text-base text-center font-bold mt-2">{img.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaptureImage
