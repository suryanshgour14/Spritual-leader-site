import type { Metadata } from 'next'
import { Tiro_Devanagari_Sanskrit, DM_Serif_Display, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import LenisProvider from '@/components/providers/LenisProvider'
import PageTransition from '@/components/providers/PageTransition'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
import { GoogleAnalytics } from '@next/third-parties/google'
import '../globals.css'

const tiroDevanagari = Tiro_Devanagari_Sanskrit({
  weight: '400',
  subsets: ['devanagari', 'latin'],
  variable: '--font-devanagari',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sadhvisamahita.com'),
  title: {
    default: 'Sadhvi Samahita Ji | Bhagavat Katha | Vrindavan',
    template: '%s | Sadhvi Samahita Ji',
  },
  description:
    'Sadhvi Samahita Ji is an international spiritual orator from Vrindavan. Book Bhagavat Katha, Ram Katha, and spiritual programs.',
  keywords: [
    'Sadhvi Samahita',
    'Bhagavat Katha',
    'Ram Katha',
    'Shiv Mahapuran',
    'Vrindavan',
    'Katha Booking',
    'International Spiritual Orator',
    'साध्वी समाहिता',
    'कथा वाचिका',
    'Spiritual Speaker',
  ],
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    alternateLocale: 'en_US',
    siteName: 'Sadhvi Samahita Ji',
    images: [{ url: 'https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_1200/v1777971890/katha1_sr9v5n.jpg', width: 1200, height: 630, alt: 'Sadhvi Samahita Ji' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

// Pre-render all locale variants at build time → instant navigation
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'hi' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://sadhvisamahita.com/#person',
        name: 'Sadhvi Samahita Ji',
        alternateName: 'साध्वी समाहिता जी',
        description: 'International spiritual orator and katha vachak from Shri Dham Vrindavan, specialising in Bhagavat Katha, Ram Katha, and Shiv Mahapuran.',
        jobTitle: 'Spiritual Orator, Katha Vachak',
        url: 'https://sadhvisamahita.com',
        image: 'https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_800/v1777971893/DIDIMAA_awc0px.jpg',
        sameAs: [
          'https://www.youtube.com/@SadhviSamahita',
          'https://www.facebook.com/SadhviSamahitaDidi',
          'https://www.instagram.com/sadhvisamahita/',
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vrindavan',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://sadhvisamahita.com/#org',
        name: 'Radhika Ashray',
        url: 'https://sadhvisamahita.com',
        description: 'Spiritual and social welfare organisation run by Sadhvi Samahita Ji for Gau Seva, Beti Shiksha, and community upliftment at Shri Dham Vrindavan.',
        founder: { '@id': 'https://sadhvisamahita.com/#person' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vrindavan',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-9999649311',
          contactType: 'customer service',
          availableLanguage: ['Hindi', 'English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sadhvisamahita.com/#website',
        name: 'Sadhvi Samahita Ji',
        url: 'https://sadhvisamahita.com',
        description: 'Official website of Sadhvi Samahita Ji — International Spiritual Orator, Katha Vachak, Shri Dham Vrindavan.',
        publisher: { '@id': 'https://sadhvisamahita.com/#org' },
        inLanguage: ['hi', 'en'],
      },
    ],
  }

  return (
    <html
      lang={locale}
      className={`${tiroDevanagari.variable} ${dmSerif.variable} ${inter.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-cream-100 text-saffron-900">
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <Navbar />
            <main className="min-h-screen pt-16">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <WhatsAppFloatingButton />
            <MobileBottomBar />
          </LenisProvider>
        </NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  )
}
