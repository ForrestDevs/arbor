import Header from '@/components/header'
import DocsSidebar from '@/components/docs-sidebar'

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
        <main className="flex-1 px-4 py-8 ml-[250px]">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 