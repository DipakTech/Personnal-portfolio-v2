"use server";
import { prisma } from "@/utils/db";

export async function getBlogsByCategory(category: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        category: {
          name: category,
        },
      },
      skip: 0,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            userAvatar: true,
          },
        },
        published: true,
        authorId: true,
        category: true,
        createdAt: true,
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return posts;
  } catch (error: any) {
    return [];
  }
}
export async function searchPostByTitle(title: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: title,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      skip: 0,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            userAvatar: true,
          },
        },
        published: true,
        authorId: true,
        category: true,
        createdAt: true,
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return posts;
  } catch (error: any) {
    return [];
  }
}
