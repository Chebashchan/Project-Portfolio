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
      className={`bento-tile group relative overflow-hidden block w-full h-full min-h-[inherit] ${sizeClasses}`}
    >
      {/* Background Image Layer */}
      {project.cover_image_url && (
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={project.cover_image_url}
            alt=""
            fill
            className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      )}

      {/* Dark Ambient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent pointer-events-none" />

      {/* Content Layer Container */}
      <div className="relative z-20 flex flex-col justify-end h-full p-5 pointer-events-none w-full">
        <span className="text-[10px] uppercase tracking-wider text-accent-soft mb-1 font-semibold block">
          {project.project_type}
        </span>
        <h3 className="text-white font-medium text-base tracking-tight leading-snug break-words max-w-full">
          {project.title}
        </h3>
        
        {/* Technical Stack Tags Node Container */}
        <div className="flex flex-wrap gap-1.5 mt-3 max-w-full">
          {project.tech_stack?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.03] text-neutral-300 block truncate max-w-[150px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
