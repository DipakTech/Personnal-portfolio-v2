import { prisma } from "@/utils/db";

export const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany({});
    return allUsers;
  } catch (error) {
    return [];
  }
};
