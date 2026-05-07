'use client'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { analytics } from '@/lib/analytics'

const WA_NUMBER = '919999649311'
const CALL_NUMBER = '8650620909'

const WA_GENERAL = encodeURIComponent(
  'प्रणाम 🙏\nमैं पूज्या साध्वी समाहिता जी से संपर्क करना चाहता/चाहती हूँ।\nधन्यवाद।'
)

const quickOptions = [
  {
    icon: '🪔',
    title: 'कथा आयोजन',
    message:
      'प्रणाम 🙏\nमैं कथा आयोजन के संबंध में जानकारी प्राप्त करना चाहता/चाहती हूँ।\nकृपया मार्गदर्शन करें।',
  },
  {
    icon: '🤝',
    title: 'सेवा संबंधित जानकारी',
    message:
      'प्रणाम 🙏\nमैं सेवा संबंधित जानकारी प्राप्त करना चाहता/चाहती हूँ।\nकृपया मार्गदर्शन करें।',
  },
  {
    icon: '🙏',
    title: 'व्यक्तिगत मार्गदर्शन',
    message:
      'प्रणाम 🙏\nमैं व्यक्तिगत मार्गदर्शन हेतु संपर्क करना चाहता/चाहती हूँ।\nकृपया मार्गदर्शन करें।',
  },
  {
    icon: '💬',
    title: 'अन्य',
    message:
      'प्रणाम 🙏\nमैं आपसे संपर्क करना चाहता/चाहती हूँ।\nकृपया मार्गदर्शन करें।',
  },
]

const CARD_DELAYS = [0.35, 0.44, 0.53, 0.62]

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export default function ContactClient() {
  return (
    <div className="min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #fffbf0 0%, #fff7ed 35%, #fef9f0 70%, #fff5f5 100%)' }}>

      {/* Soft ambient glows — fixed so they don't interfere with scroll */}
      <div className="fixed top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 65%)', zIndex: 0 }} />
      <div className="fixed bottom-20 -left-12 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)', zIndex: 0 }} />

      <div className="relative z-10 max-w-lg mx-auto px-5 pt-28 pb-20 flex flex-col items-center gap-10">

        {/* ── HERO ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
            style={{
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              boxShadow: '0 6px 24px rgba(251,191,36,0.28), 0 2px 8px rgba(251,191,36,0.15)',
            }}>
            <span className="text-2xl select-none">🙏</span>
          </div>

          <h1 className="font-devanagari text-[2.6rem] md:text-5xl font-semibold leading-tight mb-3"
            style={{ color: '#7C2D12' }}>
            संपर्क करें
          </h1>

          <p className="font-devanagari text-base md:text-lg leading-relaxed max-w-xs mx-auto"
            style={{ color: '#9A3412' }}>
            कथा, सेवा या मार्गदर्शन हेतु हमसे सीधे जुड़ें
          </p>
        </motion.div>

        {/* ── INVITATION TEXT ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-devanagari text-xl md:text-2xl font-medium mb-1.5"
            style={{ color: '#431407' }}>
            आप हमसे सीधे संवाद कर सकते हैं
          </p>
          <p className="font-devanagari text-sm" style={{ color: '#B45309' }}>
            आपका संदेश हमारे लिए महत्वपूर्ण है
          </p>
        </motion.div>

        {/* ── MAIN WHATSAPP CTA ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <motion.a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_GENERAL}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.whatsappClick('contact_main')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl
              font-devanagari text-lg text-white font-medium select-none"
            style={{
              background: 'linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)',
              boxShadow: '0 6px 28px rgba(180,83,9,0.28), 0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {WA_ICON}
            WhatsApp पर संपर्क करें
          </motion.a>
        </motion.div>

        {/* ── QUICK TOPIC CARDS ────────────────── */}
        <div className="w-full">
          <p className="font-body text-[10px] tracking-[0.26em] uppercase text-center mb-4"
            style={{ color: '#B45309' }}>
            विषय चुनें
          </p>
          <div className="grid grid-cols-2 gap-3">
            {quickOptions.map((opt, i) => (
              <motion.a
                key={opt.title}
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(opt.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  analytics.whatsappClick('contact_topic')
                  if (opt.title === 'कथा आयोजन') analytics.kathaBookingInitiated(opt.title)
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: CARD_DELAYS[i], ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl
                  cursor-pointer transition-colors duration-200 min-h-[96px] justify-center select-none"
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #FDE68A',
                  boxShadow: '0 2px 10px rgba(251,191,36,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = '#F59E0B'
                  ;(e.currentTarget as HTMLElement).style.background = '#FFFBEB'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = '#FDE68A'
                  ;(e.currentTarget as HTMLElement).style.background = '#FFFFFF'
                }}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span className="font-devanagari text-sm leading-snug font-medium"
                  style={{ color: '#7C2D12' }}>
                  {opt.title}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, #FDE68A, transparent)' }}
        />

        {/* ── CALL BUTTON ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <p className="font-body text-[10px] tracking-[0.26em] uppercase text-center mb-3"
            style={{ color: '#B45309' }}>
            फ़ोन पर बात करें
          </p>
          <motion.a
            href={`tel:+91${CALL_NUMBER}`}
            onClick={() => analytics.phoneCallClicked()}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-2xl
              transition-colors duration-200 select-none"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #FDE68A',
              boxShadow: '0 2px 10px rgba(251,191,36,0.08), 0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <Phone size={18} style={{ color: '#D97706', flexShrink: 0 }} />
            <span className="font-body text-base font-medium tracking-wide" style={{ color: '#431407' }}>
              {CALL_NUMBER}
            </span>
            <span className="font-devanagari text-sm" style={{ color: '#9A3412' }}>
              (कॉल करें)
            </span>
          </motion.a>
        </motion.div>

        {/* ── LOCATION ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.72 }}
          className="text-center"
        >
          <p className="font-body text-[10px] tracking-[0.24em] uppercase mb-1.5"
            style={{ color: '#D97706' }}>
            Location
          </p>
          <p className="font-devanagari text-base font-medium" style={{ color: '#7C2D12' }}>
            📍 श्री धाम वृंदावन
          </p>
        </motion.div>

        {/* ── RESPONSE NOTE ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.8 }}
          className="text-center px-2"
        >
          <p className="font-devanagari text-sm leading-relaxed" style={{ color: '#B45309', opacity: 0.75 }}>
            कृपया संदेश भेजने के बाद धैर्य रखें,<br />
            शीघ्र ही उत्तर दिया जाएगा।
          </p>
        </motion.div>

      </div>
    </div>
  )
}
