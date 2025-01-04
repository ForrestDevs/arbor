import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getMdxContent(slug: string) {
  const filePath = path.join(process.cwd(), 'content/docs', `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  
  const { content, data } = matter(fileContent)
  
  const { content: compiled } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  })

  return {
    content: compiled,
    frontmatter: data,
  }
} 