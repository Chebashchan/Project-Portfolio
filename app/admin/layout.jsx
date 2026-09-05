import AdminSidebar from '../../components/admin/AdminSidebar'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-base-black">
      <AdminSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
