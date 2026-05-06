'use client'
import { useEffect, useState, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

let engineInitialized = false
let initPromise: Promise<void> | null = null

function ensureEngine() {
  if (engineInitialized) return Promise.resolve()
  if (initPromise) return initPromise
  initPromise = initParticlesEngine(async (engine) => {
    await loadSlim(engine)
  }).then(() => { engineInitialized = true })
  return initPromise
}

interface ParticlesHeroProps {
  count?: number
  variant?: 'hero' | 'subtle' | 'stardust'
  id?: string
}

export default function ParticlesHero({
  count = 25,
  variant = 'hero',
  id = 'tsparticles',
}: ParticlesHeroProps) {
  const [init, setInit] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    if (mobile) return

    const ric = (window as any).requestIdleCallback ?? ((cb: any) => setTimeout(cb, 1500))
    const ricId = ric(() => ensureEngine().then(() => setInit(true)), { timeout: 3000 })
    return () => ((window as any).cancelIdleCallback ?? clearTimeout)(ricId)
  }, [])

  const particleCount = useMemo(() => {
    if (variant === 'subtle') return Math.min(count, 10)
    if (variant === 'stardust') return Math.min(count, 45)
    return Math.min(count, 50)
  }, [variant, count])

  const options = useMemo(() => {
    if (variant === 'stardust') {
      return {
        fullScreen: { enable: false },
        particles: {
          number: { value: particleCount, density: { enable: true, area: 900 } },
          color: { value: ['#F2C94C', '#FFD066', '#FFF3B0', '#ffffff', '#D4860A', '#FFDEA8'] },
          shape: { type: ['star', 'circle'] },
          opacity: {
            value: { min: 0.05, max: 0.85 },
            animation: { enable: true, speed: 0.5, sync: false },
          },
          size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 1.2, sync: false },
          },
          move: {
            enable: true,
            speed: 0.25,
            direction: 'none' as const,
            random: true,
            straight: false,
            outModes: { default: 'out' as const },
          },
          twinkle: { particles: { enable: true, frequency: 0.07, opacity: 1 } },
        },
        interactivity: {
          events: { onHover: { enable: false } },
        },
        detectRetina: false,
      }
    }

    const speed = variant === 'subtle' ? 0.3 : 0.55
    return {
      fullScreen: { enable: false },
      particles: {
        number: { value: particleCount, density: { enable: true, area: 900 } },
        color: { value: ['#F2C94C', '#D4860A', '#FFD066'] },
        shape: { type: 'star' },
        opacity: { value: { min: 0.25, max: 0.65 }, animation: { enable: true, speed: 0.4 } },
        size: { value: { min: 1.5, max: 3 } },
        move: {
          enable: true,
          speed,
          direction: 'top' as const,
          random: true,
          outModes: { default: 'out' as const },
        },
        twinkle: { particles: { enable: true, frequency: 0.04, opacity: 1 } },
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
      detectRetina: false,
    }
  }, [variant, particleCount])

  if (isMobile || !init) return null

  return (
    <Particles
      id={id}
      options={options}
      className="absolute inset-0 pointer-events-none"
    />
  )
}
