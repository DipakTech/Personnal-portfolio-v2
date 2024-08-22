"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/textarea";

import React, { useState } from "react";

export const AddCategory = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      description="please add category"
      title="Add Category"
      onClose={onClose}
    >
      <Card className="border-none ">
        <CardContent className="grid gap-4 px-0">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter category title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a brief description"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" placeholder="Upload an image" />
          </div>
        </CardContent>
        <CardFooter className="w-full p-0">
          <Button type="submit" className="w-full">
            Create Category
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  );
};

export const DeleteCategory = () => {
  return <div>DeleteCategory</div>;
};
