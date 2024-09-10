"use client";

import { useState, useCallback } from "react";
import { useTimeout } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardCopy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => setIsCopied(true));
  }, [text]);

  useTimeout(() => {
    if (isCopied) {
      setIsCopied(false);
    }
  }, 2000);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={copy}
            // className="w-10 h-10"
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <ClipboardCopy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy to clipboard</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCopied ? "Copied!" : "Copy"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
