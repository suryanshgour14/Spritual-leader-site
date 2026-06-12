'use client'
import { ContentBlock } from '@/lib/blog'
import { BlogImage } from './BlogImage'
import { BlogImageGrid } from './BlogImageGrid'

interface Props {
  content: ContentBlock[]
}

export function BlogPostRenderer({ content }: Props) {
  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      {content.map((block, index) => {
        switch (block.type) {

          case 'text':
            return (
              <p key={index} style={{
                fontSize: '17px',
                lineHeight: '1.95',
                color: '#2E1000',
                margin: '20px 0',
                fontFamily: 'var(--font-devanagari)',
              }}>
                {block.value}
              </p>
            )

          case 'heading':
            return (
              <h2 key={index} style={{
                fontSize: '24px',
                fontFamily: 'var(--font-display)',
                color: '#B85500',
                margin: '36px 0 16px 0',
                paddingBottom: '8px',
                borderBottom: '2px solid #F2C94C44',
              }}>
                {block.value}
              </h2>
            )

          case 'quote':
            return (
              <blockquote key={index} style={{
                borderLeft: '4px solid #F2C94C',
                background: '#FFF8ED',
                borderRadius: '0 12px 12px 0',
                padding: '20px 24px',
                margin: '28px 0',
              }}>
                <p style={{
                  fontSize: '18px',
                  fontStyle: 'italic',
                  color: '#5C2200',
                  lineHeight: '1.9',
                  margin: 0,
                  fontFamily: 'var(--font-devanagari)',
                  whiteSpace: 'pre-line',
                }}>
                  {block.value}
                </p>
                {block.attribution && (
                  <cite style={{
                    display: 'block',
                    marginTop: '10px',
                    fontSize: '14px',
                    color: '#8C3A00',
                    fontStyle: 'normal',
                  }}>
                    — {block.attribution}
                  </cite>
                )}
              </blockquote>
            )

          case 'image':
            return (
              <BlogImage
                key={index}
                src={block.src}
                caption={block.caption}
                alt={block.caption || ''}
              />
            )

          case 'images':
            return (
              <BlogImageGrid
                key={index}
                srcs={block.srcs}
                captions={block.captions}
              />
            )

          default:
            return null
        }
      })}
    </div>
  )
}
