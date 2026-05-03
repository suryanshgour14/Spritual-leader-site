'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface LanguageToggleProps {
  className?: string
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchTo = (newLocale: 'hi' | 'en') => {
    if (newLocale === locale) return
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale)
    }
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-gold-300/50 overflow-hidden text-xs font-medium',
        className
      )}
    >
      {(['hi', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchTo(lang)}
          className={cn(
            'px-3 py-1.5 transition-all duration-200 min-w-[36px]',
            locale === lang
              ? 'bg-saffron-500 text-cream-50'
              : 'text-gold-300 hover:text-gold-200 hover:bg-gold-300/10'
          )}
          aria-label={lang === 'hi' ? 'हिंदी में देखें' : 'View in English'}
        >
          {lang === 'hi' ? 'हि' : 'EN'}
        </button>
      ))}
    </div>
  )
}
