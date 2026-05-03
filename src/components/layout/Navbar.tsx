'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Phone, Menu, X } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import LanguageToggle from './LanguageToggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/katha', key: 'katha' },
  { href: '/seva-karya', key: 'sevaKarya' },
  { href: '/ashram', key: 'ashram' },
  { href: '/seva', key: 'seva' },
  { href: '/satsang', key: 'satsang' },
  { href: '/gallery', key: 'gallery' },
  { href: '/programs', key: 'programs' },
  { href: '/vichar-dhara', key: 'vicharDhara' },
  { href: '/daan', key: 'daan' },
  { href: '/sampark', key: 'sampark' },
] as const

export default function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-maroon-900/95 backdrop-blur-md border-b border-gold-300/20 shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-xl">🪔</span>
              <span className={cn(
                'font-devanagari text-base md:text-lg leading-tight transition-colors duration-300',
                isScrolled ? 'text-gold-300' : 'text-saffron-700'
              )}>
                साध्वी समाहिता जी
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 xl:gap-2 flex-1 justify-center mx-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    'px-2 lg:px-2.5 py-1.5 rounded-md text-xs lg:text-sm font-body transition-all duration-200 whitespace-nowrap min-h-[36px] flex items-center',
                    isActive(link.href)
                      ? isScrolled
                        ? 'text-gold-300'
                        : 'text-saffron-600 font-semibold'
                      : isScrolled
                        ? 'text-cream-200 hover:text-gold-200'
                        : 'text-maroon-800 hover:text-saffron-600'
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {/* Desktop Right: Language + CTA */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <LanguageToggle />
              <Link
                href="/sampark"
                className={cn(
                  'px-4 py-2 border rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap',
                  isScrolled
                    ? 'border-gold-300 text-gold-300 hover:bg-gold-300/10 hover:border-gold-200'
                    : 'border-saffron-600 text-saffron-700 hover:bg-saffron-50 hover:border-saffron-700'
                )}
              >
                {t('sevaKarein')}
              </Link>
            </div>

            {/* Mobile Right: Phone + Hamburger */}
            <div className="flex md:hidden items-center gap-1">
              <a
                href="tel:+918650620909"
                className={cn(
                  'p-2.5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
                  isScrolled ? 'text-gold-300 hover:text-gold-200' : 'text-saffron-700 hover:text-saffron-600'
                )}
                aria-label="कॉल करें"
              >
                <Phone size={20} />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  'p-2.5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
                  isScrolled ? 'text-cream-100 hover:text-gold-300' : 'text-maroon-800 hover:text-saffron-600'
                )}
                aria-label={isMenuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-maroon-900/98 backdrop-blur-lg flex flex-col md:hidden"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-gold-300/10">
              <span className="font-devanagari text-gold-300 text-base">साध्वी समाहिता जी</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 text-cream-200 hover:text-gold-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="मेनू बंद करें"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'flex items-center py-4 border-b border-gold-300/10 text-base font-devanagari transition-colors min-h-[48px]',
                      isActive(link.href)
                        ? 'text-gold-300'
                        : 'text-cream-200 hover:text-gold-300'
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom: Language toggle */}
            <div className="px-4 py-6 border-t border-gold-300/10 flex items-center justify-between">
              <LanguageToggle />
              <Link
                href="/sampark"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-2.5 bg-saffron-500 text-cream-50 rounded-lg text-sm font-medium
                  hover:bg-saffron-600 transition-colors"
              >
                {t('sevaKarein')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
