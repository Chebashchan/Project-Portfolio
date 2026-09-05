import { getAllProjects } from '../../lib/data/projects'
import ProjectsTable from '../../components/admin/ProjectsTable'

export default async function AdminDashboardPage() {
  const projects = await getAllProjects()

  return (
    <div>
      <h1 className="text-xl text-white mb-6 font-medium">Manage Projects</h1>
      <ProjectsTable projects={projects} />
    </div>
  )
}
