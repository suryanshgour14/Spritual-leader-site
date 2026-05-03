import { cn } from '@/lib/utils'
import Image from 'next/image'

interface BackgroundMarqueeProps {
  images: string[]
  opacity?: number
  className?: string
}

export default function BackgroundMarquee({
  images,
  opacity = 0.15,
  className,
}: BackgroundMarqueeProps) {
  // Duplicate for seamless loop
  const row1 = [...images, ...images]
  const row2 = [...images, ...images].reverse()

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      aria-hidden="true"
    >
      {/* Row 1: left to right */}
      <div className="flex animate-marquee-ltr md:animate-marquee-ltr" style={{ animationDuration: '80s', width: 'max-content' }}>
        {row1.map((src, i) => (
          <div key={i} className="relative flex-shrink-0 h-48 w-72 mx-1">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              style={{ opacity }}
              sizes="288px"
            />
          </div>
        ))}
      </div>

      {/* Row 2: right to left */}
      <div className="flex animate-marquee-rtl mt-1" style={{ animationDuration: '90s', width: 'max-content' }}>
        {row2.map((src, i) => (
          <div key={i} className="relative flex-shrink-0 h-48 w-72 mx-1">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              style={{ opacity }}
              sizes="288px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
