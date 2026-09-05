'use client'

import { useState, useMemo, useEffect } from 'react'

export default function TechStackInput({ initialTags = [], onChange }) {
  const [techPool, setTechPool] = useState([])
  const [selectedTags, setSelectedTags] = useState(initialTags)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch the active tags pool dynamically from the browser client context
  useEffect(() => {
    async function loadTags() {
      try {
        // We use our clean browser storage client engine to read public records
        const { createClient } = await import('../../lib/supabase/client')
        const supabase = createClient()
        const { data } = await supabase.from('technologies').select('name, category').order('name', { ascending: true })
        if (data) setTechPool(data)
      } catch (err) {
        console.error('Failed to load dynamic technologies tags pool:', err)
      } finally {
        setLoading(false)
      }
    }
    loadTags()
  }, [])

  function handleToggleTag(tagName) {
    let updatedTags
    if (selectedTags.includes(tagName)) {
      updatedTags = selectedTags.filter((t) => t !== tagName)
    } else {
      updatedTags = [...selectedTags, tagName]
    }
    setSelectedTags(updatedTags)
    onChange(updatedTags)
  }

  const filteredPool = useMemo(() => {
    if (!searchQuery.trim()) return techPool
    return techPool.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, techPool])

  const groupedPool = useMemo(() => {
    const groups = {}
    filteredPool.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })
    return groups
  }, [filteredPool])

  return (
    <div className="space-y-3">
      <label className="block text-sm text-neutral-400 font-medium">Tech Stack Configuration</label>

      {/* 1. Selected Badge View Drawer */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-neutral-950 border border-base-border rounded-bento min-h-[46px]">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-soft font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleToggleTag(tag)}
                className="text-accent hover:text-white font-bold transition-colors cursor-pointer"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 2. Live Keyword Filter Input Field */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search languages, frameworks, methodologies, algorithms..."
          className="w-full px-3 py-2 pl-9 bg-neutral-900 border border-base-border rounded text-sm text-white outline-none focus:border-accent transition-all"
        />
        <svg className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* 3. Categorized Scroll Selection Window Matrix */}
      <div className="w-full h-52 overflow-y-auto border border-base-border rounded bg-neutral-900/40 p-4 space-y-4 custom-scrollbar">
        {loading ? (
          <p className="text-xs text-neutral-500 text-center py-8 animate-pulse">Streaming tags pool from Supabase database rows...</p>
        ) : Object.keys(groupedPool).length === 0 ? (
          <p className="text-xs text-neutral-500 text-center py-8">No matching technology nodes found.</p>
        ) : (
          Object.entries(groupedPool).map(([category, items]) => (
            <div key={category} className="space-y-1.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 border-b border-base-border/50 pb-0.5">
                {category}s
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {items.map((item) => {
                  const isChecked = selectedTags.includes(item.name)
                  return (
                    <label
                      key={item.name}
                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer border select-none ${
                        isChecked
                          ? 'bg-white/5 border-neutral-600 text-white'
                          : 'border-transparent text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleTag(item.name)}
                        className="rounded bg-neutral-950 border-neutral-700 text-accent focus:ring-0 cursor-pointer h-3.5 w-3.5"
                      />
                      {item.name}
                    </label>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
