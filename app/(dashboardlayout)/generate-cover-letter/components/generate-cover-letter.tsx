"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { CoverLetterForm } from "./cover-letter-form";
import { Button } from "@/components/ui/button";

const GenerateCoverLetterButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex justify-end items-ends">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="py-1 rounded-full ">Generate Cover Letter</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-md">Generate Cover Letter</DialogTitle>
          </DialogHeader>
          <CoverLetterForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateCoverLetterButton;
