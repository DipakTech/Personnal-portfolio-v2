import { NextResponse } from "next/server";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

interface IParams {
  blogId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { blogId } = params;
    if (!blogId) {
      return new NextResponse("Invalid ID", { status: 400 });
    }
    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });
    return NextResponse.json(blog);
  } catch (error: any) {
    console.log(error, "ERROR_SINGLE_BLOG_FETCH");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  try {
    const currentUser = await getUserFromClerkID();
    const { blogId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //delete the blog
    const deletedBlog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
    });

    // check existing blog
    if (!deletedBlog) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // delete the blog
    await prisma.post.delete({
      where: {
        id: blogId,
      },
    });

    // return the deleted conversation
    return NextResponse.json({
      status: "success",
      message: "blog deleted successfully",
    });
  } catch (error: any) {
    console.log(error, "ERROR_CONVERSATION DELETE");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// update the blog status
export async function PATCH(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getUserFromClerkID();
    const { blogId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //delete the blog
    const existingBlog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
    });

    // check existing blog
    if (!existingBlog) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // delete the blog
    await prisma.post.update({
      where: {
        id: blogId,
      },
      data: {
        published: true,
      },
    });

    // return the deleted conversation
    return NextResponse.json({
      status: "success",
      message: "blog status updated successfully",
    });
  } catch (error: any) {
    console.log(error, "ERROR_CONVERSATION DELETE");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
