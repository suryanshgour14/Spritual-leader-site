import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@tsparticles/react',
      '@tsparticles/slim',
      'embla-carousel-react',
      'yet-another-react-lightbox',
    ],
  },
  async redirects() {
    return [
      { source: '/favicon.ico', destination: '/icon', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
