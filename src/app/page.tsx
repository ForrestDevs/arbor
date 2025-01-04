import Flow from "@/components/flow";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main>
        <Flow />
      </main>
    </div>
  );
}
