import type { Metadata } from 'next'
import SevaClient from './SevaClient'

const OG_IMAGE = 'https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_1200/v1777971926/S3_uto17y.jpg'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Seva | Sadhvi Samahita Ji — Gau Seva, Beti Shiksha, Vivah Sahayog',
    description:
      'Join Sadhvi Samahita Ji in her mission of seva — supporting girls education, gau seva, safe accommodation, vivah sahayog, and competitive exam guidance for underprivileged families in Vrindavan.',
    keywords: [
      'Sadhvi Samahita Ji seva',
      'Gau seva Vrindavan',
      'Beti shiksha sahayog',
      'Vivah sahayog',
      'सेवा समर्पण',
      'साध्वी समाहिता जी सेवा',
      'गौ सेवा वृन्दावन',
      'बेटी शिक्षा सहयोग',
      'donate spiritual',
      'Radhika Ashray seva',
    ],
    alternates: {
      canonical: locale === 'hi'
        ? 'https://sadhvisamahita.com/seva'
        : 'https://sadhvisamahita.com/en/seva',
      languages: {
        hi: 'https://sadhvisamahita.com/seva',
        en: 'https://sadhvisamahita.com/en/seva',
        'x-default': 'https://sadhvisamahita.com/seva',
      },
    },
    openGraph: {
      title: 'Seva & Samarpan | Sadhvi Samahita Ji',
      description:
        'Be part of a journey of service — supporting girls education, gau seva, safe PG accommodation, and social welfare through Sadhvi Samahita Ji.',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Seva — Sadhvi Samahita Ji' }],
    },
  }
}

export default function SevaPage() {
  return <SevaClient />
}
