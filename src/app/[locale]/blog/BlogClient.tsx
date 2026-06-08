'use client'
import { motion } from 'framer-motion'
import GlowOrbs from '@/components/shared/GlowOrbs'

const upcoming = [
  { icon: '📿', hi: 'आध्यात्मिक लेख', en: 'Spiritual Articles' },
  { icon: '🪔', hi: 'कथा अनुभव',       en: 'Katha Reflections' },
  { icon: '🌸', hi: 'जीवन दर्शन',      en: 'Life Philosophy'   },
]

export default function BlogClient() {
  return (
    <div className="min-h-screen bg-cream-100 overflow-hidden relative">

      <GlowOrbs
        variant="gold"
        positions={[
          { size: 500, top: '-4rem',   right: '-6rem',  duration: 14 },
          { size: 380, bottom: '4rem', left:  '-5rem',  duration: 18 },
        ]}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[88vh] px-6 text-center gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            boxShadow: '0 8px 32px rgba(251,191,36,0.25), 0 2px 8px rgba(251,191,36,0.12)',
          }}
        >
          <span className="text-3xl select-none">✍️</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-1"
        >
          <h1 className="font-devanagari text-5xl md:text-6xl font-semibold leading-tight"
            style={{ color: '#7C2D12' }}>
            ब्लॉग
          </h1>
          <p className="font-body text-sm tracking-[0.22em] uppercase" style={{ color: '#B45309' }}>
            Blog
          </p>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="w-32 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }}
        />

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <p className="font-devanagari text-2xl md:text-3xl font-medium" style={{ color: '#431407' }}>
            शीघ्र आ रहा है...
          </p>
          <p className="font-body text-xs tracking-[0.18em] uppercase" style={{ color: '#9A3412' }}>
            Coming Soon
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="font-devanagari text-base md:text-lg leading-relaxed max-w-sm"
          style={{ color: '#92400E' }}
        >
          साध्वी समाहिता जी के विचार, कथा अनुभव एवं आध्यात्मिक लेख यहाँ प्रकाशित होंगे।
        </motion.p>

        {/* Preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-3 w-full max-w-sm"
        >
          {upcoming.map((item) => (
            <div
              key={item.en}
              className="flex flex-col items-center gap-2 py-5 px-3 rounded-2xl"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #FDE68A',
                boxShadow: '0 2px 12px rgba(251,191,36,0.08)',
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-devanagari text-xs text-center leading-snug"
                style={{ color: '#7C2D12' }}>
                {item.hi}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="font-devanagari text-sm"
          style={{ color: '#B45309', opacity: 0.65 }}
        >
          🙏 जय श्री राधे
        </motion.p>

      </div>
    </div>
  )
}
