"use client";
import SearchModal from "@/app/blogs/components/search-blog";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Input } from "./input";
import { useState } from "react";
import { Button } from "./button";
import { Separator } from "./separator";
import BackgroundDots from "../hero/dot-pattern-background";
import { ScrollArea } from "./scroll-area";

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

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
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
              className="inline-flex h-10 w-full lg:w-[500px] animate shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50"
            />
          </div>
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

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-2 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className,
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        {/* {icon} */}
        <span className="text-xs text-white/60 dark:text-white">
          17 Aug 2024
        </span>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
        <div className="mt-2 w-fit flex gap-2 items-center justify-between">
          {/* tabs list */}
          <span className="text-xs rounded-md p-1 bg-slate-700 text-white">
            NodeJs{" "}
          </span>
          <span className="text-xs rounded-md p-1 bg-slate-700 text-white">
            ReactJs{" "}
          </span>
          <span className="text-xs rounded-md p-1 bg-slate-700 text-white">
            Tailwindcss{" "}
          </span>
          <span className="text-xs rounded-md p-1 bg-slate-700 text-white">
            Cloudinary{" "}
          </span>
        </div>
        <div className="ml-auto w-full flex justify-end mt-4">
          <Link
            href={"/blogs/1"}
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
