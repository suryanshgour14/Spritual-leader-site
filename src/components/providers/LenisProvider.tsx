'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    let lenis: Lenis | null = null

    const timer = setTimeout(() => {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        prevent: (node: Element) =>
          node.nodeName === 'IFRAME' ||
          node.hasAttribute('data-lenis-prevent'),
      })
      lenisRef.current = lenis

      function raf(time: number) {
        lenis!.raf(time)
        rafRef.current = requestAnimationFrame(raf)
      }
      rafRef.current = requestAnimationFrame(raf)
    }, 200)

    return () => {
      clearTimeout(timer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
