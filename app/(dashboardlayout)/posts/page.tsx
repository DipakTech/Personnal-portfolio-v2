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

const BreadCrumb = () => {
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

export default function PostsPage() {
  return (
    <ContentLayout title="All Posts">
      <div className="flex w-full justify-between">
        <BreadCrumb />
        <AddPost />
      </div>
      <ScrollArea className="h-[calc(100vh-210px)]">
        <PostListTable />
      </ScrollArea>
    </ContentLayout>
  );
}
