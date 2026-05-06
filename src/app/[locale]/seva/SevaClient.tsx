'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import RevealWrapper from '@/components/shared/RevealWrapper'
import GlowOrbs from '@/components/shared/GlowOrbs'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const WA_NUMBER = '919999649311'
const QR_URL =
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777961770/WhatsApp_Image_2026-05-05_at_11.35.13_tgjkh0.jpg'
const HERO_PHOTO =
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777970141/530552133_1312393686913652_7987465973868435683_n_hn2u01.jpg'

// ── Data ──────────────────────────────────────────────────────────────────────
type SevaBlock = {
  id: string
  icon: string
  titleHi: string
  tagline: string
  desc: string
  images: string[]
}

const sevaBlocks: SevaBlock[] = [
  {
    id: 'shiksha',
    icon: '🎓',
    titleHi: 'बेटियों की शिक्षा',
    tagline: 'Education · Empowerment · Future',
    desc: 'जरूरतमंद एवं प्रतिभाशाली छात्राओं को शिक्षा के माध्यम से आत्मनिर्भर बनाने का यह एक महत्वपूर्ण प्रयास है। हर बेटी को उसके सपनों तक पहुँचाने की यह यात्रा आपके सहयोग से और सशक्त होती है।',
    images: [
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928229/57504383_2698340583570876_8623318080006651904_n_ylsep1.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928232/513425994_30183947201250177_8125326113906303017_n_fqw6it.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928237/510990315_30177930465185184_2374324176280328606_n_iqkfkt.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928274/513830155_30183947261250171_5548126622134422803_n_lhrpyw.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928219/135869001_4929346673803578_3139338458465828152_n_w4bdh9.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928190/PDFGallery_20260504_173839_page-0003_cga7kl.jpg',
    ],
  },
  {
    id: 'pg',
    icon: '🏠',
    titleHi: 'सुरक्षित आवास (PG)',
    tagline: 'Safe · Peaceful · Supportive',
    desc: 'छात्राओं को सुरक्षित और अनुकूल वातावरण प्रदान करना, ताकि वे निश्चिंत होकर अपने लक्ष्य की ओर बढ़ सकें। एक ऐसा घर जो माँ की गोद जैसा हो — यही हमारा प्रयास है।',
    images: [
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777969836/img8_wbs3i9.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928319/475390320_1169435977876091_2958015399007743999_n_y7qyzc.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928316/64270616_2823905661014367_3918124348598124544_n_ksua0m.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928312/473257476_1155967329222956_3033161054148954238_n_gqvcxj.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777961598/546182887_1336390867847267_8818569856510445183_n_dciqxj.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777961592/514424071_1281852823301072_8351844537902047476_n_kfgglp.jpg',
    ],
  },
  {
    id: 'gaushala',
    icon: '🐄',
    titleHi: 'गौ सेवा',
    tagline: 'Compassion · Care · Karma',
    desc: 'गौ सेवा के माध्यम से करुणा और सेवा भाव का प्रसार किया जाता है। गौ माता की सेवा न केवल एक धार्मिक कर्तव्य है, बल्कि यह हृदय की शुद्धि और आत्मा के कल्याण का मार्ग है।',
    images: [
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777918660/480458993_1181936423292713_5679742192575415368_n_nuxql4.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777918716/571676409_1380084250144595_7925320512002060714_n_e0rxkk.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777918728/571309745_1380084310144589_468824700868122583_n_yny628.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777929229/514397138_30179613088350255_9027871510217871925_n_u0g51q.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777918649/477782597_1176449597174729_238187490016598185_n_ooviqq.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777961081/477396997_1177006567119032_854582881436270788_n_suk2xf.jpg',
    ],
  },
  {
    id: 'vivah',
    icon: '💍',
    titleHi: 'विवाह सहयोग',
    tagline: 'Dignity · Support · Blessings',
    desc: 'आर्थिक रूप से कमजोर परिवारों की बेटियों के विवाह में सहयोग प्रदान करना। हर बेटी का सम्मानपूर्वक विवाह हो — यह केवल एक इच्छा नहीं, बल्कि हमारी प्रतिबद्धता है।',
    images: [
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777929285/473896154_1160385942114428_4513997483720527025_n_o67vce.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777929282/589578216_1401892117963808_6547660835270348515_n_wuteoi.jpg',
    ],
  },
  {
    id: 'exam',
    icon: '📚',
    titleHi: 'प्रतियोगी परीक्षा मार्गदर्शन',
    tagline: 'IAS · PCS · Competitive Exams',
    desc: 'IAS, PCS एवं अन्य प्रतियोगी परीक्षाओं हेतु छात्राओं को मार्गदर्शन और समर्थन प्रदान करना। हर संभावना को एक दिशा देना — यही इस प्रयास का लक्ष्य है।',
    images: [],
  },
]

