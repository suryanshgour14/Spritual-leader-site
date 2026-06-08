import type { Metadata } from 'next'
import KathaClient from './KathaClient'

const OG_IMAGE = 'https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_1200/v1777971890/katha1_sr9v5n.jpg'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Katha | Sadhvi Samahita Ji — Bhagavat, Ram, Shiv, Devi Katha',
    description:
      'Book Sadhvi Samahita Ji for Shrimadbhagavat Katha, Ram Katha, Shiv Mahapuran, and Devi Bhagavat Katha. Invite her for divine spiritual programs in your city.',
    keywords: [
      'Sadhvi Samahita Ji Katha',
      'Shrimadbhagavat Katha booking',
      'Ram Katha',
      'Shiv Mahapuran Katha',
      'Devi Bhagavat Katha',
      'Katha booking Vrindavan',
      'साध्वी समाहिता जी कथा',
      'श्रीमद्भागवत कथा बुकिंग',
    ],
    alternates: {
      canonical: locale === 'hi'
        ? 'https://sadhvisamahita.com/katha'
        : 'https://sadhvisamahita.com/en/katha',
      languages: {
        hi: 'https://sadhvisamahita.com/katha',
        en: 'https://sadhvisamahita.com/en/katha',
        'x-default': 'https://sadhvisamahita.com/katha',
      },
    },
    openGraph: {
      title: 'Katha & Spiritual Programs | Sadhvi Samahita Ji',
      description:
        'Invite Sadhvi Samahita Ji for divine katha and spiritual programs — Bhagavat, Ram, Shiv Mahapuran, Devi Bhagavat.',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Sadhvi Samahita Ji Katha' }],
    },
  }
}

export default function KathaPage() {
  return <KathaClient />
}
