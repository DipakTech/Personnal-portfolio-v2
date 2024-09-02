import { prisma } from "@/utils/db";

export const getBlog = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: {
      slug,
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
      content: true,
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

  return post;
};
