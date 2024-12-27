// import redis from "@/lib/redisClient";
import { prisma } from "@/utils/db";

export async function getCategories() {
  try {
    // set categories to redis
    // const cachedCategories = await redis.get("cached:categories");

    // if (cachedCategories) {
    //   return JSON.parse(cachedCategories);
    // }

    const categories = await prisma.postCategory.findMany({});
    // await redis.set("cached:categories", JSON.stringify(categories));
    return categories;
  } catch (error: any) {
    console.log(error, "ERROR_CATEGORIES_FETCH");
    return [];
  }
}
