import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "lucide-react";
import { CoverLetterTable } from "./components/cover-letter-table";
import GenerateCoverLetterButton from "./components/generate-cover-letter";

export default function GenerateCoverLetterPage() {
  return (
    <ContentLayout title="cover letter">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>cover letter</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <GenerateCoverLetterButton />
      <div className="mt-8 bg-slate-100 dark:bg-slate-950 rounded-md  p-5">
        <h2 className="text-sm font-bold mb-4">Generated Cover Letters</h2>
        <CoverLetterTable />
      </div>
    </ContentLayout>
  );
}
