import { getProjectBySlug } from '../../../lib/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
// Change line 4 to this:// Overwrite line 5 with this exact relative directory routing mapping:
import ProjectCarousel from '../../components/projects/ProjectCarousel'



export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 text-neutral-300">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-8 group">
        <svg className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to archive
      </Link>

      <header className="mb-8">
        <span className="text-xs uppercase tracking-wider text-accent-soft font-semibold px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.02]">
          {project.project_type}
        </span>
        <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight mt-4">
          {project.title}
        </h1>
      </header>

      {/* Dynamic Slide Carousel Engine Room */}
      <ProjectCarousel images={project.project_gallery || []} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-400 border-b border-base-border/50 pb-2">
            Project Overview
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </div>

        <div className="space-y-8">
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
