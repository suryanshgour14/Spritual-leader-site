import type { Metadata } from 'next'
import ContactClient from './ContactClient'

const OG_IMAGE = 'https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_1200/v1777971893/DIDIMAA_awc0px.jpg'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'संपर्क करें | Sadhvi Samahita Ji — Vrindavan',
    description:
      'Contact Sadhvi Samahita Ji for katha booking, seva information, or personal guidance. Reach us via WhatsApp from Shri Dham Vrindavan.',
    keywords: [
      'Sadhvi Samahita Ji contact',
      'katha booking Vrindavan',
      'संपर्क करें साध्वी समाहिता जी',
      'Radhika Ashray contact',
      'Vrindavan katha',
    ],
    alternates: {
      canonical: `https://sadhvisamahita.com/${locale}/contact`,
      languages: {
        en: 'https://sadhvisamahita.com/en/contact',
        hi: 'https://sadhvisamahita.com/hi/contact',
      },
    },
    openGraph: {
      title: 'संपर्क करें | Sadhvi Samahita Ji',
      description:
        'Reach Sadhvi Samahita Ji for katha, seva, or personal guidance. WhatsApp & call available.',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Contact Sadhvi Samahita Ji' }],
    },
  }
}

export default function ContactPage() {
  return <ContactClient />
}
