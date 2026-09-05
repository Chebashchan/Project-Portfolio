import { getProjectBySlug } from '../../../lib/data/projects'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.title} — Portfolio Showcase`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.cover_image_url ? [project.cover_image_url] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-neutral-500 text-sm mb-2 capitalize">{project.project_type}</p>
      <h1 className="text-3xl text-white mb-4 tracking-tight">{project.title}</h1>

      {project.cover_image_url && (
        <div className="relative w-full h-80 rounded-bento overflow-hidden mb-6 border border-base-border">
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <p className="text-neutral-300 leading-relaxed max-w-2xl">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tech_stack?.map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 rounded-full bg-white/10 text-neutral-300">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-6 text-sm">
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-accent-soft hover:underline">
            Live Site →
          </a>
        )}
        {project.repo_url && (
          <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="text-accent-soft hover:underline">
            Repository →
          </a>
        )}
      </div>
    </main>
  )
}
