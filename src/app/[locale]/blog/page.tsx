import type { Metadata } from 'next'
import BlogClient from './BlogClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'गुरु-शिष्य की दिव्य परंपरा | Blog — Sadhvi Samahita Ji',
    description:
      'परम पूज्या दीदी माँ ऋतंभरा जी एवं साध्वी समाहिता जी की गुरु-शिष्य परंपरा पर आध्यात्मिक लेख। Spiritual article on the divine Guru-Shishya tradition of Sadhvi Ritambhara and Sadhvi Samahita Ji.',
    keywords: [
      'Sadhvi Samahita Ji',
      'Sadhvi Ritambhara',
      'Guru Shishya Parampara',
      'गुरु शिष्य परंपरा',
      'दीदी माँ ऋतंभरा',
      'साध्वी समाहिता',
      'Bhakti',
      'Vrindavan',
      'Sanatan Dharma',
    ],
    openGraph: {
      title: 'गुरु-शिष्य की दिव्य परंपरा | Sadhvi Samahita Ji',
      description: 'परम पूज्या दीदी माँ ऋतंभरा जी एवं साध्वी समाहिता जी की दिव्य गुरु-शिष्य परंपरा पर आध्यात्मिक लेख।',
      images: [{ url: 'https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_1200/v1781242015/WhatsApp_Image_2026-06-12_at_07.41.26_blhjwq.jpg', width: 1200, height: 700, alt: 'गुरु-शिष्य परंपरा — Sadhvi Samahita Ji' }],
    },
    alternates: {
      canonical: locale === 'hi'
        ? 'https://sadhvisamahita.com/blog'
        : 'https://sadhvisamahita.com/en/blog',
      languages: {
        hi: 'https://sadhvisamahita.com/blog',
        en: 'https://sadhvisamahita.com/en/blog',
        'x-default': 'https://sadhvisamahita.com/blog',
      },
    },
  }
}

export default function BlogPage() {
  return <BlogClient />
}
