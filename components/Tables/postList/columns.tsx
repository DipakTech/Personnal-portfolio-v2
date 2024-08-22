"use client";
import { Post } from "@/constrants/category-data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const activeColumns: ColumnDef<Post>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: (info) => info.getValue(),
  },
  {
    header: "slug",
    accessorKey: "slug",
    cell: (info) => info.getValue(),
  },
  {
    header: "Content",
    accessorKey: "Content",
    cell: (info) => info.getValue(),
  },
  {
    header: "Image",
    accessorKey: "image",
    cell: (info) => info.getValue(),
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: (info) => info.getValue(),
  },
  {
    header: "published",
    accessorKey: "published",
    cell: (info) => info.getValue(),
  },
  {
    header: "Created At",
    accessorKey: "created",
    cell: (info) => info.getValue(),
  },
  {
    header: "author",
    accessorKey: "author",
    cell: (info) => info.getValue(),
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
