import { prisma } from "./db";
import { auth, User } from "@clerk/nextjs/server";

export const getUserFromClerkID = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("No user id found");
  const user = await prisma.user.findUnique({
    where: {
      clerkId: "user_2lscpjx8nNcprRxHIrbkiwlxS3Q",
    },
    select: {
      id: true,
      email: true,
      userAvatar: true,
      name: true,
    },
  });

  return user;
};

export const syncNewUser = async (clerkUser: User) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (!existingUser) {
    const email = clerkUser.emailAddresses[0].emailAddress;
    // const { subscriptionId, customerId } = await createAndSubNewCustomer(email)

    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email,
        // account: {
        //   create: {
        //     // stripeCustomerId: customerId,
        //     // stripeSubscriptionId: subscriptionId,
        //   },
        // },
      },
    });
  }
};
