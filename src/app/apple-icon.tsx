import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#7B1414"/>
  <circle cx="32" cy="32" r="28" fill="none" stroke="#F2C94C" stroke-width="1.5"/>
  <g transform="translate(32,32)">
    <ellipse cx="0" cy="-16" rx="4" ry="7.5" fill="#E8912A" transform="rotate(0)"/>
    <ellipse cx="0" cy="-16" rx="4" ry="7.5" fill="#C86820" transform="rotate(45)"/>
    <ellipse cx="0" cy="-16" rx="4" ry="7.5" fill="#E8912A" transform="rotate(90)"/>
    <ellipse cx="0" cy="-16" rx="4" ry="7.5" fill="#C86820" transform="rotate(135)"/>
    <ellipse cx="0" cy="-16" rx="4" ry="7.5" fill="#E8912A" transform="rotate(180)"/>
    <ellipse cx="0" cy="-16" rx="4" ry="7.5" fill="#C86820" transform="rotate(225)"/>
    <ellipse cx="0" cy="-16" rx="4" ry="7.5" fill="#E8912A" transform="rotate(270)"/>
    <ellipse cx="0" cy="-16" rx="4" ry="7.5" fill="#C86820" transform="rotate(315)"/>
  </g>
  <circle cx="32" cy="32" r="10" fill="#5C0F0F"/>
  <circle cx="32" cy="32" r="10" fill="none" stroke="#F2C94C" stroke-width="1.5"/>
</svg>`

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, display: 'flex' }}>
        <img
          src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
          style={{ width: 180, height: 180 }}
        />
      </div>
    ),
    { ...size },
  )
}
