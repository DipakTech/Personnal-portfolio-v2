import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getUserFromClerkID } from "@/utils/auth";

interface IParams {
  id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  try {
    const currentUser = await getUserFromClerkID();
    const { id } = params;

    // Check if current user exists
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedData = await prisma.coverLetter.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedData);
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
