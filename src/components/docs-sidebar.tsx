"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarLinks = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs',
      },
      {
        title: 'Getting Started',
        href: '/docs/getting-started',
      },
    ]
  },
  {
    title: 'Core Concepts',
    items: [
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
    ]
  },
  {
    title: 'Advanced Topics',
    items: [
      {
        title: 'Advanced Capabilities',
        href: '/docs/advanced-capabilities',
      },
      {
        title: 'Technical Implementation',
        href: '/docs/technical-implementation',
      },
    ]
  },
]

export default function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed w-[250px] h-[calc(100vh-64px)] border-r border-border bg-background p-6 overflow-y-auto">
      <nav className="space-y-8">
        {sidebarLinks.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold text-sm text-primary mb-2">{section.title}</h4>
            <div className="space-y-1">
              {section.items.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${
                    pathname === link.href
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
} 