// ── Copy Button ───────────────────────────────────────────────────────────────
function CopyButton({ text, light = false }: { text: string; light?: boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).catch(() => {})
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className={cn(
        'flex-shrink-0 px-2.5 py-1 text-[10px] font-body rounded-md border transition-all duration-200',
        light
          ? 'border-saffron-400/40 text-saffron-700 hover:bg-saffron-50'
          : 'border-gold-400/40 text-gold-300 hover:bg-gold-400/10',
        copied && (light ? 'bg-saffron-50 border-saffron-400' : 'bg-gold-400/15 border-gold-400'),
      )}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

// ── Download QR Button ────────────────────────────────────────────────────────
function DownloadQRButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')

  async function handleDownload() {
    setState('loading')
    try {
      const res = await fetch(QR_URL)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = 'SadhviSamahitaJi_UPI_QR.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
      setState('done')
      setTimeout(() => setState('idle'), 2500)
    } catch {
      window.open(QR_URL, '_blank')
      setState('idle')
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={state === 'loading'}
      className={cn(
        'mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-body border transition-all duration-200',
        state === 'done'
          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
          : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100',
        state === 'loading' && 'opacity-70 cursor-not-allowed',
      )}
    >
      <span>
        {state === 'loading' ? '⏳' : state === 'done' ? '✅' : '⬇'}
      </span>
      <span>
        {state === 'loading' ? 'Downloading…' : state === 'done' ? 'Downloaded!' : 'Download QR'}
      </span>
    </button>
  )
}

// ── Image Mosaic ───────────────────────────────────────────────────────────────
function ImageMosaic({ images, alt }: { images: string[]; alt: string }) {
  if (images.length === 0) return null

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-3 max-w-[300px] mx-auto lg:max-w-[340px]">
        {images.map((src, i) => (
          <motion.div key={i} whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
            <Image src={src} alt={`${alt} ${i + 1}`} fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 40vw, 18vw" loading="lazy" quality={90} />
          </motion.div>
        ))}
      </div>
    )
  }

  // 6 images — 3×2 uniform grid
  if (images.length === 6) {
    return (
      <div className="grid grid-cols-3 gap-2 md:gap-2.5">
        {images.map((src, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square rounded-xl overflow-hidden shadow-md">
            <Image src={src} alt={`${alt} ${i + 1}`} fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 33vw, 18vw" loading="lazy" quality={85} />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {images.map((src, i) => (
        <motion.div key={i} whileHover={{ scale: 1.04 }} transition={{ duration: 0.26 }}
          className="relative aspect-square rounded-xl overflow-hidden shadow-md">
          <Image src={src} alt={`${alt} ${i + 1}`} fill className="object-cover object-center"
            sizes="50vw" loading="lazy" quality={82} />
        </motion.div>
      ))}
    </div>
  )
}

// ── Animated Section Title (dark sections) ────────────────────────────────────
function GoldTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      className={cn('font-devanagari leading-tight', className)}
      style={{
        background: 'linear-gradient(90deg, #F2C94C 0%, #FFD97A 35%, #E8A020 65%, #F2C94C 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.h2>
  )
}

// ── Animated Section Title (light sections) ────────────────────────────────────
function SaffronTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      className={cn('font-devanagari leading-tight', className)}
      style={{
        background: 'linear-gradient(90deg, #9A3412 0%, #C2410C 35%, #7C2D12 65%, #9A3412 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.h2>
  )
}

