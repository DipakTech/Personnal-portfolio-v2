import { NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  try {
    const currentUser = await getUserFromClerkID();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // find the existing conversation
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    // check existing conversation
    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // delete the conversation
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:delete",
          existingConversation,
        );
      }
    });

    // return the deleted conversation
    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error, "ERROR_CONVERSATION DELETE");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
