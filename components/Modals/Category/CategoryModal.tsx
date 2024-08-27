"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/utils/actions/blog/createCategory";
// import { CldUploadWidget } from "next-cloudinary";
// import Image from "next/image";
import { useTransition } from "react";

import React, { useState } from "react";
// import { HiPhoto } from "react-icons/hi2";

export const AddCategory = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const [categoryInfo, setCategoryInfo] = useState({
    title: "",
    description: "",
    // image: "",
  });

  const handleSubmit = () => {
    try {
      startTransition(async () => {
        await createCategory(categoryInfo);
        onClose();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      description="please add category"
      title="Add Category"
      onClose={onClose}
    >
      <Card className="border-none px-0 md:p-0">
        <CardContent className="grid gap-4 px-0 md:px-0">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={categoryInfo.title}
              onChange={(e) =>
                setCategoryInfo({ ...categoryInfo, title: e.target.value })
              }
              placeholder="Enter category title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={categoryInfo.description}
              onChange={(e) =>
                setCategoryInfo({
                  ...categoryInfo,
                  description: e.target.value,
                })
              }
              placeholder="Provide a brief description"
            />
          </div>
          {/* <div className="flex items-center gap-3">
            <Label htmlFor="image">Image</Label>
            <CldUploadWidget
              uploadPreset="vpnoelmn"
              options={{
                sources: ["local", "url", "unsplash", "camera"],
                multiple: true,
                maxFiles: 5,
              }}
              onSuccess={(result: any, { widget }) => {
                setCategoryInfo({
                  ...categoryInfo,
                  image: result?.info?.thumbnail_url,
                });
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
                    {categoryInfo.image && (
                      <Image
                        src={categoryInfo.image}
                        alt="uploaded image"
                        height={100}
                        width={100}
                      />
                    )}
                  </>
                );
              }}
            </CldUploadWidget>
          </div> */}
        </CardContent>
        <CardFooter className="w-full p-0">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            {isPending ? "Creating Category..." : "Create Category"}
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  );
};

export const DeleteCategory = () => {
  return <div>DeleteCategory</div>;
};
