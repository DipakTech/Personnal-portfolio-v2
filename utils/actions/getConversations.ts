import { getUserFromClerkID } from "../auth";
import { prisma } from "../db";

const getConversations = async () => {
  try {
    const currentUser = await getUserFromClerkID();

    // Check if the current user exists
    if (!currentUser?.id) return [];

    // Get all conversations that include the current user
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        users: {
          some: {
            id: currentUser.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });

    return conversations || [];
  } catch (error) {
    console.error("Error fetching conversations:", error); // Log the error for debugging
    return []; // Return an empty array in case of an error
  }
};

export default getConversations;
