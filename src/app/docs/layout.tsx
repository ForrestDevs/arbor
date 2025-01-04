import Header from '@/components/header'
import DocsSidebar from '@/components/docs-sidebar'
import { TableOfContents } from '@/components/table-of-contents'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 flex">
        <DocsSidebar />
        <div className="flex-1 flex ml-[250px]">
          <main className="flex-1 px-8 py-8 max-w-3xl">
            <div className="prose prose-green max-w-none">
              {children}
            </div>
          </main>
          <div className="hidden xl:block w-[250px] flex-shrink-0">
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  )
} 