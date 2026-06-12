'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import GlowOrbs from '@/components/shared/GlowOrbs'

const cl = (id: string, w: number) =>
  `https://res.cloudinary.com/dl9t48lyt/image/upload/f_auto,q_auto,w_${w}/${id}`

const HERO  = cl('v1781242015/WhatsApp_Image_2026-06-12_at_07.41.26_blhjwq.jpg',  1200)
const IMG_2 = cl('v1781242014/WhatsApp_Image_2026-06-12_at_07.41.27_r6kqlw.jpg',   800)
const IMG_3 = cl('v1781242015/WhatsApp_Image_2026-06-12_at_07.41.27_1_qmfylr.jpg', 800)

const body1 = [
  'Sadhvi Ritambhara भारतीय आध्यात्मिक जगत की एक अत्यंत प्रेरणादायी संत हैं। उन्होंने धर्म, राष्ट्रसेवा, नारी उत्थान, संस्कार निर्माण तथा मानव सेवा के क्षेत्र में अद्वितीय योगदान दिया है। उनके ओजस्वी प्रवचनों, मातृवत स्नेह और समाज के प्रति समर्पण ने लाखों लोगों के जीवन को नई दिशा प्रदान की है। उनका सम्पूर्ण जीवन सनातन संस्कृति के संरक्षण, सेवा और साधना का जीवंत उदाहरण है।',
  'इसी दिव्य परंपरा में पूज्या Sadhvi Samahita जी अपनी गुरु-माता के आदर्शों को आत्मसात करते हुए निरंतर धर्मप्रचार, कथा-प्रवचन एवं जनजागरण के कार्य में समर्पित हैं। उनकी वाणी में भक्ति की मधुरता, विचारों में आध्यात्मिक गहराई तथा व्यक्तित्व में विनम्रता और सेवा का अद्भुत समन्वय दिखाई देता है।',
  'गुरु-शिष्य परंपरा में शिष्य का मूल्यांकन समय और समाज करता है। इसलिए यह निश्चित रूप से कहना कि कोई एकमात्र उत्तराधिकारी है या भविष्य में किसी का स्थान लेगा, उचित नहीं होगा। किंतु श्रद्धालुओं और श्रोताओं की दृष्टि में पूज्या साध्वी समाहिता जी में दीदी माँ के संस्कारों, सेवा-भाव, धर्मनिष्ठा और समर्पण की झलक अवश्य दिखाई देती है। अनेक भक्तों को उनके व्यक्तित्व में वही वात्सल्य, वही करुणा और वही सनातन धर्म के प्रति समर्पण का भाव अनुभव होता है, जिसने दीदी माँ को जन-जन का प्रेरणास्रोत बनाया है।',
  'गुरु के चरणों में समर्पित जीवन जब साधना का स्वरूप बन जाता है, तब वह स्वयं एक प्रेरणा बनकर समाज का मार्गदर्शन करता है। पूज्या दिदी माँ ऋतंभरा जी की कृपा, संस्कार और आशीर्वाद से पूज्या साध्वी समाहिता जी धर्म, संस्कृति और मानवता की सेवा के पथ पर निरंतर अग्रसर हैं।',
]

