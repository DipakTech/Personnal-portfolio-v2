import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

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
