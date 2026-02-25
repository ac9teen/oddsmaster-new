'use client'

import React from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

interface LottieIconProps {
  src: string
  className?: string
  height?: number
  width?: number
}

export default function LottieIcon({ src, className = '', height = 40, width = 40 }: LottieIconProps) {
  const lottieRef = React.useRef<LottieRefCurrentProps>(null)
  const [animationData, setAnimationData] = React.useState<object | null>(null)

  React.useEffect(() => {
    let mounted = true
    fetch(src)
      .then((r) => r.json())
      .then((json) => {
        if (mounted) setAnimationData(json as object)
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [src])

  return (
    <div className={className} style={{ width, height }}>
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  )
}


