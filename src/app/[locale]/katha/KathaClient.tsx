'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import GlowOrbs from '@/components/shared/GlowOrbs'
import RevealWrapper from '@/components/shared/RevealWrapper'
import { cn } from '@/lib/utils'

// ── Constants ─────────────────────────────────────────────────────────────────
const WA_NUMBER = '919999649311'
const FB_PHOTOS = 'https://www.facebook.com/SadhviSamahitaDidi'

function waLink(name: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `प्रणाम 🙏\nमैं ${name} के आयोजन हेतु जानकारी प्राप्त करना चाहता/चाहती हूँ।\nकृपया मार्गदर्शन करें।`
  )}`
}

// ── Data ──────────────────────────────────────────────────────────────────────
type KathaItem = {
  id: string; icon: string; titleHi: string; titleEn: string
  tagline: string; desc: string; waName: string; images: string[]
}

const kathas: KathaItem[] = [
  {
    id: 'bhagavat',
    icon: '📖',
    titleHi: 'श्रीमद्भागवत कथा',
    titleEn: 'Shrimadbhagavat Katha',
    tagline: '7-दिवसीय पारायण · भक्ति का महोत्सव',
    desc: 'श्रीमद्भागवत कथा के माध्यम से भगवान श्रीकृष्ण की दिव्य लीलाओं एवं भक्ति मार्ग का अनुभव कराया जाता है। यह कथा जीवन में शांति, आनंद एवं आध्यात्मिक जागरण लाती है। साध्वी समाहिता जी की मधुर वाणी में भागवत की यह अमृतमयी धारा सुनने वाले के हृदय को पूर्णतः रूपांतरित कर देती है।',
    waName: 'श्रीमद्भागवत कथा',
    images: [
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922548/615525972_1436887297797623_1275201287654466997_n_pyd9jf.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922545/607421836_1430000318486321_7635002655432373362_n_rlmcmf.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922547/612541855_1431642491655437_5258377493280682004_n_gumlj6.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922544/610980580_1429244808561872_5484901762221545215_n_hsztmc.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922542/607610268_1429245808561772_6072736428467420172_n_p9iszp.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922541/605764865_1425294718956881_4471653075551146034_n_r1orin.jpg',
    ],
  },
  {
    id: 'ram',
    icon: '🏹',
    titleHi: 'राम कथा',
    titleEn: 'Ram Katha',
    tagline: 'मर्यादा पुरुषोत्तम · धर्म का संदेश',
    desc: 'राम कथा धर्म, मर्यादा और आदर्श जीवन जीने की प्रेरणा देती है। प्रभु श्रीराम के जीवन से हम सीखते हैं — संकट में धैर्य, अन्याय के विरुद्ध साहस और समर्पण का अर्थ। दीदी जी की राम कथा श्रोताओं के हृदय में भक्ति की ज्योति जलाती है और जीवन को नई दिशा देती है।',
    waName: 'राम कथा',
    images: [
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922521/597603537_1410648807088139_6871416658003443938_n_n1rlu3.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922523/480149882_1178207556998933_3426266838674791529_n_lythiu.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922524/572256176_1380105320142488_1484349161624609524_n_ous2go.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922520/572227254_1380085123477841_3662908049441499877_n_x61go4.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922519/571260706_1376395233846830_880851319757144464_n_p7pkme.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922518/571211489_1376396753846678_5185628713091095413_n_ihg8sk.jpg',
    ],
  },
  {
    id: 'shiv',
    icon: '🕉️',
    titleHi: 'शिव महापुराण कथा',
    titleEn: 'Shiv Mahapuran Katha',
    tagline: 'महादेव की महिमा · मुक्ति का मार्ग',
    desc: 'शिव महापुराण कथा भगवान शिव की अपार महिमा, उनकी भक्ति और अद्भुत लीलाओं का सजीव चित्रण प्रस्तुत करती है। यह कथा मन को शांत, आत्मा को निर्मल और जीवन को सत्य के मार्ग पर ले जाती है। दीदी जी की वाणी में शिव कथा एक अलौकिक अनुभव बन जाती है — जहाँ हर पल ध्यान और भक्ति का संगम होता है।',
    waName: 'शिव महापुराण कथा',
    images: [
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922560/602358832_1419981949488158_7516614660459625564_n_olqhuv.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922559/600208605_1419981906154829_1430730166689852658_n_w184uk.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922557/605041082_1419981432821543_9029834669976909984_n_kpf49z.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922553/599694835_1414231790063174_5619988880379841937_n_mpph7q.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777927304/599648854_1415755003244186_3850722634849636609_n_bqefry.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922554/600229638_1419222016230818_6330119623013997594_n_ldpcio.jpg',
    ],
  },
  {
    id: 'devi',
    icon: '🌸',
    titleHi: 'देवी भागवत कथा',
    titleEn: 'Devi Bhagavat Katha',
    tagline: 'आदिशक्ति की भक्ति · शक्ति का संचार',
    desc: 'देवी भागवत कथा आदिशक्ति माँ की असीम करुणा, शक्ति और दिव्य लीलाओं का बोध कराती है। इस कथा के माध्यम से जीवन में सकारात्मक ऊर्जा का संचार होता है और मन को अपार शांति मिलती है। दीदी जी की देवी कथा श्रद्धालुओं को भाव-विभोर कर देती है — माँ का आशीर्वाद प्रत्यक्ष अनुभव होता है।',
    waName: 'देवी भागवत कथा',
    images: [
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922506/480154378_1178230250329997_1857937647965138831_n_yv6b1a.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922500/473610970_1157853072367715_1533686565746937764_n_jrp2me.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922502/FB_IMG_1752323311471_bys4ab.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922504/479528876_1178209576998731_362274098605082653_n_wqf4g1.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922502/476757895_1176455023840853_3275141859186548639_n_blbiog.jpg',
      'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922499/594912454_1410648707088149_4772447479965862445_n_fs3eoj.jpg',
    ],
  },
]

const otherPrograms = [
  { icon: '🎵', titleHi: 'भजन संध्या',     desc: 'भक्ति संगीत एवं दिव्य संध्या सत्संग',   waName: 'भजन संध्या'   },
  { icon: '🙏', titleHi: 'सुंदरकांड पाठ',   desc: 'हनुमान जी की दिव्य लीला का पवित्र पाठ',  waName: 'सुंदरकांड पाठ' },
  { icon: '🕉️', titleHi: 'प्रवचन',         desc: 'आध्यात्मिक ज्ञान एवं प्रेरणादायक प्रवचन', waName: 'प्रवचन'       },
  { icon: '🪔', titleHi: 'निजी कार्यक्रम',  desc: 'पारिवारिक सत्संग एवं निजी धार्मिक आयोजन', waName: 'निजी कार्यक्रम' },
]

const galleryImages = [
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922480/558067439_1363083601844660_4551941618697752351_n_vn4yk9.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922480/637303638_1465847568234929_1451128177393821154_n_ptud6o.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922482/638301377_1471236727696013_446396428608145951_n_rtxqqu.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922483/683204032_1520847116068307_2620139060155168877_n_f4hoar.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777928156/PDFGallery_20260504_173839_page-0009_egsxnj.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922479/559019859_1356447549174932_8020275613368241871_n_hyfd5s.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777927690/473701748_1157280869091602_4931546446543821155_n_qy1qhm.jpg',
  'https://res.cloudinary.com/dl9t48lyt/image/upload/v1777922480/561206599_1362336705252683_816039801058633486_n_jv8siq.jpg',
]

// ── Shared sub-components ─────────────────────────────────────────────────────
function WaButton({ name, label = 'WhatsApp पर बुक करें', size = 'md' }: { name: string; label?: string; size?: 'sm' | 'md' }) {
  return (
    <a href={waLink(name)} target="_blank" rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white rounded-full font-body transition-all duration-300 shadow-[0_4px_16px_rgba(22,163,74,0.30)]',
        size === 'md' ? 'px-6 py-3 text-sm' : 'px-4 py-2 text-xs',
      )}>
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <span className="font-devanagari">{label}</span>
    </a>
  )
}

function FbLink({ isDark }: { isDark: boolean }) {
  return (
    <a href={FB_PHOTOS} target="_blank" rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-body transition-colors',
        isDark ? 'text-cream-300/50 hover:text-cream-100' : 'text-maroon-600/50 hover:text-maroon-800',
      )}>
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      Facebook पर सभी फोटो देखें →
    </a>
  )
}

// ── Katha full section ────────────────────────────────────────────────────────
function KathaFullSection({ katha, idx }: { katha: KathaItem; idx: number }) {
  const isDark = idx % 2 === 1
  const isReverse = idx % 2 === 1

  return (
    <section id={katha.id}
      className={cn('relative overflow-hidden py-16 md:py-20 px-4 md:px-8 lg:px-16',
        isDark
          ? 'bg-gradient-to-br from-[#1A0505] via-maroon-900 to-[#0F0300]'
          : 'bg-cream-100',
      )}>

      {isDark && (
        <GlowOrbs variant="gold" positions={[
          { size: 500, top: '-6rem', right: '-8rem', duration: 13 },
          { size: 350, bottom: '-5rem', left: '-5rem', duration: 11 },
        ]} />
      )}

      {/* Gold top thread */}
      <div className="absolute top-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="relative max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Text ── */}
          <RevealWrapper className={cn(isReverse ? 'lg:order-2' : 'lg:order-1')}>
            <p className={cn('font-body text-[11px] tracking-[0.22em] uppercase mb-3',
              isDark ? 'text-gold-400/80' : 'text-saffron-500')}>
              {katha.titleEn}
            </p>

            <div className="flex items-start gap-3 mb-2">
              <span className="text-4xl mt-1 flex-shrink-0">{katha.icon}</span>
              <h2 className={cn('font-devanagari text-3xl md:text-4xl leading-tight',
                isDark ? 'text-gold-300' : 'text-maroon-800')}>
                {katha.titleHi}
              </h2>
            </div>

            <p className={cn('font-body text-xs mb-5 tracking-wide',
              isDark ? 'text-gold-400/60' : 'text-saffron-600/70')}>
              {katha.tagline}
            </p>

            <div className={cn('w-14 h-px mb-6',
              isDark ? 'bg-gold-400/40' : 'bg-saffron-400/40')} />

            <p className={cn('font-devanagari text-base md:text-lg leading-loose mb-8',
              isDark ? 'text-cream-200/85' : 'text-maroon-700/85')}>
              {katha.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <WaButton name={katha.waName} />
              <Link href="/media"
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-body border transition-all duration-300',
                  isDark
                    ? 'border-gold-300/40 text-gold-300 hover:bg-gold-300/10 hover:border-gold-300'
                    : 'border-saffron-400/60 text-saffron-600 hover:bg-saffron-50',
                )}>
                <span className="font-devanagari text-sm">और फोटो देखें →</span>
              </Link>
            </div>
          </RevealWrapper>

          {/* ── Images ── */}
          <RevealWrapper delay={0.12} className={cn(isReverse ? 'lg:order-1' : 'lg:order-2')}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {katha.images.map((src, i) => (
                <motion.div key={i}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'relative aspect-square rounded-xl overflow-hidden shadow-md',
                    isDark ? 'bg-maroon-800/60' : 'bg-saffron-100/60',
                  )}>
                  <Image
                    src={src}
                    alt={`${katha.titleHi} — ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 18vw"
                    loading={idx === 0 && i < 3 ? 'eager' : 'lazy'}
                    quality={85}
                  />
                </motion.div>
              ))}
            </div>

            {/* Facebook link */}
            <div className="mt-4 pl-1">
              <FbLink isDark={isDark} />
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function KathaClient() {
  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-[58vh] flex flex-col items-center justify-center
        bg-maroon-900 overflow-hidden text-center px-4">

        <GlowOrbs variant="saffron" positions={[
          { size: 600, top: '-8rem', right: '-8rem', duration: 12 },
          { size: 400, bottom: '-6rem', left: '-6rem', duration: 10 },
        ]} />

        {/* Subtle animated ring */}
        <motion.div
          animate={{ opacity: [0.08, 0.18, 0.08], scale: [0.95, 1.02, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-72 h-72 md:w-96 md:h-96 border border-gold-300/20 rounded-full pointer-events-none"
        />

        <div className="relative z-10 py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs font-body mb-6 text-cream-300/50">
            <Link href="/" className="hover:text-gold-300 transition-colors">होम</Link>
            <span>/</span>
            <span className="text-gold-300/80">कथाएँ</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-[11px] tracking-[0.22em] text-gold-400 uppercase mb-4">
              Shri Dham Vrindavan · Sadhvi Samahita Ji
            </p>
            <h1 className="font-devanagari text-4xl md:text-5xl lg:text-6xl text-gold-300 mb-4 leading-tight"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}>
              कथाएँ एवं आध्यात्मिक प्रवचन
            </h1>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent mx-auto mb-5" />
            <p className="font-devanagari text-base md:text-lg text-cream-200/75 max-w-xl mx-auto leading-relaxed mb-10">
              अपने शहर में दिव्य कथा एवं कार्यक्रम के लिए आमंत्रित करें
            </p>

            {/* Quick jump links */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {kathas.map(k => (
                <a key={k.id} href={`#${k.id}`}
                  className="px-4 py-1.5 rounded-full border border-gold-300/30 text-gold-300/80
                    font-devanagari text-xs hover:bg-gold-300/10 hover:border-gold-300 transition-all duration-200">
                  {k.icon} {k.titleHi}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll chevron */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <svg viewBox="0 0 16 10" width="14" height="9" fill="none" className="text-gold-300/40">
            <path d="M 1,1 L 8,8 L 15,1" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          4 KATHA SECTIONS
      ══════════════════════════════════════ */}
      {kathas.map((k, i) => <KathaFullSection key={k.id} katha={k} idx={i} />)}

      {/* ══════════════════════════════════════
          OTHER SPIRITUAL PROGRAMS
      ══════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 px-4 md:px-8 lg:px-16 overflow-hidden
        bg-gradient-to-br from-[#1A0505] via-maroon-900 to-[#0F0300]">

        <div className="absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        <GlowOrbs variant="gold" positions={[{ size: 450, bottom: '-5rem', right: '-5rem', duration: 13 }]} />

        <div className="relative max-w-screen-xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-12">
              <p className="font-body text-xs tracking-widest text-gold-400/80 uppercase mb-3">
                Other Programs
              </p>
              <h2 className="font-devanagari text-3xl md:text-4xl text-gold-300 mb-3">
                अन्य आध्यात्मिक कार्यक्रम
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto" />
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {otherPrograms.map((prog, i) => (
              <RevealWrapper key={prog.titleHi} delay={i * 0.08} yOffset={20}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-gold-300/20 p-5 md:p-6 h-full flex flex-col"
                  style={{
                    background: 'linear-gradient(135deg,rgba(40,10,0,0.8) 0%,rgba(20,5,0,0.9) 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(242,201,76,0.07)',
                  }}>
                  <span className="text-3xl mb-3 block">{prog.icon}</span>
                  <h3 className="font-devanagari text-gold-200 text-base md:text-lg mb-1.5 leading-snug">
                    {prog.titleHi}
                  </h3>
                  <p className="font-devanagari text-cream-300/60 text-xs leading-relaxed mb-4 flex-1">
                    {prog.desc}
                  </p>
                  <WaButton name={prog.waName} size="sm" label="बुक करें" />
                </motion.div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-cream-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

        <div className="max-w-screen-xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-10">
              <p className="font-body text-xs tracking-widest text-saffron-500 uppercase mb-3">
                Katha Mahotsav
              </p>
              <h2 className="font-devanagari text-3xl md:text-4xl text-maroon-800 mb-3">
                कार्यक्रमों की झलक
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-saffron-400/50 to-transparent mx-auto" />
            </div>
          </RevealWrapper>

          <RevealWrapper delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {galleryImages.map((src, i) => (
                <motion.div key={i}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-square rounded-xl overflow-hidden bg-saffron-100/50 shadow-sm">
                  <Image
                    src={src}
                    alt={`Katha program ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                    quality={80}
                  />
                </motion.div>
              ))}
            </div>

            {/* Facebook & Media links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a href={FB_PHOTOS} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border
                  border-saffron-400/50 text-saffron-600 text-sm font-body
                  hover:bg-saffron-50 transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-blue-600 flex-shrink-0">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-devanagari">Facebook पर और फोटो देखें</span>
              </a>
              <Link href="/media"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                  bg-saffron-500 hover:bg-saffron-600 text-cream-50 text-sm font-body transition-all duration-300">
                <span className="font-devanagari">Media Gallery →</span>
              </Link>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 px-4 overflow-hidden
        bg-gradient-to-br from-[#1A0505] via-maroon-900 to-[#0F0300]">

        <GlowOrbs variant="saffron" positions={[
          { size: 500, top: '-5rem', left: '20%', duration: 11 },
        ]} />
        <div className="absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

        <RevealWrapper className="relative max-w-2xl mx-auto text-center">
          <p className="font-body text-xs tracking-widest text-gold-400/70 uppercase mb-4">
            Book a Katha
          </p>
          <h2 className="font-devanagari text-3xl md:text-4xl text-gold-300 mb-3 leading-tight">
            कथा एवं आध्यात्मिक कार्यक्रम हेतु संपर्क करें
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto mb-5" />
          <p className="font-devanagari text-cream-200/70 text-base leading-loose mb-10 max-w-lg mx-auto">
            साध्वी समाहिता जी को अपने शहर में आमंत्रित करें — कथा, प्रवचन या अन्य आध्यात्मिक कार्यक्रम के लिए
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WaButton
              name="कथा / आध्यात्मिक कार्यक्रम"
              label="WhatsApp पर संपर्क करें"
            />
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3
                border border-gold-300/40 text-gold-300 rounded-full
                font-body text-sm hover:bg-gold-300/10 hover:border-gold-300 transition-all duration-300">
              <span className="font-devanagari">संपर्क फ़ॉर्म →</span>
            </Link>
          </div>
        </RevealWrapper>
      </section>

    </div>
  )
}
