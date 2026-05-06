import type { Metadata } from 'next'
import MediaClient from './MediaClient'

const OG_IMAGE = 'https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_1200/v1777971914/katha2_uqyyte.jpg'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'झलकियाँ | Sadhvi Samahita Ji — Photo Gallery',
    description:
      'Photo gallery from katha events, ashram seva, and spiritual programs of Sadhvi Samahita Ji at Shri Dham Vrindavan.',
    alternates: {
      canonical: `https://sadhvisamahita.com/${locale}/media`,
      languages: {
        en: 'https://sadhvisamahita.com/en/media',
        hi: 'https://sadhvisamahita.com/hi/media',
      },
    },
    openGraph: {
      title: 'झलकियाँ | Sadhvi Samahita Ji',
      description: 'Glimpses from katha, seva, and spiritual programs.',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Sadhvi Samahita Ji Katha Gallery' }],
    },
  }
}

export default function MediaPage() {
  return <MediaClient />
}
