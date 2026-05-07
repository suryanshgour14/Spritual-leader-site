import { getTranslations } from 'next-intl/server'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import LanguageToggle from './LanguageToggle'
import GlowOrbs from '@/components/shared/GlowOrbs'
import FooterClientLinks from './FooterClientLinks'

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

          {/* Col 4: Contact — client island handles tracking */}
          <div>
            <h4 className="font-display text-gold-300 text-lg mb-4">
              {tFooter('contact')}
            </h4>
            <FooterClientLinks />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 relative">
          {/* Gold gradient divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream-400 text-xs text-center md:text-left">
              © 2026 Sadhvi Samahita Ji · Shri Dham Vrindavan · All Rights Reserved
            </p>
            <LanguageToggle />
          </div>
          <p className="text-center text-[10px] text-cream-400/40 mt-4 font-body tracking-wide">
            Crafted with devotion by Yash Raj &amp; Suryansh
          </p>
        </div>
      </div>
    </footer>
  )
}
