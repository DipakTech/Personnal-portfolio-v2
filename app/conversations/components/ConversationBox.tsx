"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FullConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import AvatarGroup from "../[conversationId]/components/components/AvatarGroup";
import Avatar from "../[conversationId]/components/components/Avatar";
import { cn } from "@/lib/utils";

interface ConversationBoxProps {
  conversation: FullConversationType;
  selected: boolean;
  session?: {
    id: string;
    email: string;
  } | null;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  conversation,
  selected,
  session,
}) => {
  const otherUser = useOtherUser(conversation);

  console.log(otherUser, "other user..");

  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(() => {
    return session?.email;
  }, [session?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a chat...";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-full relative flex items-center space-x-3  hover:bg-neutral-100 dark:bg-[#0F172A] rounded-lg transition cursor-pointer p-3",
        selected ? "bg-neutral-100" : "bg-[#2F3C3D]",
      )}
    >
      {conversation.isGroup ? (
        <AvatarGroup users={conversation.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900 dark:text-white">
              {conversation.name || otherUser.name}
            </p>

            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 dark:text-white">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>

          <p
            className={cn(
              "truncate text-sm",
              hasSeen
                ? "text-gray-500 dark:text-white/50"
                : "text-black dark:text-white/50 font-medium",
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ConversationBox;
