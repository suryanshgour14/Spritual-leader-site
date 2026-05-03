'use client'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

interface RevealWrapperProps {
  children: React.ReactNode
  delay?: number
  yOffset?: number
  duration?: number
  className?: string
}

export default function RevealWrapper({
  children,
  delay = 0,
  yOffset = 40,
  duration = 0.7,
  className,
}: RevealWrapperProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const y = isMobile ? Math.min(yOffset, 20) : yOffset

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
