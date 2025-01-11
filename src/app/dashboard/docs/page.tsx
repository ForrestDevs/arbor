import { getMdxContent } from "@/lib/mdx";

export default async function DocsPage() {
  const { content } = await getMdxContent("index");

  return <article className="prose prose-green max-w-none">{content}</article>;
}