// ── Seva Story Block ───────────────────────────────────────────────────────────
function SevaStoryBlock({ block, idx }: { block: SevaBlock; idx: number }) {
  const isDark = idx % 2 === 1
  const isReverse = idx % 2 === 1
  const hasImages = block.images.length > 0

  return (
    <section id={block.id}
      className={cn(
        'relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden',
        isDark ? 'bg-gradient-to-br from-[#1A0505] via-maroon-900 to-[#0F0300]' : 'bg-cream-100',
      )}>
      {isDark && (
        <GlowOrbs variant="gold" positions={[
          { size: 480, top: '-5rem', right: '-6rem', duration: 12 },
          { size: 320, bottom: '-4rem', left: '-4rem', duration: 10 },
        ]} />
      )}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />

      <div className="relative max-w-screen-xl mx-auto">
        <div className={cn(
          'flex flex-col gap-10 lg:gap-16',
          hasImages && 'lg:grid lg:grid-cols-2 lg:items-center',
          !hasImages && 'max-w-3xl mx-auto',
        )}>

          {/* ── Text side ── */}
          <RevealWrapper className={cn(hasImages && isReverse && 'lg:order-2')}>
            <p className={cn(
              'font-body text-xs md:text-[13px] tracking-[0.22em] uppercase mb-4 font-medium',
              isDark ? 'text-gold-300' : 'text-saffron-600',
            )}>
              {block.tagline}
            </p>

            <div className="flex items-start gap-3 mb-4">
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-4xl md:text-5xl leading-none flex-shrink-0 mt-0.5"
              >
                {block.icon}
              </motion.span>

              {isDark ? (
                <GoldTitle className="text-3xl md:text-[2.5rem]">{block.titleHi}</GoldTitle>
              ) : (
                <h2 className="font-devanagari text-3xl md:text-[2.5rem] leading-tight text-maroon-800">
                  {block.titleHi}
                </h2>
              )}
            </div>

            <div className={cn('w-12 h-px mb-6', isDark ? 'bg-gold-400/50' : 'bg-saffron-400/45')} />

            <p className={cn(
              'font-devanagari text-base md:text-lg leading-loose',
              isDark ? 'text-white' : 'text-maroon-700',
            )}>
              {block.desc}
            </p>

            {!hasImages && (
              <div className="mt-8">
                <p className={cn(
                  'font-devanagari text-base mb-5',
                  isDark ? 'text-cream-200/80' : 'text-maroon-600/70',
                )}>
                  "शिक्षा ही वह दीपक है जो अंधकार को मिटाता है।"
                </p>
                <div className="flex flex-wrap gap-2">
                  {['UPSC / IAS', 'PCS / State PSC', 'SSC', 'Banking', 'Defence', 'Teaching'].map(tag => (
                    <span key={tag} className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-body border',
                      isDark ? 'border-gold-300/40 text-gold-200' : 'border-saffron-400/40 text-saffron-700',
                    )}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </RevealWrapper>

          {/* ── Images side ── */}
          {hasImages && (
            <RevealWrapper delay={0.15} className={cn(isReverse && 'lg:order-1')}>
              <ImageMosaic images={block.images} alt={block.titleHi} />
            </RevealWrapper>
          )}
        </div>
      </div>
    </section>
  )
}

// ── UPI + Bank Section (light theme) ─────────────────────────────────────────
function SevaKarein() {
  return (
    <section id="donate" className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 45%, #dbeafe 100%)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent" />
      {/* Subtle decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #bae6fd 0%, transparent 70%)' }} />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c7d2fe 0%, transparent 70%)' }} />

      <div className="relative max-w-screen-xl mx-auto">
        <RevealWrapper>
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-xs tracking-[0.26em] text-sky-600 uppercase mb-3">
              Seva Yatra · सेवा यात्रा
            </p>
            <SaffronTitle className="text-3xl md:text-4xl mb-4">
              इस सेवा यात्रा में साथ जुड़ें
            </SaffronTitle>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-saffron-400/55 to-transparent mx-auto mb-4" />
            <p className="font-devanagari text-slate-700 text-base max-w-xl mx-auto leading-relaxed">
              जो भी सहयोग आपके मन में आए, वह इस यात्रा को आगे बढ़ाता है।
            </p>
            <p className="font-devanagari text-slate-500 text-sm mt-2">
              इस यात्रा में साथ जुड़ें और बने रहें 🙏
            </p>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* ── UPI Card ── */}
          <RevealWrapper delay={0}>
            <div className="rounded-3xl overflow-hidden h-full bg-white shadow-xl border border-sky-100"
              style={{ boxShadow: '0 8px 40px rgba(14,165,233,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>

              {/* Saffron top stripe */}
              <div className="h-1.5 bg-gradient-to-r from-saffron-500 via-amber-400 to-saffron-500" />

              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-5 self-start">
                  <motion.span animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-2xl">📱
                  </motion.span>
                  <h3 className="font-devanagari text-maroon-800 text-xl font-semibold">UPI से सेवा करें</h3>
                </div>

                {/* QR image — clickable → opens full size, with download button */}
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden bg-white shadow-lg
                    border-2 border-saffron-200 cursor-pointer hover:border-saffron-400 transition-colors duration-200"
                    onClick={() => window.open(QR_URL, '_blank')}>
                    <Image
                      src={QR_URL}
                      alt="UPI QR Code — Sadhvi Samahita Ji Seva"
                      width={192} height={192}
                      className="w-full h-full object-cover"
                      quality={95}
                    />
                  </div>
                  <p className="font-devanagari text-slate-500 text-xs mt-2 mb-1">
                    किसी भी UPI ऐप से स्कैन करें
                  </p>
                  <DownloadQRButton />
                </div>

                {/* UPI ID pill */}
                <div className="w-full rounded-xl p-3.5 mt-5 mb-4 bg-slate-50 border border-slate-200">
                  <p className="font-body text-[9px] text-slate-400 uppercase tracking-widest mb-1.5">UPI ID</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-body text-slate-800 text-sm font-medium">9999649311@ptsbi</p>
                    <CopyButton text="9999649311@ptsbi" light />
                  </div>
                </div>

                {/* App logos */}
                <div className="flex flex-wrap justify-center gap-2 mt-1">
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                    <span key={app} className="text-[10px] font-body text-slate-500 px-2 py-0.5
                      rounded-full border border-slate-200 bg-white">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealWrapper>

          {/* ── Bank Details Card ── */}
          <RevealWrapper delay={0.12}>
            <div className="rounded-3xl overflow-hidden h-full bg-white shadow-xl border border-sky-100"
              style={{ boxShadow: '0 8px 40px rgba(14,165,233,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>

              {/* Saffron top stripe */}
              <div className="h-1.5 bg-gradient-to-r from-saffron-500 via-amber-400 to-saffron-500" />

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <motion.span animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-2xl">🏦
                  </motion.span>
                  <h3 className="font-devanagari text-maroon-800 text-xl font-semibold">बैंक विवरण</h3>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'खाताधारक', value: 'Sadhvi Samahita', copyable: false },
                    { label: 'Account No', value: '41988261191', copyable: true },
                    { label: 'IFSC Code', value: 'SBIN00622880', copyable: true },
                    { label: 'Bank', value: 'State Bank of India', copyable: false },
                  ].map(({ label, value, copyable }) => (
                    <div key={label} className="rounded-xl p-3 bg-slate-50 border border-slate-200">
                      <p className="font-body text-[9px] text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-body text-slate-800 text-sm font-medium">{value}</p>
                        {copyable && <CopyButton text={value} light />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact */}
                <div className="mt-4 rounded-xl p-3.5 flex items-center gap-3 bg-amber-50 border border-amber-200">
                  <span className="text-lg flex-shrink-0">📞</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-[9px] text-amber-600 uppercase tracking-widest mb-0.5">Contact</p>
                    <p className="font-body text-amber-900 text-sm font-medium">9999649311</p>
                  </div>
                  <CopyButton text="9999649311" light />
                </div>

                <p className="font-devanagari text-slate-400 text-[11px] text-center mt-4 leading-relaxed">
                  * सत्यापन हेतु WhatsApp पर संपर्क करें
                </p>
              </div>
            </div>
          </RevealWrapper>
        </div>

        {/* WA button */}
        <RevealWrapper delay={0.2} className="text-center mt-10">
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('प्रणाम 🙏\nमैं सेवा यात्रा में सहयोग करना चाहता/चाहती हूँ।\nकृपया मार्गदर्शन करें।')}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border
              border-green-500/40 text-green-700 text-sm font-body bg-white
              hover:bg-green-50 hover:border-green-500 transition-all duration-300 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="font-devanagari text-xs">सेवा हेतु WhatsApp करें</span>
          </a>
        </RevealWrapper>
      </div>
    </section>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function SevaClient() {
  return (
    <div className="overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════ */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center
        bg-gradient-to-br from-maroon-900 via-[#2D0A00] to-[#1A0505] overflow-hidden text-center px-4">
        <GlowOrbs variant="saffron" positions={[
          { size: 600, top: '-8rem', right: '-8rem', duration: 12 },
          { size: 420, bottom: '-6rem', left: '-7rem', duration: 10 },
        ]} />

        <motion.div animate={{ opacity: [0.06, 0.16, 0.06], scale: [0.94, 1.04, 0.94] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-72 h-72 md:w-[30rem] md:h-[30rem] border border-gold-300/18 rounded-full pointer-events-none" />
        <motion.div animate={{ opacity: [0.03, 0.09, 0.03], scale: [0.86, 0.97, 0.86] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute w-[22rem] h-[22rem] md:w-[44rem] md:h-[44rem] border border-gold-300/08 rounded-full pointer-events-none" />

        <div className="relative z-10 py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center">

            {/* Centre Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-8"
            >
              {/* Spinning dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-10px] rounded-full border border-dashed border-gold-300/35 pointer-events-none"
              />
              {/* Static glow ring */}
              <div className="absolute inset-[-4px] rounded-full pointer-events-none"
                style={{ boxShadow: '0 0 32px rgba(242,201,76,0.28), 0 0 64px rgba(242,201,76,0.10)' }} />

              <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gold-300/55">
                <Image
                  src={HERO_PHOTO}
                  alt="Sadhvi Samahita Ji"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 176px, 224px"
                  priority
                  quality={95}
                />
              </div>
            </motion.div>

            <p className="font-body text-xs md:text-[13px] tracking-[0.28em] text-gold-300 uppercase mb-5">
              Seva & Samarpan · Sadhvi Samahita Ji
            </p>

            <GoldTitle className="text-4xl md:text-5xl lg:text-6xl mb-4">
              सेवा एवं समर्पण
            </GoldTitle>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent mx-auto mb-5" />
            <p className="font-devanagari text-cream-100/80 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-10">
              समाज सेवा के माध्यम से एक सकारात्मक परिवर्तन की ओर
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {sevaBlocks.map(b => (
                <a key={b.id} href={`#${b.id}`}
                  className="px-4 py-1.5 rounded-full border border-gold-300/28 text-gold-200/85
                    font-devanagari text-xs hover:bg-gold-300/12 hover:border-gold-300/60
                    transition-all duration-200">
                  {b.icon} {b.titleHi}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <svg viewBox="0 0 16 10" width="14" height="9" fill="none" className="text-gold-300/40">
            <path d="M 1,1 L 8,8 L 15,1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </section>

      {/* ══ INTRO ═════════════════════════════ */}
      <section className="relative py-14 md:py-20 px-4 bg-cream-100 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saffron-400/20 to-transparent" />
        <div className="max-w-3xl mx-auto text-center">
          <RevealWrapper>
            <p className="font-body text-xs md:text-[13px] tracking-[0.28em] text-saffron-600 uppercase mb-5 font-medium">
              The Mission
            </p>
            <p className="font-devanagari text-lg md:text-xl text-maroon-700 leading-loose mb-5">
              पूज्या साध्वी समाहिता जी का जीवन केवल आध्यात्मिक प्रवचनों तक सीमित नहीं है,
              बल्कि सेवा और समर्पण का एक जीवंत उदाहरण है।
            </p>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-saffron-400/45 to-transparent mx-auto mb-5" />
            <p className="font-devanagari text-base text-maroon-600 leading-loose">
              आपका प्रयास समाज में उन लोगों तक पहुँचने का है, जिन्हें वास्तव में
              सहायता और मार्गदर्शन की आवश्यकता है।
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* ══ SEVA STORY FLOW ═══════════════════ */}
      {sevaBlocks.map((block, i) => (
        <SevaStoryBlock key={block.id} block={block} idx={i} />
      ))}

      {/* ══ EMOTIONAL MESSAGE ═════════════════ */}
      <section className="relative py-16 md:py-20 px-4 bg-cream-100 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saffron-400/18 to-transparent" />
        <div className="max-w-2xl mx-auto text-center">
          <RevealWrapper>
            <motion.span animate={{ scale: [1, 1.14, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl block mb-6">🌸
            </motion.span>
            <p className="font-devanagari text-xl md:text-2xl text-maroon-700 leading-loose mb-5">
              आपका छोटा सा सहयोग भी किसी के जीवन में बड़ा परिवर्तन ला सकता है।
            </p>
            <div className="w-14 h-px bg-gradient-to-r from-transparent via-saffron-400/45 to-transparent mx-auto mb-5" />
            <p className="font-devanagari text-base text-maroon-600 leading-loose">
              आपका यह प्रयास केवल सहायता नहीं, बल्कि किसी के जीवन में
              एक नई आशा और विश्वास का संचार है।
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* ══ SEVA KAREIN ═══════════════════════ */}
      <SevaKarein />

    </div>
  )
}
