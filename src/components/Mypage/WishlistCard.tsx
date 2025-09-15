import React from 'react'
import LikeButton from '../ProductDetail/LikeButton'

type Props = {
  id: number
  brand: string
  name: string
  price: string
  image: string
  link: string
}

const WishlistCard: React.FC<Props> = ({
  id,
  brand,
  name,
  price,
  image,
  link,
}) => {
  return (
    <div className="relative bg-white rounded-[24px] shadow-md p-4">
      {/* 하트 버튼 */}
      <div className="absolute top-4 right-4">
        <LikeButton productId={id} size={24} />
      </div>

      {/* 이미지 */}
      <div className="w-full h-[160px] flex items-center justify-center">
        <img src={image} alt={name} className="max-h-[160px] object-contain" />
      </div>

      {/* 브랜드 */}
      <div className="mt-2 text-[12px] text-[#8C8C8C]">{brand}</div>

      {/* 이름 */}
      <div className="mt-1 text-[13px] font-bold leading-[1.25] line-clamp-2">
        {name}
      </div>

      {/* 가격 + 구매 버튼 */}
      <div className="mt-3 flex items-center justify-between">
        <div className="text-[13px] font-bold">₩ {price}</div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="px-3 h-[17px] rounded-full bg-[#4E9366] text-white text-[6px] flex items-center justify-center"
        >
          구매하러가기
        </a>
      </div>
    </div>
  )
}

export default WishlistCard
