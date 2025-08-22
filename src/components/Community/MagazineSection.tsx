import { useState, useEffect, useRef, useMemo } from 'react'
import { getRecommendedMagazines, type Magazine } from '../../apis/magazine'
import MagazineCard from './MagazineCard'

export default function MagazineSection() {
  const [base, setBase] = useState<Magazine[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const pausedRef = useRef(false)
  const xRef = useRef(0)

  const CARD_W = 160
  const CARD_H = 240
  const GAP_X = 16
  const ITEM_W = CARD_W + GAP_X

  const flowItems = useMemo<Magazine[]>(() => {
    if (base.length === 0) return []
    const sliced = base.slice(0, 10)
    return [...sliced, ...sliced]
  }, [base])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRecommendedMagazines()
        setBase(res)
      } catch (e) {
        console.error('보그 칼럼 불러오기 실패:', e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (flowItems.length === 0) return

    const oneSetWidth = 10 * ITEM_W
    const speedPxPerSec = 45
    const speed = speedPxPerSec / 60

    const step = () => {
      if (!pausedRef.current) {
        xRef.current -= speed

        if (Math.abs(xRef.current) >= oneSetWidth) {
          xRef.current += oneSetWidth
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }

    xRef.current = 0
    if (trackRef.current) {
      trackRef.current.style.transform = 'translate3d(0,0,0)'
      trackRef.current.style.willChange = 'transform'
    }

    rafRef.current = requestAnimationFrame(step)

    const handleVisibility = () => {
      pausedRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [flowItems.length])

  if (flowItems.length === 0) return null

  const onMouseEnter = () => {
    pausedRef.current = true
  }
  const onMouseLeave = () => {
    pausedRef.current = false
  }

  return (
    <section className="relative w-full overflow-hidden px-0">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: CARD_H }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          ref={trackRef}
          className="absolute left-0 top-0 h-full flex items-stretch"
        >
          {flowItems.map((item, i) => (
            <MagazineCard
              key={`${item.id}-${i}`}
              item={item}
              width={CARD_W}
              height={CARD_H}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
