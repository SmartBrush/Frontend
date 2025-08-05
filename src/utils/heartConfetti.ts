// src/utils/heartConfetti.ts
import confetti from 'canvas-confetti'

export const fireHeartConfetti = () => {
  const container = document.getElementById('confetti-container')
  if (!container) return

  // 🎯 canvas를 해당 div 안에 붙이기
  const canvas = document.createElement('canvas')
  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'
  canvas.style.borderRadius = '20px' // 선택 사항: 둥글게 하려면
  container.appendChild(canvas)

  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true,
  })

  const duration = 2 * 1000
  const end = Date.now() + duration

  // 💖 하트 뿌리기
  const frame = () => {
    myConfetti({
      particleCount: 2,
      angle: 90,
      spread: 20,
      origin: { x: Math.random(), y: 0 },
      colors: ['#ff69b4', '#ffb6c1'],
      shapes: ['circle'],
      scalar: 2,
    })

    if (Date.now() < end) requestAnimationFrame(frame)
  }

  frame()

  // 🎉 좌우 폭죽
  myConfetti({
    particleCount: 60,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: ['#ff69b4', '#ffc0cb', '#fff0f5'],
    scalar: 1.2,
  })

  myConfetti({
    particleCount: 60,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: ['#ff69b4', '#ffc0cb', '#fff0f5'],
    scalar: 1.2,
  })

  // ⏳ 4초 후 캔버스 제거
  setTimeout(() => {
    container.removeChild(canvas)
  }, 5000)
}
