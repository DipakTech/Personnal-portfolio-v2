import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoverLetterTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Job Description</TableHead>
          <TableHead>CV</TableHead>
          <TableHead>Cover Letter</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <div className="flex gap-2 justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
