import { getMdxContent } from '@/lib/mdx'
import { notFound } from 'next/navigation'

export default async function DocPage({
  params,
}: {
  params: { slug: string }
}) {
  try {
    const { content } = await getMdxContent(params.slug)
    
    return (
      <article className="prose prose-green max-w-none">
        {content}
      </article>
    )
  } catch (error) {
    notFound()
  }
} 