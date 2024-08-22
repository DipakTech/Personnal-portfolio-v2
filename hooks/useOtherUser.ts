import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";
// import { getUserFromClerkID } from "@/utils/auth";
import { useUser } from "@clerk/nextjs";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] },
) => {
  const session = useUser();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.user?.emailAddresses[0].emailAddress;

    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail,
    );

    return otherUser[0];
  }, [conversation.users, session?.user?.emailAddresses]);

  return otherUser;
};

export default useOtherUser;