const body2 = [
  'जब-जब सनातन धर्म की ज्योति को प्रखर करने की आवश्यकता होती है, तब ईश्वर अपनी कृपा से ऐसे दिव्य व्यक्तित्वों को इस धरा पर भेजता है, जो केवल उपदेश नहीं देते, बल्कि अपने जीवन को ही एक संदेश बना देते हैं। परम पूज्या Sadhvi Ritambhara दीदी माँ ऐसा ही एक दिव्य व्यक्तित्व हैं, जिनकी वाणी में राष्ट्रभक्ति की अग्नि, हृदय में मातृत्व का अथाह सागर और जीवन में सनातन धर्म के प्रति पूर्ण समर्पण दिखाई देता है।',
  'दिदी माँ ने केवल प्रवचन नहीं किए, बल्कि असंख्य टूटे हुए जीवनों को सहारा दिया, निराश हृदयों में आशा जगाई और समाज को सेवा, संस्कार एवं साधना का मार्ग दिखाया। लाखों लोगों के लिए वे केवल एक संत नहीं, बल्कि माँ का स्वरूप हैं, जिनके चरणों में बैठकर जीवन की दिशा मिलती है।',
  'इसी दिव्य परंपरा में पूज्या Sadhvi Samahita जी का व्यक्तित्व श्रद्धा और विश्वास का केंद्र बनता जा रहा है। उनके जीवन में गुरु के प्रति पूर्ण समर्पण, धर्म के प्रति निष्ठा और समाज के प्रति सेवा का भाव स्पष्ट दिखाई देता है। जब वे कथा मंच पर बैठती हैं तो उनकी वाणी में भक्ति की मधुरता और हृदय में गुरु-कृपा की झलक अनुभव होती है।',
  'कहा जाता है कि सच्चा शिष्य वही होता है जो अपने गुरु के उपदेशों को केवल सुनता नहीं, बल्कि उन्हें अपने जीवन का आधार बना लेता है। पूज्या साध्वी समाहिता जी के व्यक्तित्व में यही भाव दिखाई देता है। उनकी विनम्रता, सेवा-भाव, साधना और धर्म के प्रति समर्पण अनेक श्रद्धालुओं को दीदी माँ के संस्कारों की याद दिलाता है।',
  'गुरु केवल ज्ञान नहीं देते, वे स्वयं जीवन बन जाते हैं। और जब कोई शिष्य अपने गुरु के आदर्शों को हृदय में धारण कर लेता है, तब वह गुरु की कृपा का चलता-फिरता प्रतिबिंब बन जाता है। पूज्या दीदी माँ की करुणा, वात्सल्य और धर्मनिष्ठा की छाया में पूज्या साध्वी समाहिता जी जिस प्रकार आगे बढ़ रही हैं, उसे देखकर हृदय गर्व और श्रद्धा से भर उठता है।',
]

