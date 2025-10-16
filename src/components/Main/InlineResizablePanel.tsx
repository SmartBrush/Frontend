import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  /** '35vh', '300px' 같은 문자열 */
  initialHeight?: string
  minHeight?: string
  maxHeight?: string
  /** 고정 네비게이션 높이(px). 패널을 그 위에 붙여둠 */
  bottomOffset?: number
  className?: string
  storageKey?: string
}

const toPx = (val: string) => {
  if (val.endsWith('vh')) return (parseFloat(val) / 100) * window.innerHeight
  if (val.endsWith('px')) return parseFloat(val)
  return parseFloat(val)
}

export default function InlineResizablePanel({
  children,
  initialHeight = '49vh',
  minHeight = '120px',
  maxHeight = '50vh',
  bottomOffset = 72,
  className = '',
  storageKey = 'today-panel-height',
}: Props) {
  const startY = useRef(0)
  const startH = useRef(0)

  const minPx = toPx(minHeight)
  const maxPx = toPx(maxHeight)

  const [heightPx, setHeightPx] = useState<number>(() => {
    const saved = Number(localStorage.getItem(storageKey))
    if (!Number.isNaN(saved) && saved > 0) return saved
    return Math.min(Math.max(toPx(initialHeight), minPx), maxPx)
  })

  useEffect(() => {
    const onResize = () => {
      // 뷰포트 변경 시 현재 높이를 허용 범위 내로 보정
      setHeightPx((prev) => Math.min(Math.max(prev, minPx), maxPx))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [minPx, maxPx])

  const onPointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY
    startH.current = heightPx

    const onMove = (ev: PointerEvent) => {
      const dy = startY.current - ev.clientY // 위로 드래그하면 +, 아래로 -
      const next = Math.max(minPx, Math.min(maxPx, startH.current + dy))
      setHeightPx(next)
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      localStorage.setItem(storageKey, String(heightPx))
      document.body.style.userSelect = ''
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    document.body.style.userSelect = 'none'
  }

  return (
    <div
      className={`sticky w-full max-w-[400px] mx-auto z-10 ${className}`}
      style={{ bottom: bottomOffset, height: heightPx }}
    >
      {/* 드래그 핸들 */}
      <div
        onPointerDown={onPointerDown}
        className="h-5 flex items-center justify-center cursor-row-resize select-none"
        style={{ touchAction: 'none' }}
        aria-label="Resize handle"
      >
        <div className="h-1 w-12 rounded-full bg-gray-300" />
      </div>

      {/* 내용 영역: 패널 높이 내에서 스크롤 */}
      <div className="h-[calc(100%)] overflow-auto">{children}</div>
    </div>
  )
}
