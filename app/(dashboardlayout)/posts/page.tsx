import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PostListTable } from "@/components/Tables/postList/client";

import AddPost from "@/components/buttons/AddPost";
import { getBlogs } from "@/utils/actions/blog/getBlogs";
import { totalPosts } from "@/utils/actions/blog/totalPosts";

const BreadCrumb = async () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Posts</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default async function PostsPage() {
  const blogs = await getBlogs();
  const totalBlogs = await totalPosts();

  return (
    <ContentLayout title="All Posts">
      <div className="flex w-full justify-between">
        <BreadCrumb />
        <AddPost />
      </div>
      <ScrollArea className="h-[calc(100vh-210px)]">
        <PostListTable blogs={blogs} totalBlogs={totalBlogs} />
      </ScrollArea>
    </ContentLayout>
  );
}
