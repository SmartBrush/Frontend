import Confetti from 'react-confetti'
import { useEffect, useState } from 'react'

const ConfettiEffect = () => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return show ? (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={300}
      recycle={false}
    />
  ) : null
}

export default ConfettiEffect
