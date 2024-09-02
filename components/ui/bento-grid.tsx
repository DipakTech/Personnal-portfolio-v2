"use client";
import SearchModal from "@/app/blogs/components/search-blog";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Input } from "./input";
import { ChangeEventHandler, useState } from "react";
import { Button } from "./button";
import { Separator } from "./separator";
import BackgroundDots from "../hero/dot-pattern-background";
import { ScrollArea } from "./scroll-area";
import { Badge } from "./badge";
import { useRouter, useSearchParams } from "next/navigation";
import { getBlogsByCategory } from "@/utils/actions/blog/getPostByCategory";
import Image from "next/image";

const BlogHeading = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-end mb-2 items-end">
      <button className="text-xs text-neutral-600 dark:text-neutral-200 hover:text-neutral-800 dark:hover:text-neutral-100 transition duration-200 ease-in-out">
        View all
      </button>
    </div>
  );
};

export const Skeleton = ({ thumbnail }: { thumbnail?: string }) => (
  // bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100
  <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl ">
    {thumbnail && (
      <Image
        className="w-full rounded-md object-cover"
        alt="blog image"
        src={
          thumbnail ||
          "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        width={500}
        height={350}
      />
    )}
  </div>
);

export const BentoGrid = ({
  className,
  children,
  categories,
}: {
  className?: string;
  children?: React.ReactNode;
  categories?: {
    id: string;
    name: string;
  }[];
}) => {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");

  const handleInputSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value === "") {
      return router.push(`/blogs`);
    }
    router.push(`/blogs?search=${e.target.value}`);
  };

  const handleSearch = async ({ id, name }: { id: string; name: string }) => {
    setSearchKey(name);
    if (name === "") {
      return router.push(`/blogs`);
    }
    router.push(`/blogs?category=${name}`);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="container mx-auto text-center ">
          <BackgroundDots
            className="absolute  inset-0 h-8 -z-10"
            quantity={15}
          />
          <h1 className="z-10 text-2xl font-extrabold text-gray-900 dark:text-white lg:text-4xl">
            Search Blogs 🚀
          </h1>

          <div className="pt-5">
            <Input
              type="text"
              placeholder="Search Blogs"
              value={searchKey}
              onChange={handleInputSearch}
              className="inline-flex h-10 w-full lg:max-w-[500px] animate shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50"
            />
          </div>
        </div>
        <div className="flex gap-1 flex-wrap max-w-5xl mx-auto mt-3">
          {categories?.map((category: any) => (
            <Badge
              key={category.id}
              className="cursor-pointer"
              onClick={() => handleSearch(category)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div
            className={cn(
              "grid md:auto-rows-[19rem] grid-cols-1 md:grid-cols-3 gap-4  mx-auto px-4 sm:px-0 ",
              className,
            )}
          >
            {children}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

interface Tag {
  tag: {
    id: string;
    name: string;
  };
}

export const BentoGridItem = ({
  className,
  title,
  createdAt,
  tags,
  postSlug,
  thumbnail,
  // description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  // description?: string | React.ReactNode;
  postSlug?: string;
  thumbnail?: string;
  tags?: Tag[];
  header?: React.ReactNode;
  icon?: React.ReactNode;
  createdAt: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-2 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className,
      )}
    >
      {/* {header} */}
      <Skeleton thumbnail={thumbnail} />
      <div className="group-hover/bento:translate-x-1 px-2 transition duration-200">
        {/* {icon} */}
        <span className="text-xs text-white/60 dark:text-white">
          {createdAt}
        </span>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        {/* <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div> */}
        <div className="mt-2 w-fit flex gap-2 items-center justify-between">
          {/* tabs list */}
          {tags?.map((tag: Tag) => (
            <span
              key={tag.tag.id}
              className="text-xs rounded-md p-1 bg-slate-700 text-white"
            >
              {tag.tag.name}
            </span>
          ))}
        </div>
        <div className="ml-auto w-full flex justify-end mt-4">
          <Link
            href={`/blogs/${postSlug}`}
            className=" text-xs text-neutral-600 dark:text-neutral-200 hover:text-neutral-800 dark:hover:text-neutral-100 transition duration-200 ease-in-out"
          >
            Read more
          </Link>
          <ArrowUpRight className="text-xs font-normal h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
