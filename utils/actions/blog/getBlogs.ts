import redis from "@/lib/redisClient";
import { prisma } from "@/utils/db";

export async function getBlogs() {
  try {
    // check redis if data is cached
    const cachedPosts = await redis.get("cached:posts");

    if (cachedPosts) {
      return JSON.parse(cachedPosts);
    }

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

    await redis.set("cached:posts", JSON.stringify(posts));

    return posts;
  } catch (error: any) {
    return [];
  }
}
