import ProjectForm from '../../../../components/admin/ProjectForm'
import { createProject } from '../../../../lib/actions/projects'

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-xl text-white mb-6 font-medium">Add New Project</h1>
      <ProjectForm onSubmit={createProject} />
    </div>
  )
}
