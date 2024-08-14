import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <main className="min-h-[calc(100vh-97px)] flex-1">
        <h1 className="text-3xl font-bold text-center mt-10">
          Welcome to Shadcn UI Sidebar
        </h1>
      </main>
    </main>
  );
}
