import { DataTable } from "@/components/ui/data-table";
import { activeColumns } from "./columns";
import { postData } from "@/constrants/category-data";

interface PostListClientProps {
  columns?: any;
}

export const PostListTable: React.FC<PostListClientProps> = () => {
  return (
    <>
      <div className="mt-5">
        <DataTable searchKey="name" columns={activeColumns} data={postData} />
      </div>
    </>
  );
};
