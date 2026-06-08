import type { Metadata } from 'next'
import AboutClient from './AboutClient'

const OG_IMAGE = 'https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_1200/v1777971893/DIDIMAA_awc0px.jpg'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'About Sadhvi Samahita Ji | Spiritual Orator Vrindavan',
    description:
      'Learn about Sadhvi Samahita Ji, an international spiritual orator and katha vachak from Vrindavan spreading devotion through Bhagavat Katha and spiritual teachings.',
    keywords: [
      'Sadhvi Samahita Ji',
      'About Sadhvi Samahita',
      'Spiritual Orator Vrindavan',
      'Katha Vachak',
      'Bhagavat Katha Speaker',
      'साध्वी समाहिता जी',
    ],
    alternates: {
      canonical: locale === 'hi'
        ? 'https://sadhvisamahita.com/about'
        : 'https://sadhvisamahita.com/en/about',
      languages: {
        hi: 'https://sadhvisamahita.com/about',
        en: 'https://sadhvisamahita.com/en/about',
        'x-default': 'https://sadhvisamahita.com/about',
      },
    },
    openGraph: {
      title: 'About Sadhvi Samahita Ji | Spiritual Orator Vrindavan',
      description:
        'Sadhvi Samahita Ji is an international spiritual orator and katha vachak from Vrindavan spreading devotion and spiritual wisdom.',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Sadhvi Samahita Ji' }],
    },
  }
}

export default function AboutPage() {
  return <AboutClient />
}
