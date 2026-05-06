'use client'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import GlowOrbs from '@/components/shared/GlowOrbs'
import RevealWrapper from '@/components/shared/RevealWrapper'
import CountUp from '@/components/shared/CountUp'
import DiyaCluster from '@/components/scenes/layers/DiyaCluster'
import SacredPhotoFrame from '@/components/shared/SacredPhotoFrame'
const KathaSection = dynamic(() => import('@/components/shared/KathaSection'), { ssr: false })
const VaaniSection = dynamic(() => import('@/components/shared/VaaniSection'), { ssr: false })
import { cn } from '@/lib/utils'

const ParticlesHero = dynamic(
  () => import('@/components/shared/ParticlesHero'),
  { ssr: false }
)

// ─── CSS twinkling star field ─────────────────────────────────────────────────
function StarField({ count = 60 }: { count?: number }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

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
  [count])

  if (!mounted) return null

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

// ─── 4-pointed sparkle ────────────────────────────────────────────────────────
function Sparkle({ size = 18, className = '', delay = 0 }: { size?: number; className?: string; delay?: number }) {
  return (
    <div
      className={cn('absolute pointer-events-none z-10', className)}
      style={{ animation: `sparkle-pulse 2.8s ease-in-out ${delay}s infinite` }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 1 L13.8 10.2 L23 12 L13.8 13.8 L12 23 L10.2 13.8 L1 12 L10.2 10.2 Z" fill="rgba(242,201,76,0.9)" />
      </svg>
    </div>
  )
}

// ─── Typing animation — character-by-character reveal ────────────────────────
function TypeWriter({
  text, delay = 0, speed = 55, goldGradient = false, className = '',
}: { text: string; delay?: number; speed?: number; goldGradient?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let interval: ReturnType<typeof setInterval>
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setCharCount(c => {
          if (c >= text.length) { clearInterval(interval); return c }
          return c + 1
        })
      }, speed)
    }, delay * 1000)
    return () => { clearTimeout(timer); clearInterval(interval) }
  }, [isInView, text, delay, speed])

  const displayed = text.slice(0, charCount)
  const isTyping  = isInView && charCount < text.length

  return (
    <span ref={ref} className={className}
      style={{
        ...(goldGradient ? { color: '#F2C94C' } : {}),
        display: 'inline-block',
        minHeight: '1.2em',
      }}>
      {displayed}
      {isTyping && (
        <span
          className="inline-block ml-0.5 align-middle"
          style={{
            width: 3,
            height: '0.82em',
            background: goldGradient ? '#F2C94C' : 'currentColor',
            display: 'inline-block',
            animation: 'tw-cursor-blink 0.9s ease-in-out infinite',
          }}
        />
      )}
    </span>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const updates = [
  {
    id: 1, icon: '🪷', type: 'भागवत कथा',
    dateHi: '17–23 मई 2026',
    titleHi: 'श्रीमद् भागवत कथा',
    locationHi: 'पीतमपुरा हर्ष विहार, दिल्ली',
    waMsg: 'नमस्ते दीदी जी 🙏 मुझे 17–23 मई को पीतमपुरा हर्ष विहार, दिल्ली में होने वाली श्रीमद् भागवत कथा के बारे में जानकारी चाहिए।',
  },
  {
    id: 2, icon: '🌸', type: 'पाठ कार्यक्रम',
    dateHi: '4 जुलाई 2026',
    titleHi: 'सुंदरकांड पाठ',
    locationHi: 'शालीमार बाग, दिल्ली',
    waMsg: 'नमस्ते दीदी जी 🙏 मुझे 4 जुलाई को शालीमार बाग दिल्ली में होने वाले सुंदरकांड पाठ के बारे में जानकारी चाहिए।',
  },
  {
    id: 3, icon: '🪷', type: 'भागवत कथा',
    dateHi: '19–25 जुलाई 2026',
    titleHi: 'श्रीमद् भागवत कथा',
    locationHi: 'ग्रेटर नोएडा',
    waMsg: 'नमस्ते दीदी जी 🙏 मुझे 19–25 जुलाई को ग्रेटर नोएडा में होने वाली श्रीमद् भागवत कथा के बारे में जानकारी चाहिए।',
  },
  {
    id: 4, icon: '🔱', type: 'शिव महापुराण',
    dateHi: '14–20 अगस्त 2026',
    titleHi: 'शिव महापुराण कथा',
    locationHi: 'विवेक विहार, दिल्ली',
    waMsg: 'नमस्ते दीदी जी 🙏 मुझे 14–20 अगस्त को विवेक विहार दिल्ली में होने वाली शिव महापुराण कथा के बारे में जानकारी चाहिए।',
  },
  {
    id: 5, icon: '🔱', type: 'शिव महापुराण',
    dateHi: '26 सितंबर – 2 अक्टूबर 2026',
    titleHi: 'शिव महापुराण कथा',
    locationHi: 'हरिद्वार',
    waMsg: 'नमस्ते दीदी जी 🙏 मुझे 26 सितंबर से 2 अक्टूबर हरिद्वार में होने वाली शिव महापुराण कथा के बारे में जानकारी चाहिए।',
  },
  {
    id: 6, icon: '🪷', type: 'भागवत कथा',
    dateHi: '3–9 अक्टूबर 2026',
    titleHi: 'श्रीमद् भागवत कथा',
    locationHi: 'रोहिणी सेक्टर 8, दिल्ली',
    waMsg: 'नमस्ते दीदी जी 🙏 मुझे 3–9 अक्टूबर को रोहिणी सेक्टर 8 दिल्ली में होने वाली श्रीमद् भागवत कथा के बारे में जानकारी चाहिए।',
  },
  {
    id: 7, icon: '🚩', type: 'राम कथा',
    dateHi: '1–9 दिसंबर 2026',
    titleHi: 'श्री राम कथा',
    locationHi: 'नैमिषारण्य धाम, उत्तर प्रदेश',
    waMsg: 'नमस्ते दीदी जी 🙏 मुझे 1–9 दिसंबर को नैमिषारण्य धाम उत्तर प्रदेश में होने वाली श्री राम कथा के बारे में जानकारी चाहिए।',
  },
  {
    id: 8, icon: '🪷', type: 'भागवत कथा',
    dateHi: '13–20 दिसंबर 2026',
    titleHi: 'श्रीमद् भागवत कथा',
    locationHi: 'मोती नगर, दिल्ली',
    waMsg: 'नमस्ते दीदी जी 🙏 मुझे 13–20 दिसंबर को मोती नगर दिल्ली में होने वाली श्रीमद् भागवत कथा के बारे में जानकारी चाहिए।',
  },
]

const testimonials = [
  { id: 1, name: 'Ramesh Sharma Ji', city: 'Jaipur',     quote: 'दीदी जी की कथा सुनकर मन को अद्भुत शांति मिली। उनके शब्दों में जो भाव है, वो सीधे हृदय को छूता है।' },
  { id: 2, name: 'Sunita Devi',      city: 'Mathura',    quote: 'राधिका आश्रय में दर्शन करने का सौभाग्य मिला। दीदी जी का प्रेम और सेवा भाव अविस्मरणीय है।' },
  { id: 3, name: 'Vijay Kumar',      city: 'Lucknow',    quote: 'हमारे शहर में श्रीमद्भागवत कथा का आयोजन करवाया। पूरे शहर का जीवन बदल गया।' },
  { id: 4, name: 'Meera Devi',       city: 'Vrindavan',  quote: 'साध्वी जी के प्रवचन सुनकर जीवन की दिशा बदल गई। उनके शब्दों में सत्य और करुणा का अद्भुत संगम है।' },
  { id: 5, name: 'Rajendra Prasad',  city: 'Bhopal',     quote: 'कथा के सात दिनों में जो आत्मिक शांति मिली, वो अब तक किसी से नहीं मिली। दीदी जी सच में माँ की तरह हैं।' },
  { id: 6, name: 'Kavita Sharma',    city: 'Delhi',      quote: 'साध्वी समाहिता जी की सेवा और भक्ति को देखकर हृदय भर आता है। उनका जीवन खुद एक प्रेरणा है।' },
  { id: 7, name: 'Suresh Tiwari',    city: 'Prayagraj',  quote: 'भागवत कथा के दौरान दीदी जी ने जो ज्ञान दिया, उसने हमारे पूरे परिवार को बदल दिया।' },
  { id: 8, name: 'Rekha Gupta',      city: 'Agra',       quote: 'राधिका आश्रय की सेवाओं ने हमारी बेटी का जीवन संवार दिया। दीदी जी का आशीर्वाद सदा बना रहे।' },
  { id: 9, name: 'Anil Mishra',      city: 'Varanasi',   quote: 'दीदी जी की कथा में जाने के बाद मन में जो सकारात्मकता आई, उसे शब्दों में बयान करना कठिन है। साक्षात् ईश्वर का दर्शन होता है।' },
]

const sevaItems = [
  { icon: '🐄', key: 'gaushala',      desc: 'वृन्दावन की गौशाला में गाय माता की निःस्वार्थ सेवा',     label: 'Gau Seva'           },
  { icon: '📚', key: 'betiShiksha',   desc: 'बेटियों की शिक्षा एवं उज्ज्वल भविष्य के लिए सहयोग',   label: 'Beti Shiksha'       },
  { icon: '🏠', key: 'accommodation', desc: 'महिलाओं एवं साधिकाओं के लिए सुरक्षित PG आवास',          label: 'Safe Accommodation' },
  { icon: '💍', key: 'vivah',         desc: 'निर्धन कन्याओं के विवाह में आर्थिक एवं सामाजिक सहयोग', label: 'Vivah Sahayog'      },
]

const TPAGE_SIZE = 3
const TPAGE_COUNT = Math.ceil(testimonials.length / TPAGE_SIZE)

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const tHome  = useTranslations('home')
  const tStats = useTranslations('stats')

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%',   '25%'])
  const starsY   = useTransform(scrollYProgress, [0, 1], ['0%',   '15%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%',   '-10%'])
  const contentO = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919999649311'
  const WA_MSG    = encodeURIComponent('नमस्ते दीदी जी, कथा बुकिंग के बारे में जानकारी चाहिए।')

  // ── Testimonials carousel state ──────────────────────────────────────────────
  const [tPage, setTPage] = useState(0)
  const [tDir,  setTDir]  = useState(1)

  function tNext() { setTDir(1);  setTPage(p => (p + 1) % TPAGE_COUNT) }
  function tPrev() { setTDir(-1); setTPage(p => (p - 1 + TPAGE_COUNT) % TPAGE_COUNT) }

  useEffect(() => {
    const timer = setInterval(tNext, 5000)
    return () => clearInterval(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const visibleTestimonials = testimonials.slice(tPage * TPAGE_SIZE, (tPage + 1) * TPAGE_SIZE)

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-maroon-900"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-maroon-900 via-[#2A0A00] to-[#1A0505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(212,134,10,0.18)_0%,transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(139,26,26,0.3)_0%,transparent_55%)]" />
        </motion.div>

        <motion.div style={{ y: starsY }} className="absolute inset-0 pointer-events-none">
          <StarField count={70} />
          <ParticlesHero count={60} variant="stardust" id="hero-stardust" />
        </motion.div>

        <GlowOrbs variant="saffron" positions={[
          { size: 500, top: '-8rem', right: '-6rem', duration: 12 },
          { size: 380, bottom: '-4rem', left: '-5rem', duration: 10 },
        ]} />

        <motion.div
          style={{ y: contentY, opacity: contentO }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-gold-300/30 bg-gold-300/10 backdrop-blur-sm mb-6"
            style={{ animation: 'hero-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0s both' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-300 animate-pulse" />
            <span className="text-gold-300 text-xs font-body tracking-widest uppercase">
              {tHome('hero_badge')}
            </span>
          </div>

          <h1
            className="font-devanagari leading-tight mb-4"
            style={{
              fontSize: 'clamp(2.6rem, 8vw, 6rem)',
              background: 'linear-gradient(135deg, #F2C94C 0%, #FFD066 40%, #D4860A 70%, #F2C94C 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'hero-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both',
            }}
          >
            साध्वी समाहिता जी
          </h1>

          <p
            className="font-body text-base md:text-lg text-gold-300/80 mb-2 tracking-widest uppercase"
            style={{ animation: 'hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both' }}
          >
            International Spiritual Orator · Katha Vachak · Vrindavan
          </p>

          <p
            className="font-body text-sm md:text-base text-cream-300/60 mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ animation: 'hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.42s both' }}
          >
            Sadhvi Samahita Ji spreads devotion and spiritual wisdom through Bhagavat Katha, Ram Katha, and Shiv Mahapuran.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            style={{ animation: 'hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.56s both' }}
          >
            <Link href="/media"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-medium
                text-sm md:text-base text-cream-50 bg-gradient-to-r from-saffron-500 to-saffron-600
                hover:from-saffron-400 hover:to-saffron-500
                shadow-[0_0_32px_rgba(212,134,10,0.45)] hover:shadow-[0_0_52px_rgba(212,134,10,0.65)]
                transition-all duration-300">
              <span className="font-devanagari">दर्शन करें</span>
            </Link>
            <Link href="/katha"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold-300/50
                text-gold-300 font-body text-sm md:text-base backdrop-blur-sm
                hover:bg-gold-300/10 hover:border-gold-300 transition-all duration-300">
              <span className="font-devanagari">कथा बुकिंग</span>
              <span>→</span>
            </Link>
          </div>

          <div
            className="flex justify-center pointer-events-none"
            style={{ animation: 'hero-fade-up 1.0s cubic-bezier(0.22,1,0.36,1) 0.9s both' }}
          >
            <DiyaCluster count={7} />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: contentO }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div
            style={{ animation: 'hero-bounce 1.6s ease-in-out infinite' }}
            className="flex flex-col items-center gap-1">
            <div className="w-px h-6 bg-gradient-to-b from-gold-300/0 to-gold-300/50" />
            <svg viewBox="0 0 16 10" width="14" height="9" fill="none" className="text-gold-300/60">
              <path d="M 1,1 L 8,8 L 15,1" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT — Image LEFT · Content RIGHT
      ═══════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden
        bg-gradient-to-br from-[#1A0505] via-maroon-900 to-[#230B00]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_32%_55%,rgba(212,134,10,0.15)_0%,transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(139,26,26,0.18)_0%,transparent_50%)]" />

        <Sparkle size={22} className="top-[12%] right-[8%]"    delay={0}   />
        <Sparkle size={14} className="top-[30%] right-[22%]"   delay={1.1} />
        <Sparkle size={10} className="top-[62%] right-[14%]"   delay={0.6} />
        <Sparkle size={18} className="top-[8%]  left-[10%]"    delay={1.8} />
        <Sparkle size={12} className="top-[42%] left-[5%]"     delay={0.3} />
        <Sparkle size={16} className="bottom-[14%] left-[18%]" delay={1.4} />

        <div className="relative max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: Arch Photo (larger) */}
            <RevealWrapper delay={0.1} yOffset={50}>
              <div className="relative mx-auto w-fit">
                <div className="absolute -inset-4 pointer-events-none"
                  style={{ borderRadius: '180px 180px 28px 28px', background: 'radial-gradient(ellipse at 50% 30%, rgba(212,134,10,0.22) 0%, transparent 70%)' }} />
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                  style={{ width: 340, height: 460 }}
                >
                  <div className="absolute inset-0 overflow-hidden"
                    style={{ borderRadius: '180px 180px 20px 20px' }}>
                    <Image src="/images/didi/didi-ji.jpeg" alt="Sadhvi Samahita Ji"
                      fill className="object-cover object-top" sizes="380px" />
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(160deg,rgba(242,201,76,0.18) 0%,transparent 45%)', borderRadius: '180px 180px 20px 20px' }}
                      initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.35 }} />
                  </div>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ borderRadius: '180px 180px 20px 20px', border: '2px solid rgba(242,201,76,0.45)',
                      boxShadow: '0 0 40px rgba(212,134,10,0.35),0 0 80px rgba(212,134,10,0.12),inset 0 0 30px rgba(212,134,10,0.06)' }} />
                  <div className="absolute pointer-events-none"
                    style={{
                      inset: -4,
                      borderRadius: '184px 184px 24px 24px',
                      background: 'linear-gradient(180deg, rgba(242,201,76,0.55) 0%, rgba(212,134,10,0.18) 45%, transparent 75%)',
                      animation: 'photo-frame-glow 4s ease-in-out infinite',
                    }}
                  />
                  <div className="absolute pointer-events-none"
                    style={{ inset: -2, borderRadius: '182px 182px 22px 22px', border: '1.5px solid rgba(242,201,76,0.5)',
                      animation: 'photo-ring-pulse 4s ease-in-out infinite' }}
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }} viewport={{ once: true }}
                  className="mt-5 text-center">
                  <p className="font-devanagari text-gold-300 text-base tracking-wide">साध्वी समाहिता जी</p>
                  <p className="font-body text-cream-400/50 text-xs tracking-widest uppercase mt-1">Shri Dham Vrindavan</p>
                </motion.div>
              </div>
            </RevealWrapper>

            {/* RIGHT: Animated Text Content */}
            <div className="flex flex-col">

              {/* Tagline label */}
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-body text-gold-400/80 text-xs tracking-[0.28em] uppercase mb-5"
              >
                About Didi Ji
              </motion.p>

              {/* Heading — typing animation */}
              <h2 className="font-devanagari leading-[1.18] mb-5"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)' }}>
                <span className="block">
                  <TypeWriter text="दीदी माँ की" delay={0.2} speed={60} className="text-cream-100" />
                </span>
                <span className="block mt-1">
                  <TypeWriter text="प्रिय शिष्या" delay={1.1} speed={70} goldGradient />
                </span>
              </h2>

              {/* Quote — blur-to-sharp reveal */}
              <motion.p
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-devanagari text-gold-300 text-lg md:text-xl font-semibold leading-relaxed mb-1"
              >
                जहाँ भक्ति है, वहाँ कृष्ण हैं।
              </motion.p>

              {/* Roles — stagger-fade */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
                className="font-body text-cream-300/55 text-sm tracking-wide mb-8"
              >
                Katha Vachak · Ashram Sanchalika · International Spiritual Orator
              </motion.p>

              {/* Divider — width expands */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="w-14 h-px bg-gradient-to-r from-gold-400/70 to-transparent mb-8"
              />

              {/* Body para 1 */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
                className="font-devanagari text-cream-200/75 text-base md:text-lg leading-loose mb-3"
              >
                पूज्या साध्वी समाहिता जी एक प्रतिष्ठित आध्यात्मिक वक्ता एवं कथा वाचिका हैं,
                जो भक्ति, संस्कार और जीवन मूल्यों का प्रसार करती हैं।
              </motion.p>

              {/* Body para 2 */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.94, ease: [0.22, 1, 0.36, 1] }}
                className="font-body text-cream-300/50 text-sm leading-relaxed mb-10"
              >
                A renowned spiritual orator and katha vachak, she inspires devotees through
                divine teachings rooted in Sanatan Dharma.
              </motion.p>

              {/* Button — fade + scale */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5
                    bg-gradient-to-r from-saffron-500 to-saffron-600 text-cream-50 rounded-full
                    font-body text-sm font-medium hover:from-saffron-400 hover:to-saffron-500
                    shadow-[0_4px_28px_rgba(212,134,10,0.4)] hover:shadow-[0_4px_36px_rgba(212,134,10,0.6)]
                    transition-all duration-300">
                  <span className="font-devanagari">और जानें</span>
                  <span>→</span>
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SACRED PHOTO DIVIDER
      ═══════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden
        bg-gradient-to-b from-[#230B00] via-maroon-900 to-maroon-900">
        <div className="absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />
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

        <div className="absolute bottom-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════
          KATHA SERVICES
      ═══════════════════════════════════════ */}
      <KathaSection />

      {/* ═══════════════════════════════════════
          VAANI — Divine Discourses
      ═══════════════════════════════════════ */}
      <VaaniSection />

      {/* ═══════════════════════════════════════
          SEVA KARYA
      ═══════════════════════════════════════ */}
      <section id="seva" className="relative section-padding bg-cream-100 overflow-hidden">
        <GlowOrbs variant="gold" positions={[{ size: 600, bottom: '-8rem', left: '-6rem', duration: 14 }]} />
        <div className="relative max-w-screen-xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-12">
              <p className="text-saffron-500 font-body text-xs tracking-widest uppercase mb-3">Seva Karya</p>
              <h2 className="font-devanagari text-3xl md:text-4xl text-maroon-800 mb-4">सेवा कार्य</h2>
              <p className="font-body text-saffron-600 text-sm md:text-base max-w-xl mx-auto">
                Serving society through compassion, education, and spiritual values.
              </p>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sevaItems.map((item, i) => (
              <RevealWrapper key={item.key} delay={i * 0.1}>
                <div className="spiritual-card p-7 text-center h-full flex flex-col items-center">
                  <span className="text-5xl mb-4 block">{item.icon}</span>
                  <p className="font-body text-saffron-500 text-xs tracking-widest uppercase mb-2">{item.label}</p>
                  <h3 className="font-devanagari text-maroon-700 text-lg mb-3 leading-snug">
                    {item.desc.split('।')[0]}
                  </h3>
                </div>
              </RevealWrapper>
            ))}
          </div>

          <RevealWrapper delay={0.2} className="text-center mt-10">
            <Link href="/seva#donate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-saffron-500
                text-cream-50 rounded-full font-body text-sm font-medium
                hover:bg-saffron-600 transition-all duration-300">
              <span className="font-devanagari">सेवा में सहयोग करें</span> →
            </Link>
          </RevealWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS — light sky-blue carousel
      ═══════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 45%, #dbeafe 100%)' }}>
        {/* Soft ambient shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(186,230,253,0.5) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(199,210,254,0.4) 0%, transparent 70%)' }} />

        <div className="relative max-w-screen-xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-12">
              <p className="font-body text-xs tracking-widest uppercase mb-3 text-sky-600">
                {tHome('testimonials_label')}
              </p>
              <h2 className="font-devanagari text-3xl md:text-4xl text-maroon-800 mb-4">
                श्रद्धालुओं के उद्गार
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-saffron-400/50 to-transparent mx-auto" />
            </div>
          </RevealWrapper>

          {/* Carousel container */}
          <div className="relative">
            {/* Cards */}
            <AnimatePresence custom={tDir} mode="wait">
              <motion.div
                key={tPage}
                initial={{ x: tDir > 0 ? '6%' : '-6%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                exit={{ x: tDir > 0 ? '-6%' : '6%', opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visibleTestimonials.map((t) => (
                  <div key={t.id}
                    className="relative rounded-2xl bg-white p-6 flex flex-col"
                    style={{
                      border: '1.5px solid #BAE6FD',
                      boxShadow: '0 4px 24px rgba(14,165,233,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                    }}>
                    <span className="text-4xl font-display leading-none mb-4 select-none"
                      style={{ color: '#7DD3FC', opacity: 0.6 }}>"</span>
                    <p className="font-devanagari text-slate-700 text-sm leading-loose flex-1 mb-5">
                      {t.quote}
                    </p>
                    <div className="flex items-center gap-3 border-t border-sky-100 pt-4">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600
                        flex items-center justify-center text-cream-50 text-sm font-display flex-shrink-0">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-maroon-800 text-sm font-body font-semibold">{t.name}</p>
                        <p className="text-slate-400 text-xs">{t.city}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Arrow buttons */}
            <button
              onClick={tPrev}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 rounded-full bg-white border border-sky-200 flex items-center justify-center
                text-slate-600 hover:border-saffron-300 hover:text-saffron-600 transition-all duration-200
                shadow-sm hover:shadow-md"
              aria-label="Previous testimonials"
            >
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={tNext}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 rounded-full bg-white border border-sky-200 flex items-center justify-center
                text-slate-600 hover:border-saffron-300 hover:text-saffron-600 transition-all duration-200
                shadow-sm hover:shadow-md"
              aria-label="Next testimonials"
            >
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: TPAGE_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setTDir(i > tPage ? 1 : -1); setTPage(i) }}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === tPage
                    ? 'w-6 h-2 bg-saffron-500'
                    : 'w-2 h-2 bg-sky-200 hover:bg-sky-300'
                )}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          UPDATES / ANNOUNCEMENTS
      ═══════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF8F0 0%, #FFF3E2 50%, #FDEBD0 100%)' }}>
        {/* ambient decorative orbs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,134,10,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(180,60,10,0.06) 0%, transparent 70%)' }} />

        <div className="relative max-w-screen-xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-12">
              <p className="text-saffron-500 font-body text-xs tracking-widest uppercase mb-3">Upcoming Programs</p>
              <h2 className="font-devanagari text-3xl md:text-4xl text-maroon-800 mb-3">आगामी कार्यक्रम</h2>
              <div className="w-20 h-px mx-auto"
                style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }} />
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {updates.map((u, i) => (
              <RevealWrapper key={u.id} delay={i * 0.08}>
                <div className="relative bg-white rounded-2xl overflow-hidden flex flex-col h-full"
                  style={{
                    border: '1px solid rgba(212,134,10,0.18)',
                    boxShadow: '0 4px 20px rgba(180,80,10,0.07), 0 1px 3px rgba(0,0,0,0.04)',
                  }}>
                  {/* Gold top stripe */}
                  <div className="h-1 w-full flex-shrink-0"
                    style={{ background: 'linear-gradient(to right, #D97706, #F2C94C, #D97706)' }} />

                  <div className="p-5 flex flex-col flex-1">
                    {/* Icon + type badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl leading-none">{u.icon}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-devanagari font-medium
                        bg-saffron-50 text-saffron-700 border border-saffron-200/70">
                        {u.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-devanagari text-maroon-800 text-base leading-snug mb-3">
                      {u.titleHi}
                    </h3>

                    {/* Date pill */}
                    <div className="inline-flex items-center gap-1.5 mb-2 self-start
                      px-3 py-1 rounded-full text-xs font-devanagari"
                      style={{ background: 'rgba(212,134,10,0.1)', color: '#92400E' }}>
                      <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
                        <rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                        <path d="M5 1v2M11 1v2M1 6h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      {u.dateHi}
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs font-devanagari text-slate-500 mb-5 flex-1">
                      <svg viewBox="0 0 16 20" width="9" height="11" fill="none" className="flex-shrink-0 mt-0.5">
                        <path d="M8 1C4.686 1 2 3.686 2 7c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6z"
                          stroke="currentColor" strokeWidth="1.4"/>
                        <circle cx="8" cy="7" r="2" stroke="currentColor" strokeWidth="1.4"/>
                      </svg>
                      {u.locationHi}
                    </div>

                    {/* WhatsApp CTA */}
                    <a
                      href={`https://wa.me/919999649311?text=${encodeURIComponent(u.waMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full
                        py-2.5 rounded-xl text-sm font-devanagari font-medium text-white
                        transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                      style={{ background: 'linear-gradient(135deg, #16A34A, #15803D)' }}
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white flex-shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      और जानें →
                    </a>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOOK KATHA CTA
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
                target="_blank" rel="noopener noreferrer"
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
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4
                  border border-saffron-400 text-saffron-700 rounded-full
                  font-body text-base hover:bg-saffron-50 transition-all duration-300">
                <span className="font-devanagari">संपर्क फ़ॉर्म</span> →
              </Link>
            </div>
          </div>
        </RevealWrapper>
      </section>

    </div>
  )
}
