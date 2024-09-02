import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Header from "@/components/Header/Header";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";
import { getBlogs } from "@/utils/actions/blog/getBlogs";
import { getCategories } from "@/utils/actions/blog/getCategories";
import { formatDate } from "@/utils/formatDate";
import {
  getBlogsByCategory,
  searchPostByTitle,
} from "@/utils/actions/blog/getPostByCategory";

const BlogListPage = async ({
  searchParams,
}: {
  searchParams: {
    category: string;
    search: string;
  };
}) => {
  const allBlogs = await getBlogs();
  const categories = await getCategories();
  const categoryBlogs = await getBlogsByCategory(searchParams.category);
  const searchByTitleInput = await searchPostByTitle(searchParams.search);

  const blogs =
    categoryBlogs.length > 0
      ? categoryBlogs
      : searchByTitleInput.length > 0
      ? searchByTitleInput
      : allBlogs;
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-97px)] pt-24 flex-1 ">
        <BentoGrid className="max-w-6xl mx-auto " categories={categories}>
          {blogs.map((item: any, i: number) => (
            <BentoGridItem
              key={i}
              title={item.title}
              // description={item.description}
              // header={item.header}
              // icon={item.icon}
              thumbnail={item.thumbnail}
              postSlug={item.slug}
              tags={item.tags}
              createdAt={formatDate(item.createdAt)}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </main>
    </>
  );
};

export default BlogListPage;
