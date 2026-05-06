import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#7B1414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Gold ring */}
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#F2C94C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Saffron circle */}
          <div
            style={{
              width: 19,
              height: 19,
              borderRadius: '50%',
              background: '#E8912A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Dark maroon center */}
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#5C0F0F',
              }}
            />
          </div>
        </div>
      </div>
    ),
    { width: 32, height: 32 },
  )
}
