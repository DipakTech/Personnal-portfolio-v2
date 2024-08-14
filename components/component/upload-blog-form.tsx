"use client";

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

export function BlogUploadForm() {
  return (
    <Card className="w-full mt-10">
      <CardHeader>
        <CardTitle>New Blog Post</CardTitle>
        <CardDescription>
          Fill out the form to create a new blog post.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder="Enter author name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter blog post title" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
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
              <Input id="tags" placeholder="Enter tags, separated by commas" />
            </div>
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
              <div className="space-y-2">
                <Label htmlFor="seo-keywords">SEO Keywords</Label>
                <Input
                  id="seo-keywords"
                  placeholder="Enter keywords, separated by commas"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Blog body</Label>
            <ExampleForm />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" size="lg" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
