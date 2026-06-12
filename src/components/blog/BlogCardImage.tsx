'use client'
import Image from 'next/image'

interface BlogCardImageProps {
  src: string | null
  alt?: string
}

export function BlogCardImage({ src, alt = '' }: BlogCardImageProps) {
  if (!src) {
    return (
      <div style={{
        width: '100%',
        height: '220px',
        background: 'linear-gradient(135deg, #D4700A22, #F2C94C33)',
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '52px',
      }}>
        🪷
      </div>
    )
  }

  return (
    <div style={{
      width: '100%',
      height: '220px',
      background: '#FFF8E8',
      borderRadius: '12px 12px 0 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px',
    }}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 400px"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '8px',
        }}
      />
    </div>
  )
}
