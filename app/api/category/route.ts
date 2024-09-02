import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getUserFromClerkID } from "@/utils/auth";
import redis from "@/lib/redisClient";

export async function GET() {
  try {
    const categories = await prisma.postCategory.findMany({});

    return NextResponse.json(categories);
  } catch (error: any) {
    console.log(error, "ERROR_CATEGORIES_FETCH");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getUserFromClerkID();
    const body = await request.json();
    const { title, description } = body;

    // Check if current user exists
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create a new post
    await prisma.postCategory.create({
      data: {
        name: title,
      },
    });

    redis.del("cached:categories");

    return NextResponse.json({
      success: "true",
      message: "category created successfully",
    });
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
