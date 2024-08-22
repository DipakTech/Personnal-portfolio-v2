"use client";
import { Category } from "@/constrants/category-data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const activeColumns: ColumnDef<Category>[] = [
  {
    header: "Category Name",
    accessorKey: "name",
    cell: (info) => info.getValue(),
  },

  {
    header: "Category Image",
    accessorKey: "image",
    cell: (info) => info.getValue(),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
