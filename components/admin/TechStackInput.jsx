'use client'

import { useState } from 'react'

export default function TechStackInput({ initialTags = [], onChange }) {
  const [tags, setTags] = useState(initialTags)
  const [inputValue, setInputValue] = useState('')

  function addTag(e) {
    if (e.key !== 'Enter' || !inputValue.trim()) return
    e.preventDefault()
    const newTags = [...tags, inputValue.trim()]
    setTags(newTags)
    onChange(newTags)
    setInputValue('')
  }

  function removeTag(tagToRemove) {
    const newTags = tags.filter((t) => t !== tagToRemove)
    setTags(newTags)
    onChange(newTags)
  }

  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-2">Tech Stack</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/10 text-neutral-300"
          >
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-neutral-500 hover:text-white cursor-pointer">
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={addTag}
        placeholder="Type a tech and press Enter"
        className="w-full px-3 py-2 bg-neutral-900 text-white border border-base-border rounded text-sm outline-none focus:border-accent"
      />
    </div>
  )
}
