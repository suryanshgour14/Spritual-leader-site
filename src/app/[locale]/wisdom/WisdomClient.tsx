'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function cloudUrl(src: string, w: number) {
  return src.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`)
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

// ── 10 quote images + paired reflective lines ─────────────────────────────────
const quotes = [
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049642/497496655_1245118910307797_5516305226425285160_n_r3bbtc.jpg',
    text: 'भक्ति केवल पूजा नहीं, बल्कि जीवन जीने की एक दिव्य दिशा है।',
    label: 'Bhakti',
  },
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049642/520562062_1298734308279590_6984035113176353880_n_afk9pz.jpg',
    text: 'संस्कार, सेवा और साधना — यही जीवन की वास्तविक शक्ति हैं।',
    label: 'Sanskriti',
  },
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049642/542131019_1332449248241429_2497974874051755041_n_zp2sdq.jpg',
    text: 'आध्यात्मिकता व्यक्ति को भीतर से प्रकाशित करती है।',
    label: 'Adhyatma',
  },
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049641/509602007_1272134790939542_6417607325386347504_n_pbo2nw.jpg',
    text: 'जहाँ श्रद्धा है, वहाँ ईश्वर का वास है।',
    label: 'Shraddha',
  },
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049640/498640796_1246401750179513_504207222815705897_n_luohv8.jpg',
    text: 'सेवा ही सच्ची साधना है — यही जीवन का सार है।',
    label: 'Seva',
  },
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049640/506097054_1265549541598067_3398820356830204370_n_cdooji.jpg',
    text: 'धर्म का पालन केवल कर्मकांड नहीं, जीवन का सर्वोच्च संस्कार है।',
    label: 'Dharma',
  },
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049639/492868766_1232359524917069_5912064375860611719_n_ti3hjb.jpg',
    text: 'मन की शांति सबसे बड़ा धन है।',
    label: 'Shanti',
  },
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049639/484129359_1200040248148997_8080197189460230243_n_uubijf.jpg',
    text: 'हर बेटी शिक्षित, संस्कारित और आत्मनिर्भर बने।',
    label: 'Shakti',
  },
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049639/482010684_1193834505436238_533445607403353616_n_jgkzdo.jpg',
    text: 'कथा श्रवण मात्र से आत्मा का कल्याण होता है।',
    label: 'Katha',
  },
  {
    src: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778049641/494185893_1233776944775327_6927978120769576770_n_zcypjk.jpg',
    text: 'प्रेम, भक्ति और सेवा — इन तीनों से जीवन पूर्ण होता है।',
    label: 'Prem',
  },
]

// ── 14 newspaper / article images ────────────────────────────────────────────
const articles = [
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048608/WhatsApp_Image_2026-05-05_at_17.10.41_hrxkft.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048608/WhatsApp_Image_2026-05-05_at_17.10.40_nooe2v.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048608/WhatsApp_Image_2026-05-05_at_17.10.42_oxx2qr.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048607/WhatsApp_Image_2026-05-05_at_17.10.411_rfduzc.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048607/17.10.41_etldya.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048607/img251_svi6z7.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048607/img158_h0go61.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048607/img221_h6bvvh.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048607/img164_i29v08.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048606/img149_tp0ytb.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048606/img143_kkz0wb.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048606/img134_pgxoap.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048605/img98_optryz.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1778048605/img92_duvi1o.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1781761763/WhatsApp_Image_2026-06-18_at_10.14.05_jxwdp4.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1781761763/WhatsApp_Image_2026-06-18_at_10.14.05_1_kpp6cp.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1781761764/WhatsApp_Image_2026-06-18_at_10.14.04_wobv4o.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1781761764/WhatsApp_Image_2026-06-18_at_10.14.05_2_f1tliu.jpg',
]

// ── Quote block ───────────────────────────────────────────────────────────────
function QuoteBlock({ q, index }: { q: typeof quotes[0]; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={`flex flex-col md:flex-row items-center gap-10 md:gap-16
        ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image */}
      <div className="w-full md:w-[42%] flex-shrink-0">
        <div className="overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
          <img
            src={cloudUrl(q.src, 800)}
            alt={q.label}
            className="w-full h-auto block"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Quote text */}
      <div className={`flex-1 text-center md:text-left ${!isEven ? 'md:text-right' : ''}`}>
        <p className="font-body text-amber-600/60 text-[10px] tracking-[0.25em] uppercase mb-4">
          {q.label}
        </p>
        <div className="flex items-start gap-2 justify-center md:justify-start"
          style={!isEven ? { justifyContent: 'flex-end' } : {}}>
          <span className="text-amber-400/40 font-display text-5xl leading-none select-none mt-[-6px] flex-shrink-0">
            "
          </span>
          <blockquote
            className="font-devanagari text-stone-800 leading-relaxed"
            style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.55rem)' }}
          >
            {q.text}
          </blockquote>
        </div>
        <div className="mt-6 flex items-center gap-3"
          style={{ justifyContent: !isEven ? 'flex-end' : 'flex-start' }}>
          <div className="h-px w-8 bg-amber-400/40" />
          <p className="font-body text-stone-400 text-xs tracking-widest">
            Sadhvi Samahita Ji
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WisdomClient() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <div className="bg-stone-50 min-h-screen overflow-x-hidden">

      {/* ── HEADING ─────────────────────────────────────────────────────────── */}
      <div className="pt-28 pb-14 text-center px-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-body text-amber-600/60 text-xs tracking-[0.3em] uppercase mb-5"
        >
          Spiritual Reflections
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-devanagari text-5xl md:text-6xl text-stone-800 leading-tight"
        >
          विचार
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px mx-auto mt-6"
          style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }}
        />
      </div>

      {/* ── QUOTE BLOCKS — first 5 ──────────────────────────────────────────── */}
      <section className="max-w-screen-lg mx-auto px-6 md:px-10 space-y-24 pb-24">
        {quotes.slice(0, 5).map((q, i) => (
          <QuoteBlock key={i} q={q} index={i} />
        ))}
      </section>

      {/* ── REFLECTION SECTION ──────────────────────────────────────────────── */}
      <section
        className="py-20 px-6 md:px-10"
        style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)' }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-body text-sky-600/60 text-xs tracking-[0.25em] uppercase mb-6">
            Reflection
          </p>
          <div className="w-10 h-px mx-auto mb-8"
            style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }} />
          <p className="font-devanagari text-slate-700 text-lg md:text-xl leading-loose mb-6">
            पूज्या साध्वी समाहिता जी की वाणी केवल प्रवचन नहीं, बल्कि आत्मचिंतन और
            सकारात्मक परिवर्तन की प्रेरणा है।
          </p>
          <p className="font-devanagari text-slate-500 text-base md:text-lg leading-loose">
            आपके विचार धर्म, सेवा और मानवीय मूल्यों को जीवन में उतारने की दिशा प्रदान करते हैं।
          </p>
          <div className="w-10 h-px mx-auto mt-8"
            style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }} />
        </motion.div>
      </section>

      {/* ── QUOTE BLOCKS — last 5 ───────────────────────────────────────────── */}
      <section className="max-w-screen-lg mx-auto px-6 md:px-10 space-y-24 py-24">
        {quotes.slice(5).map((q, i) => (
          <QuoteBlock key={i + 5} q={q} index={i + 5} />
        ))}
      </section>

      {/* ── ARTICLE / PRAKASHAN SECTION ─────────────────────────────────────── */}
      <section className="border-t border-stone-200 pt-16 pb-20 px-6 md:px-10 max-w-screen-xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12"
        >
          <p className="font-body text-amber-600/60 text-xs tracking-[0.25em] uppercase mb-4">
            Publications &amp; Features
          </p>
          <h2 className="font-devanagari text-3xl md:text-4xl text-stone-800 mb-5">
            प्रकाशन
          </h2>
          <div className="w-14 h-px mx-auto"
            style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }} />
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {articles.map((src, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 4) * 0.07 }}
              className="mb-3 break-inside-avoid overflow-hidden rounded-xl cursor-pointer group
                shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]
                transition-shadow duration-300"
              onClick={() => setLightbox(src)}
            >
              <img
                src={cloudUrl(src, 600)}
                alt={`प्रकाशन ${i + 1}`}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.93)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              src={cloudUrl(lightbox, 1600)}
              alt="Full view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-default"
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center
                text-white transition-colors duration-200"
              style={{ background: 'rgba(255,255,255,0.12)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
