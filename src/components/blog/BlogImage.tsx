'use client'
import Image from 'next/image'

interface BlogImageProps {
  src: string
  alt?: string
  caption?: string | null
}

export function BlogImage({ src, alt = '', caption }: BlogImageProps) {
  return (
    <figure style={{ margin: '28px 0' }}>
      <div style={{
        width: '100%',
        background: '#FFF8E8',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
      }}>
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 780px"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '640px',
            objectFit: 'contain',
            borderRadius: '8px',
            display: 'block',
          }}
        />
      </div>
      {caption && (
        <figcaption style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#8C3A00',
          marginTop: '8px',
          fontStyle: 'italic',
          opacity: 0.8,
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
