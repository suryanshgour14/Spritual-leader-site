import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  titleEn?: string
  align?: 'left' | 'center' | 'right'
  icon?: string
  className?: string
  light?: boolean
}

export default function SectionHeader({
  title,
  titleEn,
  align = 'center',
  icon,
  className,
  light = false,
}: SectionHeaderProps) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align]

  return (
    <div className={cn('flex flex-col gap-2 mb-10', alignClass, className)}>
      {icon && (
        <span className="text-3xl mb-1 block" aria-hidden="true">{icon}</span>
      )}

      <div className="relative inline-block">
        <h2
          className={cn(
            'font-devanagari text-3xl md:text-4xl lg:text-5xl leading-tight',
            light ? 'text-cream-50' : 'text-saffron-800'
          )}
        >
          {title}
        </h2>
        {/* Gold underline glow */}
        <span
          className={cn(
            'absolute -bottom-2 h-0.5 w-3/4 bg-gradient-to-r from-transparent via-gold-300 to-transparent',
            align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
          )}
          aria-hidden="true"
        >
          <span className="absolute inset-0 blur-sm bg-gold-300/50" />
        </span>
      </div>

      {titleEn && (
        <p
          className={cn(
            'font-display text-base md:text-lg mt-3',
            light ? 'text-gold-200' : 'text-gold-500'
          )}
        >
          {titleEn}
        </p>
      )}
    </div>
  )
}
