"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/constrants/category-data";
import { cn } from "@/lib/utils";

import { File, FileInput, LoaderCircleIcon, MoreVertical } from "lucide-react";

interface CellActionProps {
  data: Post;
}

export const DownloadModal = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;
  return (
    <Dialog open={loading}>
      <DialogContent className={cn(`bg-white`)}>
        <span className="flex flex-col items-center gap-2">
          Downloading
          <LoaderCircleIcon className="animate-spin" />;
        </span>
      </DialogContent>
    </Dialog>
  );
};

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem className="flex items-center space-x-1 hover:cursor-pointer">
            <File className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center space-x-1 hover:cursor-pointer">
            <FileInput className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
