'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

export default function BentoGrid({ projects }) {
  const gridRef = useRef(null)

  useGSAP(
    () => {
      if (!projects?.length) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const tiles = gridRef.current.querySelectorAll('[data-tile]')

      if (prefersReducedMotion) {
        gsap.set(tiles, { y: 0, opacity: 1 })
        return
      }

      gsap.set(tiles, { y: 30, opacity: 0 })

      gsap.to(tiles, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    },
    { scope: gridRef, dependencies: [projects] }
  )

  if (!projects?.length) {
    return (
      <div className="bento-tile p-6 text-neutral-500 text-center w-full col-span-full">
        No projects found.
      </div>
    )
  }

  return (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[180px] gap-3 md:gap-4 w-full">
      {projects.map((project) => (
        <div key={project.id} data-tile className="w-full h-full">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}
