'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface CountUpProps {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export default function CountUp({
  target,
  suffix = '+',
  duration = 2000,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!isInView) return
    if (prefersReduced) {
      setCount(target)
      return
    }

    const start = Date.now()
    let raf: number

    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        raf = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target, duration, prefersReduced])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
