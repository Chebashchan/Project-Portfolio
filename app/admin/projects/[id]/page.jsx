import ProjectForm from '../../../../components/admin/ProjectForm'
import { getProjectById } from '../../../../lib/data/projects'
import { updateProject } from '../../../../lib/actions/projects'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) notFound()

  return (
    <div>
      <h1 className="text-xl text-white mb-6 font-medium">Edit Project: {project.title}</h1>
      <ProjectForm project={project} onSubmit={updateProject.bind(null, id)} />
    </div>
  )
}
