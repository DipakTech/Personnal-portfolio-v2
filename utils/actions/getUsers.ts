import { getUserFromClerkID } from "../auth";
import { prisma } from "../db";

const getUsers = async () => {
  try {
    const session = await getUserFromClerkID();

    if (!session?.email) return [];

    // Get all users except the current user
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.email as string,
        },
      },
    });

    if (!users) return [];

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
