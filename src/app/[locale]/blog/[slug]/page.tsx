import type { Metadata } from 'next'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { BlogImage } from '@/components/blog/BlogImage'
import { BlogPostRenderer } from '@/components/blog/BlogPostRenderer'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.titleHindi || post.title} | Sadhvi Samahita Ji`,
    description: post.excerpt,
    alternates: {
      canonical: locale === 'hi'
        ? `https://sadhvisamahita.com/blog/${post.slug}`
        : `https://sadhvisamahita.com/en/blog/${post.slug}`,
      languages: {
        hi: `https://sadhvisamahita.com/blog/${post.slug}`,
        en: `https://sadhvisamahita.com/en/blog/${post.slug}`,
        'x-default': `https://sadhvisamahita.com/blog/${post.slug}`,
      },
    },
    openGraph: post.coverImage
      ? {
          title: post.titleHindi || post.title,
          description: post.excerpt,
          images: [{ url: post.coverImage, width: 1200, height: 700, alt: post.titleHindi || post.title }],
        }
      : undefined,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  return (
    <main style={{ background: '#FFF8E8', minHeight: '100vh', padding: '80px 16px 120px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        {/* Back button */}
        <Link href="/blog" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#D4700A',
          textDecoration: 'none',
          fontSize: '14px',
          marginBottom: '40px',
          opacity: 0.85,
          fontFamily: 'var(--font-devanagari)',
        }}>
          ← वापस जाएं
        </Link>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '12px',
                padding: '4px 12px',
                background: '#D4700A18',
                color: '#B85500',
                borderRadius: '20px',
                border: '1px solid #D4700A33',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        {post.titleHindi && (
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontFamily: 'var(--font-devanagari)',
            color: '#5C2200',
            lineHeight: 1.4,
            marginBottom: '8px',
          }}>
            {post.titleHindi}
          </h1>
        )}
        <h2 style={{
          fontSize: post.titleHindi ? '20px' : 'clamp(24px, 4vw, 38px)',
          fontFamily: 'var(--font-display)',
          color: '#8C3A00',
          fontWeight: post.titleHindi ? 400 : 700,
          marginBottom: '16px',
          opacity: post.titleHindi ? 0.8 : 1,
        }}>
          {post.title}
        </h2>

        {/* Date */}
        <p style={{
          fontSize: '14px',
          color: '#8C3A00',
          opacity: 0.7,
          marginBottom: '24px',
          fontFamily: 'var(--font-body)',
        }}>
          {new Date(post.date).toLocaleDateString('hi-IN', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
        </p>

        {/* Gold divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #F2C94C, transparent)',
          marginBottom: '32px',
        }} />

        {/* Cover image */}
        {post.coverImage && (
          <BlogImage src={post.coverImage} alt={post.titleHindi || post.title} />
        )}

        {/* Content blocks */}
        <BlogPostRenderer content={post.content} />

      </div>
    </main>
  )
}
