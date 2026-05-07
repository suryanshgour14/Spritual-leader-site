'use client'
import useSWR from 'swr'
import { motion, AnimatePresence } from 'framer-motion'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function LiveBanner() {
  const { data } = useSWR<{ isLive: boolean; liveUrl: string | null }>(
    '/api/youtube',
    fetcher,
    { refreshInterval: 15 * 60 * 1000, revalidateOnFocus: false }
  )

  const isLive  = data?.isLive ?? false
  const liveUrl = data?.liveUrl ?? 'https://www.youtube.com/@SadhviSamahita'

  return (
    <AnimatePresence>
      {isLive && (
        <motion.a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 w-full
            bg-red-600 hover:bg-red-700 text-white py-2.5 text-sm
            cursor-pointer transition-colors duration-200 z-50"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
          <span className="font-body font-semibold">
            🔴 Live Satsang — Didi Ji is on YouTube right now!
          </span>
          <span className="font-body text-white/70 hidden sm:inline">Join Now →</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
