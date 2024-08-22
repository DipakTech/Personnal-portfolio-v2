import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export default async function PostPage({ params }: PostPageProps) {
  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/posts"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex",
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
    </article>
  );
}
