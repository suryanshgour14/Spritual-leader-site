'use client'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import RevealWrapper from '@/components/shared/RevealWrapper'

// ─── Katha data ──────────────────────────────────────────────────────────────
type KathaItem = { key: string; icon: string; titleHi: string; desc: string; waText: string }

const primaryKathas: KathaItem[] = [
  {
    key: 'bhagavat', icon: '📖', titleHi: 'श्रीमद्भागवत कथा',
    desc: 'Experiencing the divine leelas of Lord Krishna and the path of devotion.',
    waText: 'प्रणाम 🙏\nमैं पूज्या साध्वी समाहिता जी से श्रीमद्भागवत कथा हेतु संपर्क करना चाहता/चाहती हूँ।\nकृपया उपलब्धता एवं प्रक्रिया की जानकारी प्रदान करें।\nधन्यवाद।',
  },
  {
    key: 'ram', icon: '🏹', titleHi: 'राम कथा',
    desc: 'Sacred teachings from the life of Lord Ram and righteous living.',
    waText: 'प्रणाम 🙏\nमैं पूज्या साध्वी समाहिता जी से राम कथा हेतु संपर्क करना चाहता/चाहती हूँ।\nकृपया उपलब्धता एवं प्रक्रिया की जानकारी प्रदान करें।\nधन्यवाद।',
  },
  {
    key: 'shiv', icon: '🕉️', titleHi: 'शिव महापुराण',
    desc: 'Spiritual wisdom centered on Lord Shiva and inner transformation.',
    waText: 'प्रणाम 🙏\nमैं पूज्या साध्वी समाहिता जी से शिव महापुराण हेतु संपर्क करना चाहता/चाहती हूँ।\nकृपया उपलब्धता एवं प्रक्रिया की जानकारी प्रदान करें।\nधन्यवाद।',
  },
  {
    key: 'devi', icon: '🪷', titleHi: 'देवी भागवत',
    desc: 'Divine stories of Adi Shakti and devotion.',
    waText: 'प्रणाम 🙏\nमैं पूज्या साध्वी समाहिता जी से देवी भागवत हेतु संपर्क करना चाहता/चाहती हूँ।\nकृपया उपलब्धता एवं प्रक्रिया की जानकारी प्रदान करें।\nधन्यवाद।',
  },
]

const otherPrograms: KathaItem[] = [
  {
    key: 'bhajan', icon: '🎵', titleHi: 'भजन संध्या',
    desc: 'Devotional music and spiritual gatherings filled with bhakti.',
    waText: 'प्रणाम 🙏\nमैं पूज्या साध्वी समाहिता जी से भजन संध्या हेतु संपर्क करना चाहता/चाहती हूँ।\nकृपया उपलब्धता एवं प्रक्रिया की जानकारी प्रदान करें।\nधन्यवाद।',
  },
  {
    key: 'sunderkand', icon: '🙏', titleHi: 'सुंदरकाण्ड पाठ',
    desc: "Recitation of Hanuman Ji's divine leela bringing strength and peace.",
    waText: 'प्रणाम 🙏\nमैं पूज्या साध्वी समाहिता जी से सुंदरकाण्ड पाठ हेतु संपर्क करना चाहता/चाहती हूँ।\nकृपया उपलब्धता एवं प्रक्रिया की जानकारी प्रदान करें।\nधन्यवाद।',
  },
]

