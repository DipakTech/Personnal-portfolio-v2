"use client";

import { getUserFromClerkID } from "@/utils/auth";
import { useState } from "react";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import useConversation from "./useConversation";
import { FullConversationType } from "@/types";

const useConversionList = (
  initialConversations: FullConversationType[],
  pusherKey?: string,
) => {
  const [conversations, setConversations] = useState(initialConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

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

  return {
    conversations,
    isModalOpen,
    setIsModalOpen,
    isOpen,
    conversationId,
  };
};

export default useConversionList;
