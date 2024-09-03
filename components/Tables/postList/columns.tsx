"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Post } from "./type";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TagList = ({
  tags,
}: {
  tags: {
    tag: {
      id: string;
      name: string;
    };
  }[];
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge className="px-1" key={tag.tag.id}>
          {tag.tag.name}
        </Badge>
      ))}
    </div>
  );
};

export const activeColumns: ColumnDef<Post>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: (info) => <p className="line-clamp-1">{info.row.original.title}</p>,
  },

  {
    header: "Author",
    accessorKey: "author",
    cell: (info) => (
      <p className="line-clamp-1">{info.row.original.author.name}</p>
    ),
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: (info) => info.row.original.category.name,
  },
  {
    header: "Tag",
    accessorKey: "tags",
    cell: (info) => <TagList tags={info.row.original.tags} />,
  },
  {
    header: "published",
    accessorKey: "published",
    cell: (info) => (
      <Badge
        className={cn(
          "px-1",
          info.row.original.published
            ? "bg-green-600"
            : "bg-red-600 text-white",
        )}
      >
        {" "}
        {info.row.original.published ? "Published" : "Draft"}
      </Badge>
    ),
  },
  {
    header: "created At",
    accessorKey: "createdAt",
    cell: (info) => formatDate(info.row.original.createdAt),
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
