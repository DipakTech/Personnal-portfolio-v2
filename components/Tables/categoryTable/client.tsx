import { DataTable } from "@/components/ui/data-table";
import { categoryData } from "@/constrants/category-data";
import { activeColumns } from "./columns";

interface CategoryListClientProps {
  columns?: any;
}

export const CategoryListClient: React.FC<CategoryListClientProps> = () => {
  return (
    <>
      <div className="mt-5 w-full">
        <DataTable
          searchKey="name"
          columns={activeColumns}
          data={categoryData}
        />
      </div>
    </>
  );
};
