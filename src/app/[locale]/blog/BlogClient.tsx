'use client'
import { motion } from 'framer-motion'
import { BlogPost } from '@/lib/blog'
import { BlogCardImage } from '@/components/blog/BlogCardImage'
import { Link } from '@/i18n/navigation'

interface Props {
  posts: BlogPost[]
}

export default function BlogListClient({ posts }: Props) {
  return (
    <main style={{ background: '#FFF8E8', minHeight: '100vh', padding: '80px 16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <p style={{
            fontSize: '13px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#D4700A',
            marginBottom: '12px',
            fontFamily: 'var(--font-body)',
          }}>
            विचार धारा
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontFamily: 'var(--font-devanagari)',
            color: '#5C2200',
            marginBottom: '16px',
            lineHeight: 1.3,
          }}>
            दीदी जी के विचार
          </h1>
          <div style={{
            width: '80px',
            height: '2px',
            background: 'linear-gradient(to right, transparent, #F2C94C, transparent)',
            margin: '0 auto',
          }} />
        </motion.div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#8C3A00' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🪷</div>
            <p style={{ fontSize: '18px', fontFamily: 'var(--font-devanagari)' }}>शीघ्र नए विचार आएंगे</p>
          </div>
        )}

        {/* Posts grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px',
        }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <motion.article
                  whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(180,100,10,0.18)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    background: '#FFFDF6',
                    borderRadius: '16px',
                    border: '1.5px solid #E8C88A',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(180,100,10,0.10)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ borderBottom: '1px solid #E8C88A' }}>
                    <BlogCardImage src={post.coverImage} alt={post.titleHindi || post.title} />
                  </div>

                  <div style={{ padding: '20px' }}>
                    {/* Tags */}
                    {post.tags?.length > 0 && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        {post.tags.map(tag => (
                          <span key={tag} style={{
                            fontSize: '11px',
                            padding: '3px 10px',
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
                      <h2 style={{
                        fontSize: '20px',
                        fontFamily: 'var(--font-devanagari)',
                        color: '#5C2200',
                        marginBottom: '4px',
                        lineHeight: 1.5,
                      }}>
                        {post.titleHindi}
                      </h2>
                    )}
                    <h3 style={{
                      fontSize: post.titleHindi ? '14px' : '18px',
                      fontFamily: 'var(--font-display)',
                      color: '#8C3A00',
                      marginBottom: '10px',
                      fontWeight: post.titleHindi ? 400 : 600,
                      opacity: post.titleHindi ? 0.8 : 1,
                    }}>
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p style={{
                      fontSize: '14px',
                      color: '#5C2200',
                      opacity: 0.75,
                      lineHeight: 1.7,
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontFamily: 'var(--font-devanagari)',
                    }}>
                      {post.excerpt}
                    </p>

                    {/* Date + Read more */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: '#8C3A00', opacity: 0.7, fontFamily: 'var(--font-body)' }}>
                        {new Date(post.date).toLocaleDateString('hi-IN', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </span>
                      <span style={{ fontSize: '13px', color: '#D4700A', fontWeight: 500 }}>
                        पढ़ें →
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
