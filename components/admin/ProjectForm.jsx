'use client'

import { useState, useActionState } from 'react'
import TechStackInput from './TechStackInput'
import ImageUploader from './ImageUploader'

export default function ProjectForm({ project = null, onSubmit }) {
  // Bind React useActionState form mutation transitions safely
  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    // Inject our manual client-side state components directly into raw payload streams
    formData.set('tech_stack', JSON.stringify(techStack))
    formData.set('project_gallery', JSON.stringify(gallery))
    return await onSubmit(formData)
  }, null)

  const [title, setTitle] = useState(project?.title || '')
  const [techStack, setTechStack] = useState(project?.tech_stack || [])
  const [gallery, setGallery] = useState(project?.project_gallery || []) // Tracks multi-image arrays

  // Safe client-side slug generator tracking for file naming systems
  const formSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  return (
    <form action={formAction} className="space-y-6 text-neutral-200">
      {state?.error && (
        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1.5">Project Title</label>
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Gible Learning System"
            className="w-full px-3 py-2 bg-neutral-900 border border-base-border rounded text-sm text-white focus:border-accent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1.5">Project Classification/Type</label>
          <input
            type="text"
            name="project_type"
            required
            defaultValue={project?.project_type || ''}
            placeholder="e.g. Mobile Application, Full-Stack Web App"
            className="w-full px-3 py-2 bg-neutral-900 border border-base-border rounded text-sm text-white focus:border-accent outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1.5">Detailed Summary / Overview</label>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={project?.description || ''}
          placeholder="Describe your architecture features, approach methodologies, and optimization benchmarks..."
          className="w-full px-3 py-2 bg-neutral-900 border border-base-border rounded text-sm text-white focus:border-accent outline-none transition-all resize-none custom-scrollbar"
        />
      </div>

      {/* Multi-Image Cloud Gallery Bucket Component */}
      <ImageUploader slug={formSlug} initialUrls={gallery} onUploaded={setGallery} />

      {/* Live Categorized Tech Stack Configuration Matrix */}
      <TechStackInput initialTags={techStack} onChange={setTechStack} />

      {/* Bento Structural Grid Layout Sizing Matrix Panel */}
      <div>
        <label className="block text-sm text-neutral-400 mb-2 font-medium">Bento Card Sizing Block (Homepage Dashboard Matrix)</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { label: 'Small (1×1)', value: '1x1' },
            { label: 'Wide (2×1)', value: '2x1' },
            { label: 'Tall (1×2)', value: '1x2' },
            { label: 'Large (2×2)', value: '2x2' },
          ].map((item) => (
            <label
              key={item.value}
              className={`border rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none ${
                (project?.bento_size || '1x1') === item.value || (!project && item.value === '1x1')
                  ? 'bg-white/5 border-neutral-500 text-white font-medium'
                  : 'bg-transparent border-base-border text-neutral-400 hover:bg-neutral-900/50'
              }`}
            >
              <input
                type="radio"
                name="bento_size"
                value={item.value}
                defaultChecked={project ? project.bento_size === item.value : item.value === '1x1'}
                className="sr-only"
                onChange={(e) => {
                  // Standard structural helper to re-paint background highlight on clicking
                  document.querySelectorAll('input[name="bento_size"]').forEach((radio) => {
                    radio.parentElement.className = radio.parentElement.className
                      .replace('bg-white/5 border-neutral-500 text-white font-medium', 'bg-transparent border-base-border text-neutral-400 hover:bg-neutral-900/50')
                  })
                  e.target.parentElement.className = 'border rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none bg-white/5 border-neutral-500 text-white font-medium'
                }}
              />
              <span className="text-xs">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-sm text-neutral-400 mb-1.5">Live URI Link (Optional)</label>
          <input
            type="url"
            name="live_url"
            defaultValue={project?.live_url || ''}
            placeholder="https://your-live-deployment-link.com"
            className="w-full px-3 py-2 bg-neutral-900 border border-base-border rounded text-sm text-white focus:border-accent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1.5">Source Repository URL (Optional)</label>
          <input
            type="url"
            name="repo_url"
            defaultValue={project?.repo_url || ''}
            placeholder="https://github.com"
            className="w-full px-3 py-2 bg-neutral-900 border border-base-border rounded text-sm text-white focus:border-accent outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={project?.featured || false}
          className="rounded bg-neutral-900 border-neutral-700 text-accent focus:ring-0 cursor-pointer h-4 w-4"
        />
        <label htmlFor="featured" className="text-sm text-neutral-400 cursor-pointer select-none">
          Highlight project in prominent landing spots
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-base-border/50">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold disabled:opacity-50 cursor-pointer"
        >
          {isPending ? 'Syncing with Supabase...' : project ? 'Update Project Blueprint' : 'Publish Project Card'}
        </button>
      </div>
    </form>
  )
}
