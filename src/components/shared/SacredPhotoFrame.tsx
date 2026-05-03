'use client'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface SacredPhotoFrameProps {
  src?: string
  alt?: string
  quote?: string
  size?: number
}

const RIPPLE_COUNT    = 3     // peaceful — just enough to feel continuous
const RIPPLE_DURATION = 3.6   // slightly slower for a calm, divine feel
const MAX_SCALE       = 1.55  // stays close to the photo, not overwhelming

export default function SacredPhotoFrame({
  src,
  alt = 'Sadhvi Samahita Ji',
  quote,
  size = 280,
}: SacredPhotoFrameProps) {
  const ref   = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // 3-D tilt on mouse move
  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const rotX    = useTransform(mouseY, [-size / 2, size / 2], [10, -10])
  const rotY    = useTransform(mouseX, [-size / 2, size / 2], [-10, 10])
  const springX = useSpring(rotX, { stiffness: 160, damping: 22 })
  const springY = useSpring(rotY, { stiffness: 160, damping: 22 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!inner.current) return
    const r = inner.current.getBoundingClientRect()
    mouseX.set(e.clientX - (r.left + r.width  / 2))
    mouseY.set(e.clientY - (r.top  + r.height / 2))
  }
  function onLeave() { mouseX.set(0); mouseY.set(0) }

  const rippleDelay = RIPPLE_DURATION / RIPPLE_COUNT

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center">

      {/* ── Expanding ripple rings ── */}
      {Array.from({ length: RIPPLE_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: size, height: size }}
          animate={isInView ? {
            scale:   [1,          MAX_SCALE],
            opacity: [0.6,        0],
            borderWidth: ['2px',  '1px'],
            borderColor: [
              'rgba(242,201,76,0.9)',
              'rgba(212,134,10,0)',
            ],
            borderStyle: 'solid',
          } : { opacity: 0 }}
          transition={{
            duration: RIPPLE_DURATION,
            repeat: Infinity,
            delay: i * rippleDelay,
            ease: 'easeOut',
            // each property can share the same timing
            times: [0, 1],
          }}
        />
      ))}

      {/* ── Two static glowing rings for grounding ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  size + 20,
          height: size + 20,
          border: '1.5px solid rgba(242,201,76,0.35)',
          boxShadow: '0 0 24px 4px rgba(212,134,10,0.18), inset 0 0 16px 2px rgba(242,201,76,0.08)',
        }}
        animate={isInView ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  size + 52,
          height: size + 52,
          border: '1px solid rgba(242,201,76,0.18)',
        }}
        animate={isInView ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0 }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.2, ease: 'easeInOut' }}
      />

      {/* ── Ambient glow blob ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  size + 100,
          height: size + 100,
          background: 'radial-gradient(circle, rgba(212,134,10,0.28) 0%, transparent 65%)',
        }}
        animate={isInView ? { opacity: [0.5, 1, 0.5], scale: [0.93, 1.07, 0.93] } : { opacity: 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Reverent reveal wrapper ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.72, filter: 'blur(14px)' }}
        animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: size, height: size, perspective: 900 }}
        ref={inner}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative z-10"
      >
        {/* Rotating shimmer sweep */}
        <motion.div
          className="absolute -inset-[5px] rounded-full pointer-events-none z-20"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(242,201,76,0.9) 28deg, rgba(255,240,160,1) 36deg, rgba(242,201,76,0.9) 44deg, transparent 72deg)',
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Border ring below sweep */}
        <div
          className="absolute -inset-[3px] rounded-full z-10"
          style={{ background: 'rgba(242,201,76,0.15)', boxShadow: '0 0 0 1.5px rgba(242,201,76,0.45)' }}
        />

        {/* 3-D tilt + zoom photo card */}
        <motion.div
          style={{ rotateX: springX, rotateY: springY }}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full rounded-full overflow-hidden z-30
            shadow-[0_0_60px_rgba(212,134,10,0.5),0_0_130px_rgba(212,134,10,0.2)]"
        >
          {/* Shimmer overlay on hover */}
          <motion.div
            className="absolute inset-0 rounded-full z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(242,201,76,0.28) 0%, transparent 42%, rgba(212,134,10,0.18) 100%)',
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          />

          {src ? (
            <Image src={src} alt={alt} fill className="object-cover object-top" sizes="360px" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-saffron-100 via-gold-100 to-cream-200
              flex items-center justify-center">
              <span className="text-[7rem] select-none leading-none">🪷</span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* ── Quote / subtitle ── */}
      {quote && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-devanagari text-center text-gold-300/80 text-sm md:text-base
            max-w-xs leading-loose tracking-wide"
        >
          {quote}
        </motion.p>
      )}
    </div>
  )
}
