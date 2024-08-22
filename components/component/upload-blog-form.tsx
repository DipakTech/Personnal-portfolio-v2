"use client";

import { useTransition } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ExampleForm } from "../text-editor/text-editor";
import { InputTags } from "../ui/input-tags";
import { useState } from "react";
import { generateSlug } from "@/utils/generateSlug";
import { ChevronRight, Loader } from "lucide-react";
import AnimatedGradientText from "@/app/(dashboardlayout)/dashboard/components/animated-text";
import { cn } from "@/lib/utils";

type Blog = {
  author: string;
  title: string;
  metaDescription: string;
  seoKeywords: string;
  slug: string;
};

export function BlogUploadForm() {
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState<string>("");
  const [blogInfo, setBlogInfo] = useState<Blog>({
    author: "",
    title: "",
    metaDescription: "",
    seoKeywords: "",
    slug: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
  const [category, setCategory] = useState<string>();
  const [images, setImages] = useState<string[]>([]);

  const fetchContent = (e: any) => {
    e.preventDefault();
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
      setContent(data);
    });
  };

  return (
    <Card className="w-full mt-10 z-auto">
      <CardHeader>
        <CardTitle>New Blog Post</CardTitle>
        <CardDescription>
          Fill out the form to create a new blog post.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 gap-6 ">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={blogInfo.author}
                  onChange={(e) =>
                    setBlogInfo({ ...blogInfo, author: e.target.value })
                  }
                  placeholder="Enter author name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={blogInfo.title}
                  onChange={(e) =>
                    setBlogInfo({ ...blogInfo, title: e.target.value })
                  }
                  placeholder="Enter blog post title"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(val) => setCategory(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <InputTags
                  value={tags}
                  onChange={setTags}
                  placeholder="Enter values, comma separated..."
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Input
                    id="meta-description"
                    placeholder="Enter meta description"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="seo-keywords">SEO Keywords</Label>
                <InputTags
                  value={seoKeywords}
                  onChange={setSeoKeywords}
                  placeholder="Enter values, comma separated..."
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-keywords">Slug</Label>
                <Input
                  readOnly
                  id="slug"
                  value={generateSlug(blogInfo.title)}
                  placeholder="Enter slug"
                />
              </div>
            </div>
          </div>

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
          <div className="space-y-2">
            <Label htmlFor="image">Content</Label>
            <ExampleForm aiGenerated={content} />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" size="lg" className="">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
