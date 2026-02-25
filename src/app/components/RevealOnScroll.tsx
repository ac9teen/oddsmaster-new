'use client'

import { useEffect } from 'react'

export default function RevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[]
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            observer.unobserve(el) // Only trigger once for a cleaner experience
          }
        })
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )

    elements.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 60, 240)}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}


