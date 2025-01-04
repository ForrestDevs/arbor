import { getMdxContent } from '@/lib/mdx'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function DocPage({ params }: PageProps) {
  if (!params.slug) {
    notFound()
  }

  try {
    const { content } = await getMdxContent(params.slug)
    
    return (
      <article className="prose prose-green max-w-none">
        {content}
      </article>
    )
  } catch (error) {
    console.error('Error loading doc:', params.slug, error)
    notFound()
  }
} 