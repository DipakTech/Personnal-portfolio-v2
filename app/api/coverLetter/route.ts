import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getUserFromClerkID } from "@/utils/auth";

export async function POST(request: Request) {
  try {
    const currentUser = await getUserFromClerkID();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    // Get data from body (single user & group)
    const { company, position, description, cv, coverLetter } = body;

    // Check if current user exists
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // if all data is there for group
    if (company && (!position || !description || !cv)) {
      return new NextResponse("All fields are required", {
        status: 400,
      });
    }

    const postedData = await prisma.coverLetter.create({
      data: {
        company,
        position,
        description,
        cv,
        coverLetter,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(postedData);
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const currentUser = await getUserFromClerkID();

    // Check if current user exists
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const myCoverLetters = await prisma.coverLetter.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: {
          equals: currentUser.id,
        },
      },
    });

    return NextResponse.json(myCoverLetters);
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
