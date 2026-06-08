import type { Metadata } from 'next'
import WisdomClient from './WisdomClient'

const OG_IMAGE = 'https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_1200/v1777971913/katha4_jkku0m.jpg'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'विचार | Sadhvi Samahita Ji — Spiritual Wisdom',
    description:
      'Spiritual thoughts, reflections, and wisdom from Sadhvi Samahita Ji — inspiring quotes on bhakti, seva, and Sanatan Dharma.',
    alternates: {
      canonical: locale === 'hi'
        ? 'https://sadhvisamahita.com/wisdom'
        : 'https://sadhvisamahita.com/en/wisdom',
      languages: {
        hi: 'https://sadhvisamahita.com/wisdom',
        en: 'https://sadhvisamahita.com/en/wisdom',
        'x-default': 'https://sadhvisamahita.com/wisdom',
      },
    },
    openGraph: {
      title: 'विचार | Sadhvi Samahita Ji',
      description: 'Spiritual wisdom and reflections from Sadhvi Samahita Ji.',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Spiritual Wisdom — Sadhvi Samahita Ji' }],
    },
  }
}

export default function WisdomPage() {
  return <WisdomClient />
}
