import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

export const GET = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("No user id found");
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return user;
};
