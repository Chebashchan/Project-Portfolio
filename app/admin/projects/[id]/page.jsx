import ProjectForm from '../../../../components/admin/ProjectForm'
import { getProjectById } from '../../../../lib/data/projects'
import { updateProject } from '../../../../lib/actions/projects'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }) {
  const { id } = await params
  
  // 1. Grab our full project dataset directly from Supabase
  const project = await getProjectById(id)

  if (!project) notFound()

  // 2. Bind the server update action to this specific project ID node
  const updateActionWithId = updateProject.bind(null, id)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl text-white mb-6 font-medium">
        Edit Project: {project.title}
      </h1>
      {/* Pass the data smoothly into our updated form engine component */}
      <ProjectForm project={project} onSubmit={updateActionWithId} />
    </div>
  )
}
