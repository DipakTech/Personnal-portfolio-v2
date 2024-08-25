import { cn } from "@/lib/utils";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const BlogHeading = () => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl dark:text-white">Blog posts</h2>
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
      <div className="max-w-6xl mx-auto">
        <BlogHeading />
      </div>
      <div
        className={cn(
          "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4  mx-auto ",
          className,
        )}
      >
        {children}
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
          <button className=" text-xs text-neutral-600 dark:text-neutral-200 hover:text-neutral-800 dark:hover:text-neutral-100 transition duration-200 ease-in-out">
            Read more
          </button>
          <ArrowUpRight className="text-xs font-normal h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
