import { getMdxContent } from "@/lib/mdx";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  try {
    const { content } = await getMdxContent(slug);

    return (
      <article className="prose prose-green max-w-none">{content}</article>
    );
  } catch (error) {
    console.error("Error loading doc:", slug, error);
    notFound();
  }
}
