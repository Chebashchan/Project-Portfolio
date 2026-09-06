import { getProjectBySlug } from '../../../lib/data/projects'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 text-neutral-300">
      {/* Back to Explore Navigation Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-8 group">
        <svg className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to archive
      </Link>

      {/* Header Info Block */}
      <header className="mb-8">
        <span className="text-xs uppercase tracking-wider text-accent-soft font-semibold px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.02]">
          {project.project_type}
        </span>
        <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight mt-4">
          {project.title}
        </h1>
      </header>

      {/* --- Upgraded Aspect-Adaptive Image Container --- */}
      {project.cover_image_url && (
        <div className="w-full bg-neutral-900/30 border border-white/[0.04] rounded-2xl p-4 md:p-6 mb-12 flex justify-center items-center backdrop-blur-md">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-xl shadow-2xl shadow-black/50">
            <img 
              src={project.cover_image_url} 
              alt={project.title}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* Body Content Description Grid Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {/* Long Form Bio Summary Text Column */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-400 border-b border-base-border/50 pb-2">
            Project Overview
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </div>

        {/* Technical Stack Specifications Sidebar Column */}
        <div className="space-y-8">
          {/* Tech Stack List */}
          {project.tech_stack?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.02] text-neutral-300 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Links Section */}
          {(project.live_url || project.repo_url) && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Project Assets
              </h3>
              <div className="flex flex-col gap-2">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-xs font-medium px-4 py-2.5 rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors">
                    Launch Application
                  </a>
                )}
                {project.repo_url && (
                  <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-xs font-medium px-4 py-2.5 rounded-lg bg-neutral-900 border border-base-border text-white hover:bg-white/[0.02] transition-colors">
                    Source Repository
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
