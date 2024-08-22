"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

const AddPost = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/posts/new")}
      size="sm"
      className="h-7 gap-1"
    >
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Add Product
      </span>
    </Button>
  );
};

export default AddPost;
