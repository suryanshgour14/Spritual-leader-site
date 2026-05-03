'use client'
import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

let engineInitialized = false
let initPromise: Promise<void> | null = null

function ensureEngine() {
  if (engineInitialized) return Promise.resolve()
  if (initPromise) return initPromise
  initPromise = initParticlesEngine(async (engine) => {
    await loadSlim(engine)
  }).then(() => {
    engineInitialized = true
  })
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

  useEffect(() => {
    ensureEngine().then(() => setInit(true))
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  let particleCount = variant === 'subtle' ? Math.min(count, 10) : count
  if (variant === 'stardust') particleCount = isMobile ? 30 : count
  else if (isMobile) return null

  const getOptions = () => {
    if (variant === 'stardust') {
      return {
        fullScreen: { enable: false },
        particles: {
          number: { value: particleCount, density: { enable: true, area: 800 } },
          color: { value: ['#F2C94C', '#FFD066', '#FFF3B0', '#ffffff', '#D4860A', '#FFDEA8'] },
          shape: { type: ['star', 'circle'] },
          opacity: {
            value: { min: 0.05, max: 0.9 },
            animation: { enable: true, speed: 0.6, sync: false },
          },
          size: {
            value: { min: 1, max: 3.5 },
            animation: { enable: true, speed: 1.5, sync: false },
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: 'none' as const,
            random: true,
            straight: false,
            outModes: { default: 'out' as const },
          },
          twinkle: {
            particles: { enable: true, frequency: 0.08, opacity: 1 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: !isMobile, mode: 'bubble' },
          },
          modes: {
            bubble: { distance: 160, size: 5, duration: 0.5, opacity: 0.9 },
          },
        },
        detectRetina: true,
      }
    }

    const speed = variant === 'subtle' ? 0.3 : 0.6
    return {
      fullScreen: { enable: false },
      particles: {
        number: { value: particleCount, density: { enable: true, area: 800 } },
        color: { value: ['#F2C94C', '#D4860A', '#FFD066'] },
        shape: { type: 'star' },
        opacity: { value: { min: 0.3, max: 0.7 }, animation: { enable: true, speed: 0.5 } },
        size: { value: { min: 1.5, max: 3.5 } },
        move: {
          enable: true,
          speed,
          direction: 'top' as const,
          random: true,
          outModes: { default: 'out' as const },
        },
        twinkle: { particles: { enable: true, frequency: 0.05, opacity: 1 } },
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
      detectRetina: true,
    }
  }

  if (!init) return null

  return (
    <Particles
      id={id}
      options={getOptions()}
      className="absolute inset-0 pointer-events-none"
    />
  )
}
