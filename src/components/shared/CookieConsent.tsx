'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show if user hasn't responded yet
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
    // Tell GA4 to stop collecting analytics data for this session
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'denied' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 md:pb-6"
        >
          <div
            className="max-w-2xl mx-auto rounded-2xl border border-gold-300/30 px-5 py-4
              flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, rgba(255,248,232,0.97) 0%, rgba(255,244,210,0.97) 100%)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 -4px 32px rgba(212,134,10,0.12), 0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-devanagari text-maroon-800 text-sm leading-relaxed">
                हम आपके अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग करते हैं।
              </p>
              <p className="font-body text-saffron-700/70 text-xs mt-0.5">
                We use cookies to enhance your experience.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 rounded-lg border border-gold-300/50 text-saffron-700
                  font-body text-xs hover:bg-gold-300/10 transition-colors duration-200"
              >
                अस्वीकार | Decline
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 rounded-lg bg-saffron-500 text-cream-50
                  font-body text-xs font-medium hover:bg-saffron-600
                  transition-colors duration-200
                  shadow-[0_2px_12px_rgba(212,134,10,0.3)]"
              >
                स्वीकार करें | Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
