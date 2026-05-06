'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import GlowOrbs from '@/components/shared/GlowOrbs'
import RevealWrapper from '@/components/shared/RevealWrapper'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const CHANNEL_URL = 'https://www.youtube.com/@SadhviSamahita'

interface Video {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

interface YouTubeData {
  isLive: boolean
  liveVideoId: string | null
  liveTitle: string | null
  liveUrl: string | null
  videos: Video[]
  configured: boolean
}

function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

// ── Clickable thumbnail card (below the player) ───────────────────────────────
function VideoCard({
  video,
  isActive,
  onClick,
}: {
  video: Video
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`group relative rounded-xl overflow-hidden text-left w-full cursor-pointer
        border transition-all duration-300
        ${isActive
          ? 'border-saffron-400/70 shadow-[0_6px_24px_rgba(212,134,10,0.28)] ring-1 ring-saffron-400/30'
          : 'border-gold-300/15 hover:border-gold-300/50 shadow-[0_2px_12px_rgba(212,134,10,0.08)] hover:shadow-[0_6px_24px_rgba(212,134,10,0.18)]'
        }`}
    >
      {/* Thumbnail */}
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-maroon-800 to-maroon-900 flex items-center justify-center">
            <span className="text-3xl">🪷</span>
          </div>
        )}

        {/* Hover overlay + play button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-200 flex items-center justify-center">
          <div className={`w-10 h-10 rounded-full bg-red-600 flex items-center justify-center
            shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all duration-200
            ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'}`}>
            <PlayIcon className="w-5 h-5 text-white ml-0.5" />
          </div>
        </div>

        {/* Playing badge */}
        {isActive && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-saffron-500 text-white
            text-[10px] font-body font-semibold px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Playing
          </div>
        )}
      </div>

      {/* Title */}
      <div className={`px-3 py-2.5 transition-colors duration-200
        ${isActive ? 'bg-saffron-50' : 'bg-white/80 group-hover:bg-white/95'}`}>
        <p className="font-body text-maroon-800 text-xs font-medium leading-snug line-clamp-2 group-hover:text-saffron-800 transition-colors">
          {video.title}
        </p>
        {video.publishedAt && (
          <p className="font-body text-saffron-600/50 text-[10px] mt-1">{formatDate(video.publishedAt)}</p>
        )}
      </div>
    </motion.button>
  )
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-gold-300/10 bg-white/50 animate-pulse">
      <div className="w-full bg-maroon-100" style={{ aspectRatio: '16/9' }} />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-saffron-100 rounded w-full" />
        <div className="h-3 bg-saffron-100 rounded w-2/3" />
        <div className="h-2 bg-gold-100 rounded w-1/3" />
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function VaaniSection() {
  const [featuredId, setFeaturedId] = useState<string | null>(null)
  const [playerReady, setPlayerReady] = useState(false)
  const [iframeActive, setIframeActive] = useState(false)

  function activatePlayer(id?: string) {
    if (id) setFeaturedId(id)
    setPlayerReady(true)
    setIframeActive(true)
  }

  const { data, isLoading } = useSWR<YouTubeData>('/api/youtube', fetcher, {
    refreshInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
  })

  const isLive     = data?.isLive ?? false
  const liveUrl    = data?.liveUrl ?? CHANNEL_URL
  const liveTitle  = data?.liveTitle
  const videos     = data?.videos ?? []
  const configured = data?.configured ?? false

  const featured   = featuredId
    ? (videos.find(v => v.id === featuredId) ?? videos[0])
    : videos[0]

  // All 4 videos show as cards; active one is highlighted
  const cardVideos = videos.slice(0, 4)

  return (
    <section id="vaani" className="relative section-padding bg-cream-100 overflow-hidden">
      <GlowOrbs variant="saffron" positions={[
        { size: 500, top: '-4rem', right: '-4rem', duration: 13 },
        { size: 350, bottom: '-2rem', left: '-4rem', duration: 16 },
      ]} />

      <div className="relative max-w-screen-xl mx-auto">

        {/* ── Header ── */}
        <RevealWrapper>
          <div className="text-center mb-8">
            <p className="text-saffron-500 font-body text-xs tracking-widest uppercase mb-3">
              Divine Discourses
            </p>
            <h2 className="font-devanagari text-3xl md:text-4xl text-maroon-800 mb-2">वाणी</h2>
            <p className="font-display text-xl text-saffron-600 mb-4">
              Vaani — Divine Discourses
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4" />
            <p className="font-body text-saffron-700/80 text-sm md:text-base max-w-xl mx-auto">
              Experience the divine pravachans of Sadhvi Samahita Ji — blending scripture,
              devotion, and life guidance. Click any video below to play it here.
            </p>
          </div>
        </RevealWrapper>

        {/* ── LIVE banner ── */}
        <AnimatePresence>
          {isLive && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-3 mb-6 px-5 py-4 rounded-2xl
                bg-gradient-to-r from-red-700 via-red-600 to-red-700
                hover:from-red-600 hover:to-red-600
                shadow-[0_4px_24px_rgba(220,38,38,0.4)] hover:shadow-[0_4px_32px_rgba(220,38,38,0.55)]
                transition-all duration-300 group"
            >
              {/* Ping dot */}
              <span className="flex h-3.5 w-3.5 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white" />
              </span>
              <span className="font-body font-bold text-white text-sm md:text-base">
                LIVE NOW — Didi Ji is on YouTube!
              </span>
              {liveTitle && (
                <span className="hidden md:inline font-body text-white/65 text-sm truncate max-w-sm">
                  · {liveTitle}
                </span>
              )}
              <span className="ml-auto flex-shrink-0 font-body text-white bg-white/20
                group-hover:bg-white/35 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors">
                🔴 Join Live →
              </span>
            </motion.a>
          )}
        </AnimatePresence>

        {/* ── Featured player ── */}
        <RevealWrapper delay={0.1}>
          <div className="rounded-2xl overflow-hidden border border-gold-300/20
            shadow-[0_12px_50px_rgba(212,134,10,0.18)] mb-6">

            {/* 16:9 iframe area */}
            <div
              className="relative bg-maroon-900"
              style={{ aspectRatio: '16/9' }}
              onClick={() => setIframeActive(true)}
              onMouseLeave={() => setIframeActive(false)}
            >

              {/* Loading skeleton */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-maroon-700/50" />
                  <div className="h-3 bg-maroon-700/40 rounded w-48" />
                  <div className="h-2 bg-maroon-700/30 rounded w-32" />
                </div>
              )}

              {/* Live iframe — shows live stream when live */}
              {!isLoading && isLive && liveUrl && (
                <iframe
                  key={`live-${liveUrl}`}
                  src={`https://www.youtube-nocookie.com/embed/${data?.liveVideoId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                  title="Live Katha Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ pointerEvents: iframeActive ? 'auto' : 'none' }}
                />
              )}

              {/* Normal video — thumbnail until user clicks, then iframe with autoplay */}
              {!isLoading && !isLive && featured && (
                playerReady ? (
                  <iframe
                    key={featured.id}
                    src={`https://www.youtube-nocookie.com/embed/${featured.id}?rel=0&modestbranding=1&color=white&autoplay=1`}
                    title={featured.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ pointerEvents: iframeActive ? 'auto' : 'none' }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 cursor-pointer group"
                    onClick={() => activatePlayer()}
                  >
                    {featured.thumbnail ? (
                      <img
                        src={featured.thumbnail}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-maroon-800 to-maroon-900" />
                    )}
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35
                      transition-colors duration-200 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center
                        shadow-[0_0_40px_rgba(220,38,38,0.55)]
                        group-hover:scale-105 transition-transform duration-200">
                        <PlayIcon className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-xs font-body text-white/70
                        bg-black/35 backdrop-blur-sm select-none">
                        क्लिक करें · Click to play
                      </span>
                    </div>
                  </div>
                )
              )}

              {/* Placeholder — not configured / no videos */}
              {!isLoading && !featured && !isLive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-red-600/85 flex items-center justify-center
                    shadow-[0_0_40px_rgba(220,38,38,0.45)]">
                    <PlayIcon className="w-9 h-9 text-white ml-1" />
                  </div>
                  <div className="text-center">
                    <p className="font-devanagari text-gold-300 text-xl mb-1">श्रीमद्भागवत प्रवचन</p>
                    <p className="font-body text-cream-300/50 text-sm">Divine discourses coming soon</p>
                  </div>
                  <a
                    href={CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 border border-gold-300/40 text-gold-300 rounded-full
                      font-body text-sm hover:bg-gold-300/10 transition-all duration-300"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              )}
            </div>

            {/* Title bar */}
            {(featured || (isLive && liveTitle)) && (
              <div className="px-5 py-3.5 bg-maroon-900/95 border-t border-gold-300/10
                flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-body text-cream-100 text-sm font-medium leading-snug line-clamp-1">
                    {isLive ? liveTitle : featured?.title}
                  </p>
                  {!isLive && featured?.publishedAt && (
                    <p className="font-body text-cream-400/40 text-xs mt-0.5">
                      {formatDate(featured.publishedAt)}
                    </p>
                  )}
                </div>
                {isLive && (
                  <span className="flex-shrink-0 flex items-center gap-1.5 bg-red-600/80 text-white
                    text-xs font-body font-semibold px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    LIVE
                  </span>
                )}
                {!isLive && featured && (
                  <a
                    href={`https://www.youtube.com/watch?v=${featured.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 font-body text-cream-400/50 hover:text-red-400
                      text-xs transition-colors flex items-center gap-1"
                  >
                    <YouTubeIcon className="w-3.5 h-3.5" />
                    YouTube
                  </a>
                )}
              </div>
            )}
          </div>
        </RevealWrapper>

        {/* ── Video cards row ── */}
        <RevealWrapper delay={0.15}>
          <div className="mb-3">
            <p className="font-body text-saffron-600 text-xs tracking-widest uppercase mb-4">
              Recent Pravachans — Click to Play
            </p>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : cardVideos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cardVideos.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <VideoCard
                      video={v}
                      isActive={v.id === featured?.id && !isLive}
                      onClick={() => activatePlayer(v.id)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Placeholder cards when not configured */
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Shrimad Bhagavat Katha', 'Ram Katha Pravachan', 'Shiv Mahapuran', 'Devi Katha'].map((title, i) => (
                  <a
                    key={i}
                    href={CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl overflow-hidden border border-gold-300/15
                      hover:border-gold-300/40 transition-all duration-300 bg-white/70"
                  >
                    <div className="w-full bg-gradient-to-br from-maroon-800 to-maroon-900
                      flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                      <span className="text-3xl opacity-60 group-hover:opacity-90 transition-opacity">🪷</span>
                    </div>
                    <div className="p-3">
                      <p className="font-body text-maroon-700 text-xs font-medium line-clamp-2">{title}</p>
                      <p className="font-body text-saffron-500 text-[10px] mt-1">Watch on YouTube →</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </RevealWrapper>

        {/* ── Bottom CTA row ── */}
        <RevealWrapper delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4
            border-t border-gold-300/15">
            <p className="font-body text-saffron-600/60 text-sm text-center sm:text-left">
              Subscribe to never miss a katha or satsang
            </p>
            <div className="flex items-center gap-3">
<a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2.5 px-5
                  bg-red-600 hover:bg-red-500 text-white rounded-xl
                  font-body text-sm font-semibold
                  shadow-[0_3px_16px_rgba(220,38,38,0.3)]
                  hover:shadow-[0_3px_24px_rgba(220,38,38,0.45)]
                  transition-all duration-300"
              >
                <YouTubeIcon className="w-4 h-4" />
                Watch on YouTube
              </a>
            </div>
          </div>
        </RevealWrapper>

      </div>
    </section>
  )
}
