import { Footer } from "@/components/admin-panel/footer";
import Header from "@/components/Header/Header";
import BackgroundDots from "@/components/hero/dot-pattern-background";
import Hero from "@/components/hero/hero";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();

  let href = userId ? "/conversations" : "/new-user";

  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-screen h-auto overflow-hidden ">
        <BackgroundDots dotColor="blue" />
      </div>
      <Header />
      <main className="min-h-[calc(100vh-97px)] flex-1">
        <Hero href={href} />
      </main>
      <Footer />
    </main>
  );
}
