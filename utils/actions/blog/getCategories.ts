import { prisma } from "@/utils/db";

export async function getCategories() {
  try {
    const categories = await prisma.postCategory.findMany({});
    return categories;
  } catch (error: any) {
    console.log(error, "ERROR_CATEGORIES_FETCH");
    return [];
  }
}
