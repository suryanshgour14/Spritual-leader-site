import { getTranslations } from 'next-intl/server'
import { Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import LanguageToggle from './LanguageToggle'
import GlowOrbs from '@/components/shared/GlowOrbs'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919999649311'
const WA_MESSAGE = encodeURIComponent('नमस्ते दीदी जी, कृपया संपर्क करें।')

const navLinks = [
  { href: '/',         key: 'home'    },
  { href: '/about',    key: 'about'   },
  { href: '/katha',    key: 'katha'   },
  { href: '/#vaani',   key: 'vaani'   },
  { href: '/media',    key: 'media'   },
  { href: '/seva',     key: 'seva'    },
  { href: '/wisdom',   key: 'wisdom'  },
  { href: '/contact',  key: 'contact' },
] as const

const serviceLinks = [
  'bhagavat',
  'ram',
  'shiv',
  'devi',
  'bhajan',
  'sunderkand',
  'motivational',
] as const

export default async function Footer() {
  const tNav = await getTranslations('nav')
  const tFooter = await getTranslations('footer')
  const tServices = await getTranslations('services.items')

  return (
    <footer className="relative bg-maroon-900 text-cream-100 overflow-hidden">
      {/* Glow orb bottom-left */}
      <GlowOrbs
        variant="gold"
        positions={[{ size: 400, bottom: '-5rem', left: '-5rem', duration: 13 }]}
      />

      {/* Gold divider top */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />

      {/* Main footer content */}
      <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Col 1: Branding */}
          <div className="flex flex-col gap-4">
            <h3 className="font-devanagari text-3xl text-gold-300 leading-tight">
              साध्वी समाहिता जी
            </h3>
            <p className="font-devanagari text-gold-200 italic text-sm leading-relaxed">
              {tFooter('tagline')}
            </p>
            <div className="flex items-center gap-2 text-cream-300 text-sm">
              <MapPin size={14} className="text-gold-400 flex-shrink-0" />
              <span className="font-devanagari">{tFooter('location')}</span>
            </div>
            {/* Logo medallion */}
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold-300/30 flex-shrink-0">
              <Image src="/didi-logo.svg" alt="साध्वी समाहिता जी" width={56} height={56} className="w-full h-full" />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display text-gold-300 text-lg mb-4">
              {tFooter('quick_links')}
            </h4>
            <ul className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="font-devanagari text-cream-200 hover:text-gold-300 transition-colors duration-200 py-1 block text-sm"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-display text-gold-300 text-lg mb-4">
              {tFooter('services')}
            </h4>
            <ul className="flex flex-col gap-0.5">
              {serviceLinks.map((key) => (
                <li key={key}>
                  <Link
                    href="/seva"
                    className="text-cream-200 hover:text-gold-300 transition-colors duration-200 py-1 block text-sm font-devanagari"
                  >
                    {tServices(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-display text-gold-300 text-lg mb-4">
              {tFooter('contact')}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:+918650620909"
                  className="flex items-center gap-2 text-cream-200 hover:text-gold-300 transition-colors text-sm group"
                >
                  <Phone size={14} className="text-gold-400 flex-shrink-0 group-hover:text-gold-300" />
                  +91-8650620909
                </a>
              </li>
              <li>
                <a
                  href="tel:+919999649311"
                  className="flex items-center gap-2 text-cream-200 hover:text-gold-300 transition-colors text-sm group"
                >
                  <Phone size={14} className="text-gold-400 flex-shrink-0 group-hover:text-gold-300" />
                  +91-9999649311
                </a>
              </li>
              <li>
                <a
                  href="mailto:bharatimaa1@gmail.com"
                  className="flex items-center gap-2 text-cream-200 hover:text-gold-300 transition-colors text-sm break-all group"
                >
                  <Mail size={14} className="text-gold-400 flex-shrink-0 group-hover:text-gold-300" />
                  bharatimaa1@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30
                    text-green-400 rounded-lg text-sm hover:bg-green-600/30 transition-colors mt-1"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </li>

              {/* Social Icons — inline SVGs (lucide v1 removed branded icons) */}
              <li className="flex items-center gap-3 mt-2">
                <a href="https://www.youtube.com/@SadhviSamahita" target="_blank" rel="noopener noreferrer"
                  className="p-2 text-cream-300 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/SadhviSamahitaDidi" target="_blank" rel="noopener noreferrer"
                  className="p-2 text-cream-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-white/5" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/sadhvisamahita/" target="_blank" rel="noopener noreferrer" className="p-2 text-cream-300 hover:text-pink-400 transition-colors rounded-lg hover:bg-white/5" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 relative">
          {/* Gold gradient divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream-400 text-xs text-center md:text-left">
              © 2026 Sadhvi Samahita Ji · Shri Dham Vrindavan · {tFooter('rights')}
            </p>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
