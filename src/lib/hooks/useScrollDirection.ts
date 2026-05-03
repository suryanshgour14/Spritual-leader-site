'use client'
import { useEffect, useRef, useState } from 'react'

type ScrollDirection = 'up' | 'down' | null

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(null)
  const prevY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (Math.abs(currentY - prevY.current) < 5) return
      setDirection(currentY > prevY.current ? 'down' : 'up')
      prevY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
