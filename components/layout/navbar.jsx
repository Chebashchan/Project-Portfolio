import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="w-full border-b border-base-border bg-base-black/80 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-white font-medium tracking-tight">
          Duke.Dev
        </Link>
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
        </div>
      </nav>
    </header>
  )
}