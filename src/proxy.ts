import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match all paths except Next.js internals, API routes,
    // icon/apple-icon routes, and files with extensions (favicon, fonts, etc.)
    '/((?!_next|_vercel|api|icon|apple-icon|.*\\..*).*)',
    '/(hi|en)/:path*',
  ],
}
