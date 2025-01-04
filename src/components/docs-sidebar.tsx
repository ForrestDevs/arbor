"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarLinks = [
  {
    title: 'Introduction',
    href: '/docs',
  },
  {
    title: 'Core Architecture',
    href: '/docs/core-architecture',
  },
  {
    title: 'Key Technologies',
    href: '/docs/key-technologies',
  },
  {
    title: 'Evolutionary Process',
    href: '/docs/evolutionary-process',
  },
  {
    title: 'Advanced Capabilities',
    href: '/docs/advanced-capabilities',
  },
  {
    title: 'Technical Implementation',
    href: '/docs/technical-implementation',
  },
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
  },
]

export default function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed w-[250px] h-[calc(100vh-64px)] border-r border-border bg-background p-4">
      <nav className="space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded-md ${
              pathname === link.href
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            }`}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  )
} 