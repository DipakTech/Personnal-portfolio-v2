import Header from "@/components/Header/Header";
import BackgroundDots from "@/components/hero/dot-pattern-background";
import Hero from "@/components/hero/hero";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  console.log(userId, "user id ..");
  let href = userId ? "/conversations" : "/new-user";

  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-screen h-auto overflow-hidden ">
        <BackgroundDots />
      </div>

      <Header />
      <main className="min-h-[calc(100vh-97px)] flex-1">
        <Hero href={href} />
      </main>
    </main>
  );
}
