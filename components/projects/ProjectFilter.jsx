'use client'

import { useState, useMemo } from 'react'
import BentoGrid from './BentoGrid'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Web', value: 'web' },
  { label: 'Backend', value: 'backend' },
]

export default function ProjectFilter({ projects }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((p) => p.project_type === activeFilter)
  }, [activeFilter, projects])

  return (
    <div>
      <div className="flex gap-4 mb-8 text-sm">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
              activeFilter === filter.value
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <BentoGrid projects={filteredProjects} />
    </div>
  )
}
