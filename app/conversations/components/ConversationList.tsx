"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import { FullConversationType } from "@/types";
import useConversation from "@/hooks/useConversation";
import { useUser } from "@clerk/nextjs";

interface ConversationListProps {
  initialConversations: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialConversations,
  users,
}) => {
  const { user } = useUser();
  const [conversations, setConversations] = useState(initialConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return user?.emailAddresses[0].emailAddress;
  }, [user?.emailAddresses]);

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setConversations((prevConversations) => {
        if (find(prevConversations, { id: conversation.id }))
          return prevConversations;
        return [conversation, ...prevConversations];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setConversations((prevConversations) =>
        prevConversations.map((c) => {
          if (c.id === conversation.id) {
            return { ...c, messages: conversation.messages };
          }

          return c;
        }),
      );
    };

    const deleteHandler = (conversation: FullConversationType) => {
      setConversations((prevConversations) =>
        prevConversations.filter((c) => c.id !== conversation.id),
      );

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:delete", deleteHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:delete", deleteHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block w-full left-0",
        )}
      >
        <div className="">
          <div className="flex justify-between  px-5 py-4 border-b">
            <div className="text-2xl font-bold text-neutral-800 dark:text-white">
              Chats
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              title="Create a group chat"
              className="rounded-full p-2 bg-gray-100  text-gray-600 cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>

          {conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              conversation={conversation}
              selected={conversationId === conversation.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};
export default ConversationList;
