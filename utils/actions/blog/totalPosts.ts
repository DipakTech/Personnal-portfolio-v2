// import redis from "@/lib/redisClient";
import { prisma } from "@/utils/db";

export async function totalPosts() {
  try {
    // const cachedTotalPosts = await redis.get("cached:totalPosts");
    // if (cachedTotalPosts) {
    //   return JSON.parse(cachedTotalPosts);
    // }

    const total = await prisma.post.count();

    // await redis.set("cached:totalPosts", JSON.stringify(total));

    return total;
  } catch (error: any) {
    return 0;
  }
}
