import AnimatedGradientText from "@/app/(dashboardlayout)/dashboard/components/animated-text";
import { cn } from "@/lib/utils";
import { Content } from "@tiptap/core";
import { ChevronRight, Loader } from "lucide-react";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { Blog } from "./upload-blog-form";

type GenerateAiButtonProps = {
  setEditglobalState: Dispatch<SetStateAction<Content>>;
  blogInfo: Blog;
  category: string | undefined;
  tags: any;
};

const GenerateAiButton = ({
  setEditglobalState,
  blogInfo,
  category,
  tags,
}: GenerateAiButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const fetchContent = (e: any) => {
    e.preventDefault();
    if (!blogInfo.title) return;

    startTransition(async () => {
      const requestData = {
        Title: blogInfo.title,
        Category: category,
        Tags: tags.join(","),
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await res.json();
      setEditglobalState(data);
    });
  };

  return (
    <div className="flex w-full justify-end items-end ml-auto">
      <AnimatedGradientText
        className="ml-auto w-[300px] hover:cursor-pointer"
        onClick={fetchContent}
      >
        🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          {isPending ? (
            <span className="flex gap-2 items-center">
              Generating <Loader />
            </span>
          ) : (
            "Generate content using Ai"
          )}
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
    </div>
  );
};

export default GenerateAiButton;
