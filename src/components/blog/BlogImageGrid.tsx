'use client'
import Image from 'next/image'

interface BlogImageGridProps {
  srcs: string[]
  captions?: string[]
}

export function BlogImageGrid({ srcs, captions = [] }: BlogImageGridProps) {
  const count = srcs.length
  const cols = count === 1 ? '1fr'
    : count === 2 ? 'repeat(2, 1fr)'
    : 'repeat(auto-fit, minmax(220px, 1fr))'

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: cols,
      gap: '12px',
      margin: '28px 0',
    }}>
      {srcs.map((src, i) => (
        <div key={i}>
          <div style={{
            background: '#FFF8E8',
            borderRadius: '10px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image
              src={src}
              alt={captions?.[i] || ''}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 400px"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '420px',
                objectFit: 'contain',
                borderRadius: '6px',
                display: 'block',
              }}
            />
          </div>
          {captions?.[i] && (
            <p style={{
              textAlign: 'center',
              fontSize: '13px',
              color: '#8C3A00',
              marginTop: '6px',
              fontStyle: 'italic',
            }}>
              {captions[i]}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
