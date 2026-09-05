import Link from 'next/link'

export default function AdminSidebar() {
  return (
    <aside className="w-56 border-r border-base-border p-6 text-sm text-neutral-400">
      <p className="text-white font-medium mb-6">Admin Panel</p>
      <nav className="flex flex-col gap-3">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <Link href="/admin/projects/new" className="hover:text-white transition-colors">Add Project</Link>
      </nav>
    </aside>
  )
}
