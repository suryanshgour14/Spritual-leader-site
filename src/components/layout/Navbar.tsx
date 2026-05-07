'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Phone, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import LanguageToggle from './LanguageToggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/',        key: 'home'    as const, scrollId: null },
  { href: '/about',   key: 'about'   as const, scrollId: null },
  { href: '/katha',   key: 'katha'   as const, scrollId: null },
  { href: '/#vaani',  key: 'vaani'   as const, scrollId: 'vaani' },
  { href: '/media',   key: 'media'   as const, scrollId: null },
  { href: '/seva',        key: 'seva' as const, scrollId: null },
  { href: '/wisdom',  key: 'wisdom'  as const, scrollId: null },
  { href: '/contact', key: 'contact' as const, scrollId: null },
]

export default function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // After cross-page navigation, scroll to pending section (e.g. /#vaani from /about).
  // Polls until element appears — necessary because VaaniSection is dynamic (ssr:false)
  // and may not be in the DOM for 500-800ms after the route change.
  useEffect(() => {
    const target = sessionStorage.getItem('pendingScroll')
    if (!target) return
    sessionStorage.removeItem('pendingScroll')

    let attempts = 0
    const interval = setInterval(() => {
      const el = document.getElementById(target)
      if (el) {
        clearInterval(interval)
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (++attempts >= 30) {
        clearInterval(interval) // give up after 3 seconds
      }
    }, 100)

    return () => clearInterval(interval)
  }, [pathname])

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

  const isActive = (href: string, scrollId: string | null) => {
    if (scrollId) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  function handleSevaKareinClick(e: React.MouseEvent) {
    e.preventDefault()
    setIsMenuOpen(false)
    const el = document.getElementById('donate')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      sessionStorage.setItem('pendingScroll', 'donate')
      router.push('/seva')
    }
  }

  function handleScrollClick(e: React.MouseEvent, scrollId: string | null) {
    if (!scrollId) return
    e.preventDefault()
    setIsMenuOpen(false)
    const el = document.getElementById(scrollId)
    if (el) {
      // Same page — scroll directly
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Different page — store target, navigate to home, scroll after render
      sessionStorage.setItem('pendingScroll', scrollId)
      router.push('/')
    }
  }

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-maroon-900/95 backdrop-blur-md border-b border-gold-300/20 shadow-lg'
            : isMenuOpen
              ? 'bg-maroon-900 border-b border-gold-300/15'
              : 'bg-transparent'
        )}
      >
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0"
              onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              <Image src="/didi-logo.svg" alt="Logo" width={36} height={36} className="rounded-full flex-shrink-0" />
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
                  onClick={(e) => handleScrollClick(e, link.scrollId)}
                  className={cn(
                    'px-2 lg:px-2.5 py-1.5 rounded-md text-xs lg:text-sm font-body transition-all duration-200 whitespace-nowrap min-h-[36px] flex items-center',
                    isActive(link.href, link.scrollId)
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
                href="/seva#donate"
                onClick={handleSevaKareinClick}
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
            className="fixed inset-0 z-50 flex flex-col md:hidden"
            style={{ background: '#120202' }}
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-gold-300/10">
              <div className="flex items-center gap-2">
                <Image src="/didi-logo.svg" alt="Logo" width={32} height={32} className="rounded-full" />
                <span className="font-devanagari text-gold-300 text-base">साध्वी समाहिता जी</span>
              </div>
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
                    onClick={(e) => { handleScrollClick(e, link.scrollId); setIsMenuOpen(false) }}
                    className={cn(
                      'flex items-center py-4 border-b border-gold-300/10 text-base font-devanagari transition-colors min-h-[48px]',
                      isActive(link.href, link.scrollId)
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
                href="/seva#donate"
                onClick={handleSevaKareinClick}
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
