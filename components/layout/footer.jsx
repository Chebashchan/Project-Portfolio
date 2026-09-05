export default function Footer() {
  return (
    <footer className="w-full border-t border-base-border mt-24">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-neutral-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Duke.Dev. All rights reserved.</p>
        <p>Built with Next.js, Supabase & GSAP</p>
      </div>
    </footer>
  )
}