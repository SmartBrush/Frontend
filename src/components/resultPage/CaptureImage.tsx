type CaptureImageProps = {
  images: { id: number; src: string; label: string }[]
}

const CaptureImage = ({ images }: CaptureImageProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h3 className="font-bold mb-2">나의 촬영 사진</h3>
      <div className="grid grid-cols-2 gap-2">
        {images.map((img) => (
          <div key={img.id} className="relative">
            <img src={img.src} alt={img.label} className="rounded-md" />
            <p className="text-xs text-center">{img.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaptureImage
