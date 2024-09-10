import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();

  if (!user) return redirect("/");

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });

  console.log(match, "match data......");

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
        name: user.fullName,
        userAvatar: user.imageUrl,
      },
    });
  }

  redirect("/conversations");
};

const NewUser = async () => {
  await createNewUser();
  return <LoadingSpinner />;
};

export default NewUser;
