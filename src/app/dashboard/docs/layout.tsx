import { TableOfContents } from "@/components/table-of-contents";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-1 gap-4 p-4 pt-0">
        <main className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4">
          <div className="prose prose-green max-w-none">{children}</div>
        </main>
        <div className="hidden xl:block w-[250px] flex-shrink-0">
          <TableOfContents />
        </div>
      </div>
    </div>
  );
}
