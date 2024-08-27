"use client";
import { AddCategory } from "@/components/Modals/Category/CategoryModal";
import { CategoryListClient } from "@/components/Tables/categoryTable/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

const CategoryLayout = ({ categories }: { categories: any }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className="justify-end  items-end flex">
        <Button onClick={onClose} size="sm" className="h-7 gap-1 flex ">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Category
          </span>
        </Button>
      </div>
      <div>
        <AddCategory isOpen={open} onClose={onClose} />
        <CategoryListClient />
      </div>
    </>
  );
};

export default CategoryLayout;
