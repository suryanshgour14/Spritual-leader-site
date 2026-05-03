import { cn } from '@/lib/utils'

interface SpiritualCardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'default' | 'lg'
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  default: 'p-6',
  lg: 'p-8',
}

export default function SpiritualCard({
  children,
  className,
  hoverable = true,
  padding = 'default',
}: SpiritualCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gold-300/20',
        'bg-gradient-to-br from-cream-50/90 to-cream-200/60',
        'transition-all duration-300',
        hoverable && [
          'hover:border-gold-300/50',
          'hover:shadow-[0_0_20px_rgba(212,134,10,0.12),0_0_60px_rgba(212,134,10,0.06),inset_0_1px_0_rgba(242,201,76,0.2)]',
          'hover:-translate-y-0.5',
        ],
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
