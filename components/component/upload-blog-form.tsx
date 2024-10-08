"use client";

import { useEffect, useTransition } from "react";
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
import { Separator } from "../ui/separator";
import { CldUploadWidget } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import Image from "next/image";
import { Content } from "@tiptap/core";
import { createBlog } from "@/utils/actions/blog/createBlog";
import GenerateAiButton from "./generate-ai-button";

export type Blog = {
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
  const [content, setContent] = useState<string | Content | null>(globalState);

  const handleSubmit = () => {
    startTransition(async () => {
      await createBlog({
        content,
        tags,
        seoKeywords,
        categoryId: category,
        author: blogInfo.author,
        title: blogInfo.title,
        metaDescription: blogInfo.metaDescription,
        thumbnail: image,
      });

      console.log({
        content,
        tags,
        seoKeywords,
        categoryId: category,
        author: blogInfo.author,
        title: blogInfo.title,
        metaDescription: blogInfo.metaDescription,
        thumbnail: image,
      });

      // reset form

      // setBlogInfo({
      //   author: "",
      //   title: "",
      //   metaDescription: "",
      //   slug: "",
      // });

      // setTags([]);
      // setSeoKeywords([]);
      // setCategory("");
      // setImage("");
      // setEditglobalState("");
      // setContent("");

      // console.log({
      //   content: globalState,
      //   tags,
      //   seoKeywords,
      //   categoryId: category,
      //   author: blogInfo.author,
      //   title: blogInfo.title,
      //   metaDescription: blogInfo.metaDescription,
      //   thumbnail: image,
      // });
    });
  };

  const handleChange = (value: any): void => {
    setContent(value);
  };

  useEffect(() => {
    setContent(globalState);
  }, [globalState]);

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
                    setImage(result?.info?.secure_url);
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
                            height={840}
                            width={500}
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

          <GenerateAiButton
            setEditglobalState={setEditglobalState}
            blogInfo={blogInfo}
            category={category}
            tags={tags}
          />

          <div className="space-y-2">
            <Label htmlFor="image">Content</Label>
            <ExampleForm
              aiGenerated={globalState}
              handleChange={handleChange}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          size="sm"
          className=""
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Posting.." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
