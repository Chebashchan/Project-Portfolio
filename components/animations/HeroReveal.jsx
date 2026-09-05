'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function HeroReveal({ children }) {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const targets = containerRef.current.querySelectorAll('[data-reveal]')

      if (prefersReducedMotion) {
        gsap.set(targets, { y: 0, opacity: 1 })
        return
      }

      gsap.set(targets, { y: 40, opacity: 0 })

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.15,
      })
    },
    { scope: containerRef }
  )

  return <div ref={containerRef}>{children}</div>
}
