'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { getBentoSizeClasses } from '../../lib/utils/bentoSize'

export default function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const sizeClasses = getBentoSizeClasses(project.bento_size)

  useGSAP(
    () => {
      const card = cardRef.current
      if (!card) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches

      if (prefersReducedMotion || isTouchDevice) return

      const MAX_TILT = 10
      let bounds

      const quickRotateX = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' })
      const quickRotateY = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' })

      function handleMouseEnter() {
        bounds = card.getBoundingClientRect()
        card.style.willChange = 'transform'
        gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' })
      }

      function handleMouseMove(e) {
        if (!bounds) bounds = card.getBoundingClientRect()

        const relX = (e.clientX - bounds.left) / bounds.width
        const relY = (e.clientY - bounds.top) / bounds.height

        const rotateY = (relX - 0.5) * MAX_TILT * 2
        const rotateX = (0.5 - relY) * MAX_TILT * 2

        quickRotateX(rotateX)
        quickRotateY(rotateY)
      }

      function handleMouseLeave() {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.6)',
          onComplete: () => {
            card.style.willChange = 'auto'
          },
        })
      }

      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    },
    { scope: cardRef }
  )

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
      className={`bento-tile group relative overflow-hidden block ${sizeClasses}`}
    >
      {project.cover_image_url && (
        <Image
          src={project.cover_image_url}
          alt={project.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-end h-full p-5 pointer-events-none">
        <span className="text-xs uppercase tracking-wide text-accent-soft mb-1 font-medium">
          {project.project_type}
        </span>
        <h3 className="text-white font-medium text-lg tracking-tight">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tech_stack?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
