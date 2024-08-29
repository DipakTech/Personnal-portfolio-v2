import { prisma } from "@/utils/db";

export async function getBlog(id: string) {
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
    return blog;
  } catch (error: any) {
    return [];
  }
}
