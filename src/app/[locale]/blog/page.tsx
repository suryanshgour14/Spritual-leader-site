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
      canonical: `https://sadhvisamahita.com/${locale}/blog`,
      languages: {
        en: 'https://sadhvisamahita.com/en/blog',
        hi: 'https://sadhvisamahita.com/hi/blog',
      },
    },
  }
}

export default function BlogPage() {
  return <BlogClient />
}
