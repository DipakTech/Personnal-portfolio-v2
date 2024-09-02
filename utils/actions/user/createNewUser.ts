import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";

export const createNewUser = async ({
  id,
  email_addresses,
  first_name,
  last_name,
  image_url,
}: {
  id: string;
  email_addresses: any;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
}) => {
  await prisma.user.create({
    data: {
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      userAvatar: image_url,
    },
  });

  redirect("/");
};
