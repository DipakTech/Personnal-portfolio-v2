import { DataTable } from "@/components/ui/data-table";
import { activeColumns } from "./columns";
import { postData } from "@/constrants/category-data";
import { Posts } from "./type";

interface PostListClientProps {
  columns?: any;
  blogs: Posts;
  totalBlogs: number;
}

export const PostListTable: React.FC<PostListClientProps> = ({
  columns,
  blogs,
  totalBlogs,
}) => {
  return (
    <>
      <div className="mt-5">
        <DataTable searchKey="title" columns={activeColumns} data={blogs} />
      </div>
    </>
  );
};