// ─── Floating gold dust (mount-guarded) ──────────────────────────────────────
function GoldDust() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dots = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 40,
      duration: 5 + Math.random() * 9,
      delay: Math.random() * 10,
      size: 1.5 + Math.random() * 2.5,
    })),
  [])
  if (!mounted) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map(d => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            bottom: `${d.bottom}%`,
            width: d.size,
            height: d.size,
            background: `rgba(242,201,76,${0.3 + Math.random() * 0.4})`,
            animation: `katha-floatup ${d.duration}s ${d.delay}s linear infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────
function KathaCard({ card }: { card: KathaItem }) {
  const waLink = `https://wa.me/919999649311?text=${encodeURIComponent(card.waText)}`
  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="block rounded-2xl border border-gold-300/20 p-5 md:p-6
        cursor-pointer group relative overflow-hidden h-full"
      style={{
        background: 'linear-gradient(135deg,rgba(40,10,0,0.85) 0%,rgba(20,5,0,0.92) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 4px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(242,201,76,0.08)',
      }}
    >
      {/* Animated gold corner glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: 'linear-gradient(135deg,rgba(212,134,10,0.18) 0%,transparent 55%)', border: '1px solid rgba(242,201,76,0.4)' }} />

      <div className="relative flex flex-col h-full">
        <span className="text-2xl mb-3 block">{card.icon}</span>
        <h3 className="font-devanagari text-gold-200 text-[15px] md:text-[16px] font-semibold mb-2 leading-snug">
          {card.titleHi}
        </h3>
        <p className="font-body text-cream-300/70 text-[11px] leading-relaxed mb-4 flex-1">
          {card.desc}
        </p>
        <span className="flex items-center gap-1.5 text-[11px] font-body text-gold-400 group-hover:text-gold-300 transition-colors mt-auto">
          <span className="font-devanagari text-[11px]">WhatsApp पर बुक करें</span>
          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 flex-shrink-0 stroke-current" strokeWidth="1.5">
            <path d="M2 5h6M5 2l3 3-3 3" />
          </svg>
        </span>
      </div>
    </motion.a>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function KathaSection() {
  return (
    <section id="katha" className="relative overflow-hidden section-padding"
      style={{ background: 'linear-gradient(160deg,#1A0505 0%,#2D0A00 30%,#1A0A02 55%,#0F0300 100%)' }}>

      {/* Radial glow — top-right warm saffron (CSS animation, zero JS cost) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700, top: '-18rem', right: '-12rem', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(212,134,10,0.18) 0%,transparent 65%)',
          animation: 'katha-glow-scale 8s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Radial glow — bottom-left maroon (CSS animation) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600, bottom: '-10rem', left: '-10rem', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(139,26,26,0.28) 0%,transparent 65%)',
          animation: 'katha-glow-maroon 10s ease-in-out 2s infinite',
          willChange: 'transform',
        }}
      />

      {/* Centre gold shimmer (CSS animation) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%,rgba(212,134,10,0.10) 0%,transparent 60%)',
          animation: 'katha-glow-fade 6s ease-in-out 1s infinite',
        }}
      />

      {/* Gold top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      {/* Floating gold dust */}
      <GoldDust />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto">

        {/* Header */}
        <RevealWrapper>
          <div className="text-center mb-12">
            <p className="font-body text-xs tracking-[0.22em] text-gold-400 uppercase mb-3">
              कथाएँ एवं सेवाएँ
            </p>
            <h2 className="font-devanagari text-3xl md:text-4xl text-gold-300 mb-4">
              कथाएँ एवं कार्यक्रम
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent mx-auto mb-4" />
            <p className="font-body text-cream-300/70 text-sm max-w-xl mx-auto leading-relaxed">
              अपने शहर में साध्वी समाहिता जी की कथा या आध्यात्मिक कार्यक्रम के लिए आमंत्रित करें
            </p>
          </div>
        </RevealWrapper>

        {/* Primary kathas — 4 cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {primaryKathas.map((card, i) => (
            <RevealWrapper key={card.key} delay={i * 0.08} yOffset={24}>
              <KathaCard card={card} />
            </RevealWrapper>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/30" />
          <span className="font-devanagari text-gold-400/80 text-xs tracking-wide whitespace-nowrap">
            अन्य आध्यात्मिक कार्यक्रम
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/30" />
        </div>

        {/* Other programs — 2 cards centered */}
        <div className="grid grid-cols-2 gap-4 md:gap-5 max-w-[560px] mx-auto">
          {otherPrograms.map((card, i) => (
            <RevealWrapper key={card.key} delay={i * 0.1} yOffset={24}>
              <KathaCard card={card} />
            </RevealWrapper>
          ))}
        </div>

        {/* View All */}
        <RevealWrapper delay={0.3} className="text-center mt-10">
          <Link
            href="/katha"
            className="inline-flex items-center gap-2 px-7 py-3
              border border-gold-300/40 text-gold-300 rounded-full
              font-body text-sm hover:bg-gold-300/10 hover:border-gold-300
              transition-all duration-300"
          >
            View All Kathas →
          </Link>
        </RevealWrapper>
      </div>

      {/* Gold bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
    </section>
  )
}
