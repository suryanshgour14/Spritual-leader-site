import type { Metadata } from 'next'
import { Tiro_Devanagari_Sanskrit, DM_Serif_Display, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import LenisProvider from '@/components/providers/LenisProvider'
import LiveBanner from '@/components/layout/LiveBanner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
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
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sadhvisamahita.com'),
  title: {
    default: 'साध्वी समाहिता जी | Sadhvi Samahita Ji',
    template: '%s | Sadhvi Samahita Ji',
  },
  description:
    'श्रीमद्भागवत कथा, राम कथा, शिव महापुराण – पूज्या साध्वी समाहिता जी, श्री धाम वृंदावन',
  keywords: [
    'Sadhvi Samahita',
    'Bhagavat Katha',
    'Ram Katha',
    'Shiv Mahapuran',
    'Vrindavan',
    'Katha Booking',
    'साध्वी समाहिता',
    'कथा वाचिका',
  ],
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    alternateLocale: 'en_US',
    siteName: 'Sadhvi Samahita Ji',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
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

  return (
    <html
      lang={locale}
      className={`${tiroDevanagari.variable} ${dmSerif.variable} ${inter.variable}`}
    >
      <body className="font-body antialiased min-h-screen bg-cream-100 text-saffron-900">
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <LiveBanner />
            <Navbar />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
            <WhatsAppFloatingButton />
            <MobileBottomBar />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
