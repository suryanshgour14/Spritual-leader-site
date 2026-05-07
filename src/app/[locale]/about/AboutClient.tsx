'use client'
import { motion } from 'framer-motion'
import { useRouter } from '@/i18n/navigation'
import GlowOrbs from '@/components/shared/GlowOrbs'
import RevealWrapper from '@/components/shared/RevealWrapper'

// ── Divider ───────────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
      <span className="text-gold-400 text-xs">✦</span>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
    </div>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <p className="font-body text-saffron-500 text-xs tracking-widest uppercase mb-3">{text}</p>
  )
}

// ── Seva pill ────────────────────────────────────────────────────────────────
function SevaPill({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 py-3 px-4 rounded-xl
      bg-white/70 border border-gold-300/20
      shadow-[0_2px_12px_rgba(212,134,10,0.08)]">
      <span className="text-saffron-500 mt-0.5 flex-shrink-0">🪷</span>
      <p className="font-body text-maroon-800 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

export default function AboutClient() {
  const router = useRouter()

  return (
    <div className="bg-cream-100 overflow-hidden">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-[52vh] flex items-center justify-center
        bg-maroon-900 overflow-hidden">

        <GlowOrbs variant="gold" positions={[
          { size: 600, top: '-6rem', left: '-6rem', duration: 14 },
          { size: 400, bottom: '-4rem', right: '-4rem', duration: 11 },
        ]} />

        {/* CSS temple-arch glow — pure decoration, no image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-64 h-80 border border-gold-300/30"
            style={{ borderRadius: '132px 132px 16px 16px' }}
          />
        </div>
        <motion.div
          animate={{ opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-80 h-96 border border-gold-300/15"
            style={{ borderRadius: '160px 160px 20px 20px' }} />
        </motion.div>

        {/* Hero text */}
        <div className="relative z-10 text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-gold-300/70 text-xs tracking-widest uppercase mb-4">
              Shri Dham Vrindavan
            </p>
            <h1 className="font-devanagari text-5xl md:text-6xl text-gold-300 mb-3 leading-tight">
              परिचय
            </h1>
            <p className="font-display text-2xl md:text-3xl text-cream-100 mb-4">
              Sadhvi Samahita Ji
            </p>
            <GoldDivider />
            <p className="font-body text-cream-300/70 text-sm md:text-base mt-4 max-w-md mx-auto leading-relaxed">
              International Spiritual Orator · Katha Vachak · Vrindavan
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. INTRODUCTION
      ══════════════════════════════════════ */}
      <section className="relative section-padding">
        <GlowOrbs variant="saffron" positions={[{ size: 400, top: '-2rem', right: '-4rem', duration: 12 }]} />
        <div className="relative max-w-screen-lg mx-auto">
          <RevealWrapper>
            <SectionLabel text="परिचय · Introduction" />

            {/* Guru lineage highlight */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 p-5 rounded-2xl flex items-start gap-4"
              style={{
                background: 'linear-gradient(135deg, rgba(212,134,10,0.08) 0%, rgba(252,245,225,0.6) 100%)',
                border: '1.5px solid rgba(212,134,10,0.22)',
              }}
            >
              <span className="text-3xl flex-shrink-0 mt-0.5">🙏</span>
              <div>
                <p className="font-devanagari text-saffron-700 text-xs tracking-wide uppercase mb-1.5">
                  गुरु कृपा
                </p>
                <p className="font-devanagari text-maroon-800 text-base md:text-lg leading-relaxed">
                  पूज्या साध्वी समाहिता दीदी जी{' '}
                  <span className="font-semibold text-maroon-900">
                    परम पूज्या पदम् विभूषित साध्वी ऋतंभरा दीदी माँ
                  </span>{' '}
                  की कृपा पात्र शिष्या हैं।
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

              {/* Hindi */}
              <div className="space-y-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-gold-400 to-transparent" />
                <p className="font-devanagari text-maroon-800 text-base md:text-lg leading-relaxed">
                  आप श्रीमद् भागवत मर्मज्ञ, सरस प्रवक्ता, विदुषी, आध्यात्मिक वक्ता,
                  सुप्रसिद्ध कथा वाचिका एवं सनातन धर्म की समर्पित साधिका हैं।
                </p>
                <p className="font-devanagari text-maroon-700/80 text-base leading-relaxed">
                  आप श्रीमद्भागवत कथा, श्रीराम कथा, श्री शिव महापुराण-कथा एवं
                  श्रीमद् देवी भागवत-कथा के माध्यम से जन-जन में भक्ति, संस्कार
                  और सनातन का प्रचार करने का सतत कार्य कर रही हैं।
                </p>
              </div>

              {/* English */}
              <div className="space-y-4 md:border-l md:border-gold-300/20 md:pl-10">
                <div className="w-8 h-0.5 bg-gradient-to-r from-saffron-400 to-transparent" />
                <p className="font-body text-maroon-800 text-base leading-relaxed">
                  A beloved disciple of Param Pujya Padma Vibhushan Sadhvi Ritambhara Didi Maa,
                  Sadhvi Samahita Ji is a renowned spiritual orator, katha vachak, and devoted
                  sadhika of Sanatan Dharma.
                </p>
                <p className="font-body text-maroon-700/80 text-base leading-relaxed">
                  Through Bhagavat Katha, Ram Katha, Shiv Mahapuran, and Devi Bhagavat, she spreads
                  devotion, values, and spiritual awareness to thousands of devotees across India
                  and the world.
                </p>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. DIVINE DISCOURSE
      ══════════════════════════════════════ */}
      <section className="relative py-14 px-6 bg-maroon-900/[0.03]">
        <div className="max-w-screen-lg mx-auto">
          <RevealWrapper>
            <div className="rounded-2xl border border-gold-300/20 bg-white/60
              shadow-[0_4px_32px_rgba(212,134,10,0.08)] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🎙️</span>
                <div>
                  <SectionLabel text="Divine Discourse" />
                  <h2 className="font-devanagari text-2xl md:text-3xl text-maroon-800">दिव्य वाणी</h2>
                </div>
              </div>
              <GoldDivider />
              <div className="mt-6 space-y-4">
                <p className="font-devanagari text-maroon-700 text-base md:text-lg leading-relaxed">
                  आपकी वाणी में शास्त्रों का गहन ज्ञान, मधुरता और सरलता का अद्भुत संगम
                  देखने को मिलता है।
                </p>
                <p className="font-devanagari text-maroon-600/80 text-base leading-relaxed">
                  आपके प्रवचन केवल धार्मिक अनुष्ठान नहीं, बल्कि जीवन को सही दिशा देने
                  वाले मार्गदर्शन होते हैं, जो व्यक्ति को आत्मचिंतन, सकारात्मक सोच और
                  आध्यात्मिक उन्नति की ओर प्रेरित करते हैं।
                </p>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. KATHA FLOW
      ══════════════════════════════════════ */}
      <section className="relative section-padding">
        <GlowOrbs variant="gold" positions={[{ size: 350, bottom: '-2rem', left: '-4rem', duration: 15 }]} />
        <div className="relative max-w-screen-lg mx-auto">
          <RevealWrapper>
            <SectionLabel text="Spiritual Kathas" />
            <h2 className="font-devanagari text-2xl md:text-3xl text-maroon-800 mb-6">
              कथा एवं आध्यात्मिक प्रवाह
            </h2>

            {/* Katha type badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { hi: 'श्रीमद्भागवत कथा', en: 'Bhagavat Katha', icon: '📖' },
                { hi: 'श्रीराम कथा', en: 'Ram Katha', icon: '🏹' },
                { hi: 'शिव महापुराण', en: 'Shiv Mahapuran', icon: '🕉️' },
                { hi: 'देवी भागवत', en: 'Devi Bhagavat', icon: '🪷' },
              ].map((k, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                    bg-white/80 border border-gold-300/25
                    shadow-[0_2px_10px_rgba(212,134,10,0.08)]"
                >
                  <span className="text-lg">{k.icon}</span>
                  <div>
                    <p className="font-devanagari text-maroon-800 text-sm leading-none">{k.hi}</p>
                    <p className="font-body text-saffron-600/60 text-[10px] mt-0.5">{k.en}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <h3 className="font-devanagari text-maroon-700 text-lg mb-4">आध्यात्मिक सेवाएँ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                { icon: '📖', text: 'श्रीमद्भागवत कथा, राम कथा, शिव महापुराण एवं देवी भागवत कथा का दिव्य आयोजन' },
                { icon: '🕉️', text: 'धर्म, भक्ति और संस्कारों का जन-जन में प्रसार' },
                { icon: '🌟', text: 'समाज में नैतिक मूल्यों एवं आध्यात्मिक जागरण का सतत अभियान' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col gap-2 p-4 rounded-xl bg-white/80
                    border border-gold-300/20 shadow-[0_2px_10px_rgba(212,134,10,0.07)]"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <p className="font-devanagari text-maroon-700 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. SEVA / SOCIAL CONTRIBUTION
      ══════════════════════════════════════ */}
      <section className="relative py-14 px-6 bg-gradient-to-b from-cream-100 to-saffron-50/40">
        <div className="max-w-screen-lg mx-auto">
          <RevealWrapper>
            <SectionLabel text="Seva · Social Contribution" />
            <h2 className="font-devanagari text-2xl md:text-3xl text-maroon-800 mb-3">
              सामाजिक एवं शैक्षिक योगदान
            </h2>
            <p className="font-devanagari text-maroon-700/80 text-base leading-relaxed mb-8 max-w-2xl">
              पूज्या साध्वी समाहिता जी समाज सेवा के क्षेत्र में भी अत्यंत सक्रिय हैं,
              विशेष रूप से बेटियों की शिक्षा एवं सशक्तिकरण के लिए आपका कार्य अत्यंत सराहनीय है।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SevaPill text="जरूरतमंद एवं प्रतिभाशाली छात्राओं के लिए उच्च शिक्षा को प्रोत्साहन" />
              <SevaPill text="IAS, PCS एवं अन्य प्रतियोगी परीक्षाओं की तैयारी हेतु कोचिंग व्यवस्था" />
              <SevaPill text="छात्राओं के लिए सुरक्षित आवास (PG) की सुविधा, ताकि वे निश्चिंत होकर अध्ययन कर सकें" />
              <SevaPill text="आर्थिक रूप से कमजोर परिवारों की बेटियों के विवाह में सहयोग" />
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. MISSION
      ══════════════════════════════════════ */}
      <section className="relative section-padding">
        <div className="max-w-screen-lg mx-auto">
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 space-y-4">
                <SectionLabel text="Mission · संकल्प" />
                <h2 className="font-devanagari text-2xl md:text-3xl text-maroon-800">
                  दृष्टिकोण एवं संकल्प
                </h2>
                <p className="font-devanagari text-maroon-700 text-base leading-relaxed">
                  पूज्या साध्वी समाहिता दीदी जी का जीवन आध्यात्मिकता और सेवा का सुंदर
                  समन्वय है।
                </p>
                <p className="font-devanagari text-maroon-600/75 text-base leading-relaxed">
                  उनका उद्देश्य केवल धर्म का प्रचार-प्रसार ही नहीं, बल्कि समाज में
                  सकारात्मक परिवर्तन लाना भी है — भक्ति, शिक्षा और सेवा के माध्यम से।
                </p>
              </div>

              {/* Stats strip */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                {[
                  { num: '500+', label: 'Kathas', labelHi: 'कथाएँ' },
                  { num: '16+', label: 'Years', labelHi: 'वर्ष' },
                  { num: '100+', label: 'Cities', labelHi: 'शहर' },
                  { num: '10L+', label: 'Devotees', labelHi: 'श्रद्धालु' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl border border-gold-300/20 bg-white/70 p-4 text-center
                      shadow-[0_2px_12px_rgba(212,134,10,0.07)]"
                  >
                    <p className="font-display text-2xl text-saffron-600 mb-0.5">{s.num}</p>
                    <p className="font-devanagari text-maroon-700 text-xs">{s.labelHi}</p>
                    <p className="font-body text-saffron-500/60 text-[10px]">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. HIGHLIGHT QUOTE
      ══════════════════════════════════════ */}
      <section className="relative py-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 45%, #dbeafe 100%)' }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(186,230,253,0.5) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(199,210,254,0.4) 0%, transparent 70%)' }} />

        {/* Decorative large quote mark */}
        <div className="absolute top-8 left-8 font-display text-sky-300/40 text-[120px] leading-none
          select-none pointer-events-none">"</div>

        <div className="relative max-w-screen-md mx-auto text-center">
          <RevealWrapper>
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-0.5 mx-auto mb-8"
              style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }}
            />
            <blockquote className="font-devanagari text-maroon-800 text-xl md:text-2xl
              leading-relaxed tracking-wide mb-8">
              "हर बेटी शिक्षित, संस्कारित और आत्मनिर्भर बने,
              <br className="hidden md:block" />
              तथा समाज में धर्म, सेवा और सद्भाव का विस्तार हो।"
            </blockquote>
            <div className="w-12 h-0.5 mx-auto"
              style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }} />
            <p className="font-body text-slate-500 text-sm mt-6">— Sadhvi Samahita Ji</p>
          </RevealWrapper>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. FINAL LINE (SEO)
      ══════════════════════════════════════ */}
      <section className="relative py-12 px-6">
        <div className="max-w-screen-lg mx-auto">
          <RevealWrapper>
            <div className="text-center space-y-4">
              <GoldDivider />
              <p className="font-body text-saffron-700/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Based in Vrindavan, Sadhvi Samahita Ji inspires thousands through her spiritual
                discourses and social initiatives.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => {
                    sessionStorage.setItem('pendingScroll', 'vaani')
                    router.push('/')
                  }}
                  className="px-6 py-2.5 rounded-full border border-saffron-400/40
                    font-body text-sm text-saffron-700 hover:bg-saffron-50
                    transition-all duration-200"
                >
                  Watch Pravachans →
                </button>
                <a
                  href={`https://wa.me/919999649311?text=${encodeURIComponent('Namaste Didi Ji, I want to know about Katha booking.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-maroon-800 hover:bg-maroon-700
                    font-body text-sm text-cream-100
                    shadow-[0_3px_16px_rgba(120,20,20,0.2)]
                    transition-all duration-200"
                >
                  Book a Katha 🙏
                </a>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

    </div>
  )
}
