"use client";
// import { AlertModal } from "@/components/Modal/alert-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/constrants/category-data";
import { cn } from "@/lib/utils";

import { File, FileInput, LoaderCircleIcon, MoreVertical } from "lucide-react";

interface CellActionProps {
  data: Category;
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
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={checkoutBookingMutation.isPending}
      /> */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            // onClick={handleDocument}
            className="flex items-center space-x-1 hover:cursor-pointer"
          >
            <File className="mr-2 h-4 w-4" />
            <span>Download Document</span>
          </DropdownMenuItem>
          {/* )} */}
          <DropdownMenuItem
            className="flex items-center space-x-1 hover:cursor-pointer"
            // onClick={() => setOpen(true)}
          >
            <FileInput className="mr-2 h-4 w-4" />
            <span>Checkout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
