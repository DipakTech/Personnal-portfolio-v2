import { DataTable } from "@/components/ui/data-table";
import { categoryData } from "@/constrants/category-data";
import { activeColumns } from "./columns";

interface Category {
  id: string;
  name: string;
  image?: string;
}
interface CategoryListClientProps {
  columns?: any;
  categories: Category[];
}

export const CategoryListClient: React.FC<CategoryListClientProps> = ({
  categories,
  columns,
}) => {
  console.log(categories);

  return (
    <>
      <div className="mt-5 w-full">
        <DataTable searchKey="name" columns={activeColumns} data={categories} />
      </div>
    </>
  );
};
