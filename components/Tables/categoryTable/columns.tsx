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
    id: "actions",
    accessorKey: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
