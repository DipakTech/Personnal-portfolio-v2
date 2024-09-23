"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import useGetAllCoverLetters from "@/hooks/query/useGetAllCoverLetter";

import CopyButton from "../copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { centerTruncate } from "@/lib/center-truncate";
import { Badge } from "@/components/ui/badge";
import CoverLetterTableSkeleton from "./table-skeleton";
import useDeleteCoverLetter from "@/hooks/mutation/useDeleteCoverLetter";
import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const DetailDialogModal = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Dialog>
      {children}
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex items-end justify-end">
          <CopyButton text={description} />
        </div>
        <Textarea
          value={description}
          readOnly
          className="min-h-[400px] whitespace-pre-wrap border-red-400 border-[1px]"
        />
      </DialogContent>
    </Dialog>
  );
};

export function CoverLetterTable() {
  const { coverLetters, error, isLoading } = useGetAllCoverLetters();
  const deleteCoverLetter = useDeleteCoverLetter();

  const handleDelete = (id: string) => {
    deleteCoverLetter.mutate({ id });
  };

  if (isLoading) return <CoverLetterTableSkeleton />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Job Description</TableHead>
          <TableHead>CV</TableHead>
          <TableHead>Cover Letter</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coverLetters?.length &&
          coverLetters.map((item: any, index) => (
            <TableRow key={index}>
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell>
                <div className="flex gap-2 justify-between">
                  <span>{centerTruncate(item.description, 25)}</span>
                  <DetailDialogModal
                    title={`Job Description for ${item.company}`}
                    description={item.description}
                  >
                    <DialogTrigger asChild>
                      <Badge className="py-1 rounded-full">View</Badge>
                    </DialogTrigger>
                  </DetailDialogModal>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2  justify-between">
                  <p>{centerTruncate(item.cv, 30)}</p>
                  <DetailDialogModal
                    description={item.cv}
                    title={`Cover letter for ${item.company}`}
                  >
                    <DialogTrigger asChild>
                      <Badge className="py-1 rounded-full">View</Badge>
                    </DialogTrigger>
                  </DetailDialogModal>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2  justify-between">
                  <p>{centerTruncate(item.coverLetter, 30)}</p>
                  <DetailDialogModal
                    description={item.coverLetter}
                    title={`Cover letter for ${item.company}`}
                  >
                    <DialogTrigger asChild>
                      <Badge className="py-1 rounded-full">View</Badge>
                    </DialogTrigger>
                  </DetailDialogModal>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(item.id)}
                  className=""
                  variant={"outline"}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
