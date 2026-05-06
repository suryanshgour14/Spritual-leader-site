'use client'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

type OrbVariant = 'saffron' | 'maroon' | 'gold'

interface OrbConfig {
  size: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  duration: number
}

interface GlowOrbsProps {
  variant?: OrbVariant
  positions?: OrbConfig[]
  className?: string
}

const variantColors: Record<OrbVariant, string> = {
  saffron: 'bg-saffron-400/10',
  maroon:  'bg-maroon-400/10',
  gold:    'bg-gold-400/12',
}

const defaultPositions: Record<OrbVariant, OrbConfig[]> = {
  saffron: [
    { size: 384, top: '-5rem', left: '-5rem', duration: 10 },
    { size: 300, bottom: '2rem', right: '-3rem', duration: 12 },
  ],
  maroon: [
    { size: 350, top: '5rem', right: '-4rem', duration: 11 },
    { size: 250, bottom: '-2rem', left: '10%', duration: 9 },
  ],
  gold: [
    { size: 400, bottom: '-5rem', left: '-5rem', duration: 13 },
    { size: 280, top: '3rem', right: '10%', duration: 8 },
  ],
}

export default function GlowOrbs({ variant = 'saffron', positions, className }: GlowOrbsProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const orbs  = positions ?? defaultPositions[variant]
  const color = variantColors[variant]

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => {
        const size = isMobile ? orb.size * 0.5 : orb.size
        return (
          <div
            key={i}
            className={cn('absolute rounded-full', color)}
            style={{
              width: size,
              height: size,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              bottom: orb.bottom,
              filter: 'blur(80px)',
              willChange: 'opacity',
              transform: 'translateZ(0)',
              animation: `glow-orb-pulse ${orb.duration}s ease-in-out ${i * 2}s infinite`,
            }}
          />
        )
      })}
    </div>
  )
}
