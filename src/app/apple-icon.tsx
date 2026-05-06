import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#7B1414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Gold ring */}
        <div
          style={{
            width: 136,
            height: 136,
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
              width: 108,
              height: 108,
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
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#5C0F0F',
              }}
            />
          </div>
        </div>
      </div>
    ),
    { width: 180, height: 180 },
  )
}
