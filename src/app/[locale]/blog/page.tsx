import type { Metadata } from 'next'
import BlogClient from './BlogClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Blog | Sadhvi Samahita Ji — Spiritual Writings',
    description:
      'Spiritual articles, katha reflections, and life philosophy by Sadhvi Samahita Ji. Coming soon.',
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
