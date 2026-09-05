'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { deleteProject } from '../../lib/actions/projects'

export default function ProjectsTable({ projects }) {
  const [isPending, startTransition] = useTransition()

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    startTransition(async () => {
      const result = await deleteProject(id)
      if (result?.error) {
        alert(result.error)
      }
    })
  }

  if (!projects?.length) {
    return <div className="text-neutral-500 text-sm">No projects stored in your archive yet.</div>
  }

  return (
    <div className="w-full overflow-hidden border border-base-border rounded-bento bg-base-surface">
      <table className="w-full text-left border-collapse text-sm text-neutral-300">
        <thead>
          <tr className="border-b border-base-border bg-black/40 text-neutral-400 font-medium">
            <th className="p-4">Title</th>
            <th className="p-4">Type</th>
            <th className="p-4">Tile Size</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-border">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 font-medium text-white">{project.title}</td>
              <td className="p-4 capitalize">{project.project_type}</td>
              <td className="p-4 text-xs font-mono text-neutral-400">{project.bento_size}</td>
              <td className="p-4 text-right space-x-4">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-accent-soft hover:text-white font-medium cursor-pointer transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={isPending}
                  className="text-red-400 hover:text-red-300 font-medium cursor-pointer disabled:opacity-50 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