const poem = [
  'गुरु हैं गंगा की निर्मल धारा,',
  'शिष्य है उसका पावन किनारा।',
  'गुरु से मिलता जीवन का प्रकाश,',
  'शिष्य बढ़ाता उस ज्योति का विस्तार।',
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

export default function BlogClient() {
  return (
    <div className="min-h-screen bg-cream-100 overflow-hidden">
      <GlowOrbs
        variant="gold"
        positions={[
          { size: 480, top: '0',      right: '-6rem', duration: 14 },
          { size: 320, bottom: '8rem', left: '-4rem', duration: 18 },
        ]}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 pt-28 pb-24">

        {/* ── HEADER ───────────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          className="mb-8 text-center"
        >
          {/* Category pill */}
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-body tracking-[0.2em] uppercase mb-5"
            style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A' }}>
            गुरु-शिष्य परंपरा
          </span>

          <h1 className="font-devanagari text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-3"
            style={{ color: '#7C2D12' }}>
            गुरु-शिष्य की दिव्य परंपरा
          </h1>
          <p className="font-devanagari text-lg md:text-xl" style={{ color: '#9A3412' }}>
            परम पूज्या दीदी माँ ऋतंभरा जी एवं साध्वी समाहिता जी
          </p>

          {/* Meta */}
          <div className="flex items-center justify-center gap-3 mt-4 text-xs font-body"
            style={{ color: '#B45309' }}>
            <span>जून 2026</span>
            <span style={{ color: '#FDE68A' }}>·</span>
            <span>श्री धाम वृंदावन</span>
          </div>

          {/* Divider */}
          <div className="w-24 h-px mx-auto mt-6"
            style={{ background: 'linear-gradient(to right, transparent, #D97706, transparent)' }} />
        </motion.div>

        {/* ── HERO IMAGE ───────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ delay: 0.1 }}
          className="relative w-full rounded-2xl overflow-hidden mb-10 shadow-lg"
          style={{ boxShadow: '0 8px 40px rgba(120,20,20,0.12)' }}
        >
          <Image
            src={HERO}
            alt="परम पूज्या दीदी माँ ऋतंभरा जी एवं साध्वी समाहिता जी"
            width={1200}
            height={700}
            className="w-full h-auto"
            priority
          />
        </motion.div>

        {/* ── BODY PART 1 ──────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ delay: 0.15 }}
          className="space-y-5 mb-10"
        >
          {body1.map((para, i) => (
            <p key={i}
              className="font-devanagari text-base md:text-lg leading-[1.95] text-justify"
              style={{ color: '#431407' }}>
              {para}
            </p>
          ))}
        </motion.div>

        {/* ── PULL QUOTE ───────────────────────────── */}
        <motion.blockquote
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="relative my-10 px-6 py-5 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FFF7ED 100%)',
            borderLeft: '4px solid #D97706',
            boxShadow: '0 2px 16px rgba(217,119,6,0.10)',
          }}
        >
          <span className="absolute -top-3 left-6 text-4xl leading-none select-none"
            style={{ color: '#F59E0B', opacity: 0.5 }}>❝</span>
          <p className="font-devanagari text-base md:text-lg leading-relaxed italic"
            style={{ color: '#7C2D12' }}>
            उनकी वाणी, साधना और समर्पण असंख्य लोगों के लिए प्रेरणा का स्रोत है। हम प्रार्थना करते हैं कि गुरु-शिष्य की यह दिव्य परंपरा युगों-युगों तक समाज को प्रकाश प्रदान करती रहे।
          </p>
        </motion.blockquote>

        {/* ── IMAGE GALLERY ────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:gap-4 mb-10"
        >
          {[{ src: IMG_2, alt: 'साध्वी समाहिता जी — कथा प्रवचन' },
            { src: IMG_3, alt: 'गुरु-शिष्य — दिव्य परंपरा' }].map((img) => (
            <div key={img.src}
              className="relative rounded-xl overflow-hidden shadow-md aspect-[4/3]"
              style={{ boxShadow: '0 4px 24px rgba(120,20,20,0.10)' }}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(120,20,20,0.15) 0%, transparent 50%)' }} />
            </div>
          ))}
        </motion.div>

        {/* ── GOLD DIVIDER ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex items-center gap-3 my-10"
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #D97706)' }} />
          <span className="text-gold-400 text-sm select-none">✦</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #D97706)' }} />
        </motion.div>

        {/* ── BODY PART 2 ──────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="space-y-5 mb-10"
        >
          {body2.map((para, i) => (
            <p key={i}
              className="font-devanagari text-base md:text-lg leading-[1.95] text-justify"
              style={{ color: '#431407' }}>
              {para}
            </p>
          ))}
        </motion.div>

        {/* ── CLOSING PRAYER ───────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-2xl px-6 md:px-10 py-8 mb-10 text-center"
          style={{
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
            border: '1.5px solid #FDE68A',
            boxShadow: '0 4px 24px rgba(251,191,36,0.10)',
          }}
        >
          <p className="font-devanagari text-base md:text-lg leading-relaxed italic mb-2"
            style={{ color: '#7C2D12' }}>
            "हम प्रार्थना करते हैं कि दीदी माँ का आशीर्वाद सदैव उन पर बना रहे और वे सनातन संस्कृति, भक्ति, सेवा और राष्ट्रधर्म की इस दिव्य ज्योति को आने वाली पीढ़ियों तक पहुँचाती रहें।"
          </p>
          <p className="font-devanagari text-sm" style={{ color: '#B45309' }}>
            "गुरु और शिष्य का यह पावन संबंध हम सभी के लिए प्रेरणा का स्रोत बना रहे।"
          </p>
        </motion.div>

        {/* ── POEM ─────────────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center my-10"
        >
          <div className="inline-block rounded-2xl px-8 md:px-12 py-8 relative"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #FDE68A',
              boxShadow: '0 4px 32px rgba(251,191,36,0.12)',
            }}
          >
            <div className="text-3xl mb-4 select-none">🪔</div>
            {poem.map((line, i) => (
              <p key={i}
                className="font-devanagari text-lg md:text-xl leading-loose font-medium"
                style={{ color: i % 2 === 0 ? '#7C2D12' : '#B45309' }}>
                {line}
              </p>
            ))}
          </div>
        </motion.div>

        {/* ── TAGS ─────────────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mt-12 pt-8 border-t"
          style={{ borderColor: '#FDE68A' }}
        >
          {['#गुरुशिष्यपरंपरा', '#साध्वीसमाहिता', '#दीदीमाँऋतंभरा', '#भक्ति', '#सनातनधर्म', '#Vrindavan'].map(tag => (
            <span key={tag}
              className="px-3 py-1 rounded-full text-xs font-body"
              style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A' }}>
              {tag}
            </span>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
