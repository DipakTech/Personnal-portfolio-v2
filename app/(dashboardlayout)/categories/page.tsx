"use client";
import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CategoryListClient } from "@/components/Tables/categoryTable/client";
import { Button } from "@/components/ui/button";
import { AddCategory } from "@/components/Modals/Category/CategoryModal";
import { useState } from "react";

export default function CategoriesPage() {
  const [open, setOpen] = useState(true);
  const onClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ContentLayout title="Categories">
      <div className="flex justify-between w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={onClose}>Add Category</Button>
      </div>
      <AddCategory isOpen={open} onClose={onClose} />
      <CategoryListClient />
    </ContentLayout>
  );
}
