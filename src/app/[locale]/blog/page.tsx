import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogListClient from './BlogClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Blog | Sadhvi Samahita Ji — Spiritual Writings',
    description:
      'आध्यात्मिक लेख, कथा अनुभव एवं जीवन दर्शन — साध्वी समाहिता जी के विचार। Spiritual articles and reflections by Sadhvi Samahita Ji.',
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
  const posts = getAllPosts()
  return <BlogListClient posts={posts} />
}
