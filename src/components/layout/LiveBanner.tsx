'use client'
import useSWR from 'swr'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface LiveStatus {
  isLive: boolean
  liveUrl: string | null
}

export default function LiveBanner() {
  const t = useTranslations('live')
  const { data } = useSWR<LiveStatus>('/api/live-status', fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  })

  const isLive = data?.isLive ?? false
  const liveUrl = data?.liveUrl ?? 'https://youtube.com/@SadhviSamahita'

  return (
    <AnimatePresence>
      {isLive && (
        <motion.a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="block w-full bg-red-600 text-white py-2 text-center text-sm cursor-pointer
            hover:bg-red-700 transition-colors duration-200 z-50"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
            <span>
              {t('banner_text')} — {t('watch_now')}
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
