import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import hot1 from '../../assets/hot1.png'
import hot2 from '../../assets/hot2.png'
import hot3 from '../../assets/hot3.png'

const baseData = [
  { id: 1, imageUrl: hot1 },
  { id: 2, imageUrl: hot2 },
  { id: 3, imageUrl: hot3 },
]

// 🔁 반복을 위한 데이터 확장
const data = [...baseData, ...baseData, ...baseData]

const HotTopicsSection = () => {
  const initialIndex = baseData.length + 1
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prev) => (prev + 1) % data.length)
    },
    onSwipedRight: () => {
      setCurrentIndex((prev) => (prev - 1 < 0 ? data.length - 1 : prev - 1))
    },
    trackMouse: true,
  })

  return (
    <section className="relative w-full px-4 overflow-hidden">
      <div
        {...handlers}
        className="relative flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(calc(50% - ${(currentIndex + 0.5) * 200}px))`,
          width: `${data.length * 200}px`,
        }}
      >
        {data.map((item, idx) => {
          const isCenter = idx === currentIndex
          return (
            <div
              key={`${item.id}-${idx}`}
              className={`shrink-0 mx-2 transition-all duration-300 ease-in-out rounded-xl overflow-hidden ${
                isCenter ? 'w-[180px] h-[280px]' : 'w-[140px] h-[240px]'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={`topic-${item.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HotTopicsSection
