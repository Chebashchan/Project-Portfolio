import { getAllProjects } from '../../lib/data/projects'
import ProjectFilter from '../../components/projects/ProjectFilter'

export const metadata = {
  title: 'Projects — Portfolio Showcase',
  description: 'Mobile, web, and scalable backend technical projects documentation infrastructure.',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-2xl text-white mb-8 font-medium">Projects</h1>
      <ProjectFilter projects={projects} />
    </main>
  )
}
