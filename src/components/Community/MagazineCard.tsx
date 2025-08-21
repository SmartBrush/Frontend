import { useState } from 'react'
import type { Magazine } from '../../apis/magazine'

interface Props {
  item: Magazine
  width?: number
  height?: number
}

export default function MagazineCard({
  item,
  width = 160,
  height = 240,
}: Props) {
  const [imgError, setImgError] = useState(false)

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block shrink-0 rounded-xl overflow-hidden mx-2"
      style={{ width, height }}
      aria-label={item.title}
      title={item.title}
    >
      <img
        src={imgError ? '/fallback-image.png' : item.image}
        alt={item.title}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* 제목 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
        <p
          className="text-white text-[13px] font-semibold leading-snug drop-shadow-sm"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.title}
        </p>
      </div>
    </a>
  )
}
