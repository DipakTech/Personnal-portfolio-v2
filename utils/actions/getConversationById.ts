import { getUserFromClerkID } from "../auth";
import { prisma } from "../db";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getUserFromClerkID();

    if (!currentUser) return null;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
