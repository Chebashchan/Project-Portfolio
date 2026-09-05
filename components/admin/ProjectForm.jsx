'use client'

import { useState } from 'react'
import TechStackInput from './TechStackInput'
import BentoSizeSelector from './BentoSizeSelector'
import ImageUploader from './ImageUploader'

export default function ProjectForm({ project = null, onSubmit }) {
  const [title, setTitle] = useState(project?.title || '')
  const [techStack, setTechStack] = useState(project?.tech_stack || [])
  const [bentoSize, setBentoSize] = useState(project?.bento_size || '1x1')
  const [coverImageUrl, setCoverImageUrl] = useState(project?.cover_image_url || '')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(formData) {
    formData.set('tech_stack', JSON.stringify(techStack))
    formData.set('bento_size', bentoSize)
    formData.set('cover_image_url', coverImageUrl)

    setSubmitting(true)
    const result = await onSubmit(formData)
    if (result?.error) {
      setError(result.error)
      setSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <label className="block text-sm text-neutral-400 mb-2">Title</label>
        <input
          type="text"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-neutral-900 border border-base-border text-white rounded outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-2">Description</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={project?.description || ''}
          className="w-full px-3 py-2 bg-neutral-900 border border-base-border text-white rounded outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-2">Project Type</label>
        <select
          name="project_type"
          required
          defaultValue={project?.project_type || 'web'}
          className="w-full px-3 py-2 bg-neutral-900 border border-base-border text-white rounded outline-none focus:border-accent"
        >
          <option value="mobile">Mobile</option>
          <option value="web">Web</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      <TechStackInput initialTags={techStack} onChange={setTechStack} />

      <BentoSizeSelector value={bentoSize} onChange={setBentoSize} />

      <ImageUploader
        slug={title ? title.toLowerCase().replace(/\s+/g, '-') : ''}
        initialUrl={coverImageUrl}
        onUploaded={setCoverImageUrl}
      />

      <div>
        <label className="block text-sm text-neutral-400 mb-2">Live URL</label>
        <input
          type="url"
          name="live_url"
          defaultValue={project?.live_url || ''}
          className="w-full px-3 py-2 bg-neutral-900 border border-base-border text-white rounded outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-2">Repo URL</label>
        <input
          type="url"
          name="repo_url"
          defaultValue={project?.repo_url || ''}
          className="w-full px-3 py-2 bg-neutral-900 border border-base-border text-white rounded outline-none focus:border-accent"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
        <input type="checkbox" name="featured" defaultChecked={project?.featured || false} />
        Featured project
      </label>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-white text-black font-medium rounded cursor-pointer disabled:opacity-50 hover:bg-neutral-200 transition-colors"
      >
        {submitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  )
}
