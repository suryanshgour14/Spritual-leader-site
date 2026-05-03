'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface CarouselImage {
  src: string
  alt: string
  caption?: string
}

interface PhotoCarouselProps {
  images: CarouselImage[]
  autoplay?: boolean
  showDots?: boolean
  className?: string
}

export default function PhotoCarousel({
  images,
  autoplay = true,
  showDots = true,
  className,
}: PhotoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const startAutoplay = useCallback(() => {
    if (!autoplay || !emblaApi) return
    stopAutoplay()
    intervalRef.current = setInterval(() => {
      if (!document.hidden) emblaApi.scrollNext()
    }, 4000)
  }, [autoplay, emblaApi, stopAutoplay])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('pointerDown', stopAutoplay)
    emblaApi.on('pointerUp', startAutoplay)
    startAutoplay()
    return () => {
      stopAutoplay()
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect, startAutoplay, stopAutoplay])

  if (!images.length) return null

  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl border border-gold-300/20', className)}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="relative flex-shrink-0 w-full aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-temple-dark/80 to-transparent px-4 py-3">
                  <p className="text-cream-100 text-sm font-devanagari">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                i === selectedIndex ? 'bg-saffron-500 w-4' : 'bg-cream-300/50'
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
