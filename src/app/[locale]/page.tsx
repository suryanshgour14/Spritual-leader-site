'use client'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import GlowOrbs from '@/components/shared/GlowOrbs'
import RevealWrapper from '@/components/shared/RevealWrapper'
import CountUp from '@/components/shared/CountUp'
import DiyaCluster from '@/components/scenes/layers/DiyaCluster'
import SacredPhotoFrame from '@/components/shared/SacredPhotoFrame'
import { cn } from '@/lib/utils'

const ParticlesHero = dynamic(
  () => import('@/components/shared/ParticlesHero'),
  { ssr: false }
)

// ─── CSS twinkling star field ─────────────────────────────────────────────────
function StarField({ count = 60 }: { count?: number }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 0.6,
      delay: Math.random() * 5,
      duration: Math.random() * 2.5 + 1.8,
      animClass: i % 3 === 0 ? 'animate-twinkle' : i % 3 === 1 ? 'animate-shimmer' : 'animate-drift',
      color: ['#F2C94C', '#FFD066', '#FFF3B0', '#ffffff'][i % 4],
    })),
  [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className={cn('absolute rounded-full', s.animClass)}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.size}px rgba(242,201,76,0.35)`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const kathaCards = [
  { key: 'bhagavat',   icon: '📖', gradient: 'from-saffron-700 to-maroon-700', border: 'border-saffron-400/30' },
  { key: 'ram',        icon: '🏹', gradient: 'from-maroon-700 to-maroon-900',  border: 'border-gold-400/30'    },
  { key: 'shiv',       icon: '🕉️', gradient: 'from-maroon-800 to-saffron-900', border: 'border-maroon-400/30'  },
  { key: 'devi',       icon: '🪷', gradient: 'from-saffron-800 to-maroon-800', border: 'border-saffron-300/30'  },
  { key: 'bhajan',     icon: '🎵', gradient: 'from-gold-700 to-saffron-800',   border: 'border-gold-300/30'    },
  { key: 'sunderkand', icon: '🌸', gradient: 'from-maroon-600 to-gold-800',    border: 'border-maroon-300/30'  },
]

const testimonials = [
  { id: 1, name: 'Ramesh Sharma Ji', city: 'Jaipur',  quote: 'दीदी जी की कथा सुनकर मन को अद्भुत शांति मिली। उनके शब्दों में जो भाव है, वो सीधे हृदय को छूता है।' },
  { id: 2, name: 'Sunita Devi',      city: 'Mathura', quote: 'राधिका आश्रय में दर्शन करने का सौभाग्य मिला। दीदी जी का प्रेम और सेवा भाव अविस्मरणीय है।' },
  { id: 3, name: 'Vijay Kumar',      city: 'Lucknow', quote: 'हमारे शहर में श्रीमद्भागवत कथा का आयोजन करवाया। पूरे शहर का जीवन बदल गया।' },
]

const sevaItems = [
  { icon: '🐄', key: 'gaushala', desc: 'वृन्दावन की गौशाला में गाय माता की सेवा' },
  { icon: '🍱', key: 'annadaan', desc: 'प्रतिदिन जरूरतमंदों को भोजन' },
  { icon: '🏛️', key: 'ashram',   desc: 'राधिका आश्रय निर्माण एवं विस्तार' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const tHome     = useTranslations('home')
  const tServices = useTranslations('services.items')
  const tSeva     = useTranslations('seva')
  const tStats    = useTranslations('stats')

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax layers inside the hero
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%',   '25%'])   // bg drifts slow
  const starsY   = useTransform(scrollYProgress, [0, 1], ['0%',   '15%'])   // stars mid
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%',   '-10%'])  // content rises slightly
  const contentO = useTransform(scrollYProgress, [0, 0.55], [1, 0])         // fades out

  const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '918650620909'
  const WA_MSG    = encodeURIComponent('नमस्ते दीदी जी, कथा बुकिंग के बारे में जानकारी चाहिए।')

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO — dark maroon bg, parallax layers
      ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-maroon-900"
      >
        {/* Background gradient — moves slowest */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-maroon-900 via-[#2A0A00] to-[#1A0505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(212,134,10,0.18)_0%,transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(139,26,26,0.3)_0%,transparent_55%)]" />
        </motion.div>

        {/* Star field — moves slightly faster than bg */}
        <motion.div style={{ y: starsY }} className="absolute inset-0 pointer-events-none">
          <StarField count={70} />
          <ParticlesHero count={60} variant="stardust" id="hero-stardust" />
        </motion.div>

        {/* Glow orbs — fixed */}
        <GlowOrbs
          variant="saffron"
          positions={[
            { size: 500, top: '-8rem', right: '-6rem', duration: 12 },
            { size: 380, bottom: '-4rem', left: '-5rem', duration: 10 },
          ]}
        />

        {/* Content — rises & fades on scroll */}
        <motion.div
          style={{ y: contentY, opacity: contentO }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-gold-300/30 bg-gold-300/10 backdrop-blur-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-300 animate-pulse" />
            <span className="text-gold-300 text-xs font-body tracking-widest uppercase">
              {tHome('hero_badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-devanagari leading-tight mb-4"
            style={{
              fontSize: 'clamp(2.6rem, 8vw, 6rem)',
              background: 'linear-gradient(135deg, #F2C94C 0%, #FFD066 40%, #D4860A 70%, #F2C94C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            साध्वी समाहिता जी
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-lg md:text-xl text-gold-200/80 mb-2 tracking-wide"
          >
            Sadhvi Samahita Ji
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="font-devanagari text-sm md:text-base text-cream-300/70 mb-10
              max-w-2xl mx-auto leading-relaxed"
          >
            {tHome('hero_subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link
              href="/sampark"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                font-body font-medium text-sm md:text-base text-cream-50
                bg-gradient-to-r from-saffron-500 to-saffron-600
                hover:from-saffron-400 hover:to-saffron-500
                shadow-[0_0_32px_rgba(212,134,10,0.45)]
                hover:shadow-[0_0_52px_rgba(212,134,10,0.65)]
                transition-all duration-300"
            >
              <span>🪷</span>
              <span className="font-devanagari">दर्शन करें</span>
            </Link>
            <Link
              href="/katha"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                border border-gold-300/50 text-gold-300
                font-body text-sm md:text-base backdrop-blur-sm
                hover:bg-gold-300/10 hover:border-gold-300 transition-all duration-300"
            >
              <span className="font-devanagari">कथा बुकिंग</span>
              <span>→</span>
            </Link>
          </motion.div>

          {/* Diyas row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center pointer-events-none"
          >
            <DiyaCluster count={7} />
          </motion.div>
        </motion.div>

        {/* Scroll chevron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{ opacity: contentO }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-px h-6 bg-gradient-to-b from-gold-300/0 to-gold-300/50" />
            <svg viewBox="0 0 16 10" width="14" height="9" fill="none" className="text-gold-300/60">
              <path d="M 1,1 L 8,8 L 15,1" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <section className="relative bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,134,10,0.08)_0%,transparent_70%)]" />
        <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-gold-300/20">
            {[
              { labelKey: 'years_label',    target: 10,  suffix: '+' },
              { labelKey: 'kathas_label',   target: 500, suffix: '+' },
              { labelKey: 'devotees_label', target: 10,  display: '10 लाख+' },
              { labelKey: 'cities_label',   target: 100, suffix: '+' },
            ].map((s, i) => (
              <RevealWrapper key={s.labelKey} delay={i * 0.1} className="text-center px-6">
                <div className="text-3xl md:text-4xl font-display text-gold-300 mb-1">
                  {s.display ? s.display : <CountUp target={s.target} suffix={s.suffix!} />}
                </div>
                <div className="text-xs md:text-sm font-devanagari text-cream-300/70">
                  {tStats(s.labelKey)}
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT PREVIEW  (cream bg — unchanged)
      ═══════════════════════════════════════ */}
      <section className="relative section-padding bg-cream-100 overflow-hidden">
        <GlowOrbs variant="saffron" positions={[{ size: 500, top: '-3rem', right: '-5rem', duration: 12 }]} />

        <div className="relative max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Photo — slides in from left with sacred frame */}
            <RevealWrapper delay={0} yOffset={50}>
              <div className="mx-auto lg:mx-0 w-72 sm:w-80 lg:w-96">
                <SacredPhotoFrame
                  src="/images/didi/didi-ji.jpeg"
                  alt="Sadhvi Samahita Ji"
                  size={320}
                />
              </div>
            </RevealWrapper>

            {/* Text — slides in from right */}
            <RevealWrapper delay={0.15} yOffset={40}>
              <div>
                <p className="text-saffron-500 font-body text-sm tracking-widest uppercase mb-3">
                  {tHome('about_label')}
                </p>
                <h2 className="font-devanagari text-3xl md:text-4xl text-maroon-800 leading-tight mb-2">
                  परिचय
                </h2>
                <p className="font-display text-xl md:text-2xl text-saffron-700 mb-6">
                  About Sadhvi Samahita Ji
                </p>
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-6" />
                <p className="font-devanagari text-maroon-700 leading-loose text-base md:text-lg mb-4">
                  पूज्या साध्वी समाहिता जी, परम पूज्या दीदी माँ साध्वी ऋतंभरा जी की प्रिय शिष्या हैं।
                  वे श्री धाम वृन्दावन में स्थित राधिका आश्रय की संचालिका हैं और अपने प्रेरक कथा वाचन
                  से लाखों श्रद्धालुओं के हृदय को स्पर्श करती हैं।
                </p>
                <p className="font-body text-saffron-600 text-sm md:text-base mb-8 leading-relaxed">
                  A gifted katha vachak and motivational speaker, she weaves scripture and
                  lived wisdom into transformative spiritual experiences.
                </p>
                <Link
                  href="/ashram"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-saffron-500
                    text-cream-50 rounded-full font-body text-sm font-medium
                    hover:bg-saffron-600 transition-all duration-300
                    shadow-[0_4px_20px_rgba(212,134,10,0.3)]"
                >
                  <span className="font-devanagari">और जानें</span>
                  <span>→</span>
                </Link>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SACRED PHOTO DIVIDER
      ═══════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden
        bg-gradient-to-b from-cream-100 via-[#1A0505] to-maroon-900">
        {/* Gold thread top edge */}
        <div className="absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />

        {/* Ambient radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(212,134,10,0.14)_0%,transparent_65%)]" />

        <div className="relative flex flex-col items-center gap-6 px-4">
          <SacredPhotoFrame
            src="/images/didi/didi-ji-2.jpeg"
            alt="Sadhvi Samahita Ji"
            size={290}
            quote="।। श्री राधे कृष्णाय नमः ।।"
          />

          <RevealWrapper delay={0.3}>
            <div className="text-center">
              <p className="font-devanagari text-gold-300 text-lg md:text-xl tracking-wide mb-1">
                साध्वी समाहिता जी
              </p>
              <p className="font-body text-cream-300/60 text-xs tracking-widest uppercase">
                Katha Vachak · Ashram Sanchalika · Shri Dham Vrindavan
              </p>
            </div>
          </RevealWrapper>
        </div>

        {/* Gold thread bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════
          KATHA SERVICES  (dark maroon bg — unchanged)
      ═══════════════════════════════════════ */}
      <section className="relative section-padding bg-maroon-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,134,10,0.12)_0%,transparent_60%)]" />

        <div className="relative max-w-screen-xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-12">
              <p className="text-gold-400 font-body text-xs tracking-widest uppercase mb-3">
                {tHome('katha_label')}
              </p>
              <h2 className="font-devanagari text-3xl md:text-4xl text-gold-300 mb-4">
                कथाएँ एवं सेवाएँ
              </h2>
              <p className="font-body text-cream-300/70 text-sm md:text-base max-w-xl mx-auto">
                {tHome('katha_subtitle')}
              </p>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kathaCards.map((card, i) => (
              <RevealWrapper key={card.key} delay={i * 0.08} yOffset={30}>
                <Link href="/seva-karya">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      'relative rounded-2xl border overflow-hidden p-6 cursor-pointer group',
                      card.border, 'bg-gradient-to-br', card.gradient,
                    )}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                      transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />
                    <div className="relative">
                      <span className="text-3xl mb-4 block">{card.icon}</span>
                      <h3 className="font-devanagari text-gold-200 text-lg leading-snug mb-2">
                        {tServices(card.key)}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-body
                        text-gold-400/70 group-hover:text-gold-300 transition-colors">
                        बुकिंग करें
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </RevealWrapper>
            ))}
          </div>

          <RevealWrapper delay={0.3} className="text-center mt-10">
            <Link
              href="/seva-karya"
              className="inline-flex items-center gap-2 px-6 py-3
                border border-gold-300/40 text-gold-300 rounded-full
                font-body text-sm hover:bg-gold-300/10 transition-all duration-300"
            >
              <span className="font-devanagari">सभी सेवाएँ देखें</span> →
            </Link>
          </RevealWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SEVA KARYA  (cream bg — unchanged)
      ═══════════════════════════════════════ */}
      <section className="relative section-padding bg-cream-100 overflow-hidden">
        <GlowOrbs variant="gold" positions={[{ size: 600, bottom: '-8rem', left: '-6rem', duration: 14 }]} />
        <div className="relative max-w-screen-xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-12">
              <p className="text-saffron-500 font-body text-xs tracking-widest uppercase mb-3">
                {tHome('seva_label')}
              </p>
              <h2 className="font-devanagari text-3xl md:text-4xl text-maroon-800 mb-4">
                सेवा कार्य
              </h2>
              <p className="font-body text-saffron-600 text-sm md:text-base max-w-xl mx-auto">
                {tHome('seva_subtitle')}
              </p>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sevaItems.map((item, i) => (
              <RevealWrapper key={item.key} delay={i * 0.12}>
                <div className="spiritual-card p-8 text-center">
                  <span className="text-5xl mb-5 block">{item.icon}</span>
                  <h3 className="font-devanagari text-maroon-700 text-xl mb-3">
                    {tSeva(item.key)}
                  </h3>
                  <p className="font-devanagari text-saffron-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>

          <RevealWrapper delay={0.2} className="text-center mt-10">
            <Link
              href="/seva"
              className="inline-flex items-center gap-2 px-6 py-3 bg-saffron-500
                text-cream-50 rounded-full font-body text-sm font-medium
                hover:bg-saffron-600 transition-all duration-300"
            >
              <span className="font-devanagari">सेवा में सहयोग करें</span> →
            </Link>
          </RevealWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS  (dark bg — unchanged)
      ═══════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden
        bg-gradient-to-br from-maroon-900 via-maroon-800 to-[#1A0505]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(212,134,10,0.1)_0%,transparent_60%)]" />
        <div className="relative max-w-screen-xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-12">
              <p className="text-gold-400 font-body text-xs tracking-widest uppercase mb-3">
                {tHome('testimonials_label')}
              </p>
              <h2 className="font-devanagari text-3xl md:text-4xl text-gold-300 mb-4">
                श्रद्धालुओं के उद्गार
              </h2>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <RevealWrapper key={t.id} delay={i * 0.12}>
                <div className="relative rounded-2xl border border-gold-300/15
                  bg-white/5 backdrop-blur-sm p-6 h-full flex flex-col">
                  <span className="text-4xl text-gold-400/30 font-display leading-none mb-4 select-none">"</span>
                  <p className="font-devanagari text-cream-200 text-sm leading-loose flex-1 mb-5">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3 border-t border-gold-300/10 pt-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600
                      flex items-center justify-center text-cream-50 text-sm font-display flex-shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-gold-300 text-sm font-body font-medium">{t.name}</p>
                      <p className="text-cream-400/60 text-xs">{t.city}</p>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOOK KATHA CTA  (cream bg — unchanged)
      ═══════════════════════════════════════ */}
      <section className="relative section-padding bg-cream-100 overflow-hidden">
        <GlowOrbs variant="saffron" positions={[
          { size: 500, top: '-5rem', right: '-5rem', duration: 11 },
          { size: 300, bottom: '-3rem', left: '20%',  duration: 9  },
        ]} />
        <RevealWrapper className="relative max-w-3xl mx-auto text-center">
          <div className="spiritual-card p-10 md:p-16">
            <div className="flex justify-center mb-6 pointer-events-none">
              <DiyaCluster count={5} />
            </div>
            <h2 className="font-devanagari text-3xl md:text-4xl text-maroon-800 mb-4 leading-tight">
              {tHome('book_cta_title')}
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
            <p className="font-devanagari text-saffron-700 text-base leading-loose mb-10 max-w-xl mx-auto">
              {tHome('book_cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4
                  bg-green-600 hover:bg-green-500 text-white rounded-full
                  font-body font-medium text-base transition-all duration-300
                  shadow-[0_4px_24px_rgba(22,163,74,0.35)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="font-devanagari">{tHome('book_cta_btn')}</span>
              </a>
              <Link
                href="/sampark"
                className="inline-flex items-center gap-2 px-8 py-4
                  border border-saffron-400 text-saffron-700 rounded-full
                  font-body text-base hover:bg-saffron-50 transition-all duration-300"
              >
                <span className="font-devanagari">संपर्क फ़ॉर्म</span> →
              </Link>
            </div>
          </div>
        </RevealWrapper>
      </section>

    </div>
  )
}
