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
import { Separator } from "../ui/separator";
import { CldUploadWidget } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import Image from "next/image";
import { Content } from "@tiptap/core";
import { createBlog } from "@/utils/actions/blog/createBlog";

type Blog = {
  author: string;
  title: string;
  metaDescription: string;
  slug: string;
};

export function BlogUploadForm({ categories }: { categories: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [blogInfo, setBlogInfo] = useState<Blog>({
    author: "",
    title: "",
    metaDescription: "",
    slug: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
  const [category, setCategory] = useState<string>();
  const [image, setImage] = useState<string>();
  const [globalState, setEditglobalState] = useState<string | Content | null>(
    "",
  );

  const handleSubmit = () => {
    startTransition(async () => {
      await createBlog({
        content: globalState,
        tags,
        seoKeywords,
        categoryId: category,
        author: blogInfo.author,
        title: blogInfo.title,
        metaDescription: blogInfo.metaDescription,
        thumbnail: image,
      });
    });
  };

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
      setEditglobalState(data);
    });
  };

  return (
    <Card className="w-full mt-5 z-auto">
      <CardHeader>
        <CardTitle>New Blog Post</CardTitle>
        <CardDescription>
          Fill out the form to create a new blog post.
        </CardDescription>
      </CardHeader>
      <Separator />
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
                    {categories?.map((cate: { id: string; name: string }) => (
                      <SelectItem key={cate.id} value={cate.id}>
                        {cate.name}
                      </SelectItem>
                    ))}
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
              <div className=" flex gap-3 items-center">
                <Label htmlFor="image">Image (click to upload)</Label>

                <CldUploadWidget
                  uploadPreset="vpnoelmn"
                  options={{
                    sources: ["local", "url", "unsplash", "camera"],
                    multiple: true,
                    maxFiles: 5,
                  }}
                  onSuccess={(result: any, { widget }) => {
                    setImage(result?.info?.thumbnail_url);
                    console.log("image", result);
                  }}
                  onQueuesEnd={(result, { widget }) => {
                    widget.close();
                  }}
                >
                  {({ open }) => {
                    return (
                      <>
                        <HiPhoto
                          size={30}
                          className="text-cyan-500 cursor-pointer"
                          onClick={() => open()}
                        />
                        {image && (
                          <Image
                            src={image}
                            alt="uploaded image"
                            height={100}
                            width={100}
                          />
                        )}
                      </>
                    );
                  }}
                </CldUploadWidget>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Input
                    id="meta-description"
                    value={blogInfo.metaDescription}
                    onChange={(e) =>
                      setBlogInfo({
                        ...blogInfo,
                        metaDescription: e.target.value,
                      })
                    }
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
            <ExampleForm
              aiGenerated={globalState}
              setEditglobalState={setEditglobalState}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" size="sm" className="" onClick={handleSubmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
