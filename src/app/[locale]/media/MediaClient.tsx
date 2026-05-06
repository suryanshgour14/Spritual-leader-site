'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FB_URL = 'https://www.facebook.com/SadhviSamahitaDidi'

function cloudUrl(src: string, w: number): string {
  return src.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`)
}

// ── 5 featured images (bento hero) ───────────────────────────────────────────
const featured = [
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971890/katha1_sr9v5n.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971914/katha2_uqyyte.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971893/DIDIMAA_awc0px.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971896/dv1_gub8jv.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971955/img80_aslolg.jpg',
]

// ── Masonry gallery (all remaining, deduped) ──────────────────────────────────
const gallery = [
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971953/img83_oukqvt.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971953/img65_soacbx.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971949/img4_odquej.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971897/img68_afizhk.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971896/dv2_h8wemy.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971944/img26_nwuehw.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971942/img89_gkisrn.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971926/S3_uto17y.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971924/img29_ivrwlz.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971922/img116_vogpkj.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971920/S2_mcxszo.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971938/img86_clsxxm.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971935/img62_w0vty7.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971934/img44_ush9ah.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971893/nitingatkri_nhnsij.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971892/nt_ci2tpe.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971934/img56_bvota9.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971933/img59_gfokab.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971933/shakti_uuvqzt.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971929/img53_slzzfd.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971929/img14_zr5jrb.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971918/img254_uiituf.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971918/img287_rcznva.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971915/img284_v9tysf.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971914/img242_gk8vwf.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971914/img278_lgsl3b.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971913/katha4_jkku0m.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971913/img227_e3guc5.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971909/img212_h0mh8f.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971909/img221_dldkrc.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971908/img215_o6ok5b.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971908/img161_johgbf.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971907/img200_emq2kp.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971907/img194_hpwabv.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971907/img188_u5u6ht.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971905/img185_cuapki.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971905/img170_wwrjex.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971903/img104_sn9qvo.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971903/img152_q9zwzw.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971902/img77_dvrmns.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971902/img230_zbh1dh.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971901/img176_szxypl.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971901/img233_jbyrk9.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971899/img71_huh7ge.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971898/img98_tj1g5v.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971897/katha3_oiaqoz.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971897/img50_r1x5ui.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971895/img92_sdxwfi.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971894/img95_s0unkm.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777971911/img254_uiituf.jpg',
]

export default function MediaClient() {
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
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">

      {/* ── HEADING ─────────────────────────────── */}
      <div className="pt-28 pb-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-devanagari text-5xl md:text-6xl leading-tight"
          style={{ color: '#7C2D12' }}
        >
          झलकियाँ
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-px mx-auto mt-5"
          style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }}
        />
      </div>

      {/* ── FEATURED BENTO (desktop) / stacked (mobile) ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="px-4 md:px-8 lg:px-12 max-w-screen-xl mx-auto mb-4"
      >
        {/* Desktop bento grid */}
        <div className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: '3fr 2fr 2fr',
            gridTemplateRows: '265px 265px',
          }}>

          {/* Large left — spans both rows */}
          <div
            className="overflow-hidden rounded-2xl cursor-pointer group"
            style={{ gridRow: '1 / span 2' }}
            onClick={() => setLightbox(featured[0])}
          >
            <img
              src={cloudUrl(featured[0], 1400)}
              alt="Featured katha"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="eager"
            />
          </div>

          {/* Right 4 images */}
          {featured.slice(1).map((src, i) => (
            <div key={i}
              className="overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => setLightbox(src)}
            >
              <img
                src={cloudUrl(src, 900)}
                alt={`Featured ${i + 2}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Mobile stacked */}
        <div className="md:hidden flex flex-col gap-3">
          <div className="overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => setLightbox(featured[0])}>
            <img
              src={cloudUrl(featured[0], 900)}
              alt="Featured"
              className="w-full h-[260px] object-cover"
              loading="eager"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featured.slice(1).map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setLightbox(src)}>
                <img
                  src={cloudUrl(src, 600)}
                  alt={`Featured ${i + 2}`}
                  className="w-full h-[160px] object-cover"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── MASONRY GALLERY ─────────────────────── */}
      <section className="px-4 md:px-8 lg:px-12 max-w-screen-xl mx-auto pb-6">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {gallery.map((src, i) => (
            <div key={i} className="mb-3 break-inside-avoid overflow-hidden rounded-xl cursor-pointer group">
              <img
                src={cloudUrl(src, 700)}
                alt={`Gallery ${i + 1}`}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
                onClick={() => setLightbox(src)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── FACEBOOK BUTTON ─────────────────────── */}
      <div className="py-14 text-center">
        <a
          href={FB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full
            text-white font-body text-sm font-medium
            transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.03]"
          style={{ background: '#1877F2' }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 fill-white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="font-devanagari">और देखें (Facebook पर)</span>
        </a>
      </div>

      {/* ── LIGHTBOX ────────────────────────────── */}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              src={cloudUrl(lightbox, 1600)}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close button */}
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
