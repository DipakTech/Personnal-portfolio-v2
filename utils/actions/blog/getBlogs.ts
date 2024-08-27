import { prisma } from "@/utils/db";

export async function getBlogs() {
  try {
    const posts = await prisma.post.findMany({
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
        tags: true,
      },
    });

    return posts;
  } catch (error: any) {
    return [];
  }
}
