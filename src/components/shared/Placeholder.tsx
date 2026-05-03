import { cn } from '@/lib/utils'

interface PlaceholderProps {
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'video'
  label?: string
  className?: string
}

const ratioMap = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  video: 'aspect-video',
}

export default function Placeholder({
  aspectRatio = 'square',
  label = 'साध्वी समाहिता जी',
  className,
}: PlaceholderProps) {
  return (
    <div
      className={cn(
        ratioMap[aspectRatio],
        'relative flex flex-col items-center justify-center overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-saffron-100 to-saffron-200',
        'border border-gold-300/30',
        className
      )}
    >
      {/* Lotus SVG */}
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-saffron-400 opacity-60 mb-2"
      >
        <path
          d="M40 12 C40 12 28 28 28 38 C28 46 33 52 40 52 C47 52 52 46 52 38 C52 28 40 12 40 12Z"
          stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"
        />
        <path
          d="M62 28 C62 28 46 34 42 43 C39 50 42 57 48 59 C55 61 62 56 64 49 C67 40 62 28 62 28Z"
          stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"
        />
        <path
          d="M18 28 C18 28 34 34 38 43 C41 50 38 57 32 59 C25 61 18 56 16 49 C13 40 18 28 18 28Z"
          stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"
        />
        <path
          d="M62 62 C62 62 46 50 40 50 C34 50 28 56 28 62 C28 68 33 72 40 72 C47 72 62 62 62 62Z"
          stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"
        />
        <path
          d="M18 62 C18 62 34 50 40 50 C46 50 52 56 52 62 C52 68 47 72 40 72 C33 72 18 62 18 62Z"
          stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"
        />
        <circle cx="40" cy="50" r="7" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
      </svg>
      <p className="text-saffron-600 font-devanagari text-sm text-center px-4 leading-relaxed opacity-80">
        {label}
      </p>
    </div>
  )
}
