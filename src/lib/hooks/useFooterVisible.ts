'use client'
import { useState, useEffect } from 'react'

export function useFooterVisible() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return visible
}
