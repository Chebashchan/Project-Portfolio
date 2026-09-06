'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b border-base-border bg-base-black/80 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/website_logo.png"
            alt="Duke.Dev"
            width={120}
            height={32}
            className="object-contain"
            priority
          />
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 text-sm text-neutral-400">
          {[
            { href: '/', label: 'Home' },
            { href: '/projects', label: 'Projects' },
          ].map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative px-3 py-1.5 rounded-md transition-all duration-200
                  hover:text-white hover:bg-white/[0.06]
                  active:scale-95
                  ${isActive ? 'text-white' : 'text-neutral-400'}
                `}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60" />
                )}
              </Link>
            )
          })}
        </div>

      </nav>
    </header>
  )
}