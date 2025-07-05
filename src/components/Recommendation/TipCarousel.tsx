// 오늘의 두피 팁 슬라이더
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import img1 from '../../assets/magazine1.png'
import img2 from '../../assets/magazine2.png'
import img3 from '../../assets/magazine3.png'

interface Tip {
  id: string
  image: string
  title: string
}

// 나중에 크롤링, 현재는 임시 데이터
const tips: Tip[] = [
  {
    id: '1',
    image: img3,
    title: '두피가 시원해지는 마사지',
  },
  {
    id: '2',
    image: img2,
    title: '휑하고 처지고, 모발이 점점 얇아진다',
  },
  {
    id: '3',
    image: img1,
    title: '아직도 샴푸 먼저하세요? feat.트샴트',
  },
]

interface TipCarouselProps {}

const TipCarousel: React.FC<TipCarouselProps> = () => (
  <Swiper spaceBetween={16} slidesPerView={'auto'} className="h-[160px]">
    {tips.map((tip) => (
      <SwiperSlide key={tip.id} className="!w-[140px]">
        <div className="bg-white rounded-lg overflow-gidden shadow">
          <img
            src={tip.image}
            alt={tip.title}
            className="w-full h-24 object-cover"
          />
          <p className="p-2 text-sm font-medium">{tip.title}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
)

export default TipCarousel
