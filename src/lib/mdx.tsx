import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  SystemArchitectureDiagram,
  NeuralNetworkVisualizer,
  MetricsChart,
  CodeExample,
  MermaidDiagram,
} from "@/components/mdx-components";
import rehypePrettyCode from "rehype-pretty-code";

interface MdxNode {
  children: Array<{ type: string; value: string }>;
  properties: {
    className: string[];
  };
}

interface MdxError extends Error {
  code?: string;
  path?: string;
}

const components = {
  SystemArchitectureDiagram,
  NeuralNetworkVisualizer,
  MetricsChart,
  CodeExample,
  pre: (props: React.HTMLProps<HTMLPreElement>) => <pre className="overflow-auto" {...props} />,
  code: (props: React.HTMLProps<HTMLElement>) => <code className="text-sm" {...props} />,
  MermaidDiagram,
};

const prettyCodeOptions = {
  theme: "one-dark-pro",
  onVisitLine(node: MdxNode) {
    if (node.children.length === 0) {
      node.children = [{
        type: "text",
        value: " ",
      }];
    }
  },
  onVisitHighlightedLine(node: MdxNode) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node: MdxNode) {
    node.properties.className = ["word"];
  },
};

export async function getMdxContent(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content/docs", `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { content, data } = matter(fileContent);

    const { content: compiled } = await compileMDX({
      source: content,
      components,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            rehypeHighlight,
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      },
    });

    return {
      content: compiled,
      frontmatter: data,
    };
  } catch (error) {
    const mdxError = error as MdxError;
    console.error("Error processing MDX:", {
      message: mdxError.message,
      path: mdxError.path,
      code: mdxError.code
    });
    throw error;
  }
}
