import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getUserFromClerkID } from "@/utils/auth";
import { generateSlug } from "@/utils/generateSlug";
import { connect } from "http2";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      skip: 0,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        author: true,
        content: true,
        published: true,
        authorId: true,
        category: true,
        createdAt: true,
        id: true,
        title: true,
        updatedAt: true,
        slug: true,
        thumbnail: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.log(error, "ERROR_POSTS_FETCH");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getUserFromClerkID();
    const body = await request.json();
    const {
      content,
      tags,
      seoKeywords,
      categoryId,
      title,
      metaDescription,
      thumbnail,
    } = body;

    // Check if current user exists
    if (!currentUser?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Create a new post
    const postedData = await prisma.post.create({
      data: {
        title,
        metaDescription,
        slug: generateSlug(title),
        content,
        published: false,
        authorId: currentUser.id,
        postCategoryId: categoryId,
        tags: {
          create: tags.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
        seoKeywords: Array.isArray(seoKeywords)
          ? seoKeywords.join(",")
          : seoKeywords,
        thumbnail,
      },
    });

    return Response.json({
      success: true,
      message: "Post created successfully",
      post: postedData,
    });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
