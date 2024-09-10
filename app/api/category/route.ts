import { Knock } from "@knocklabs/node";

const knockClient = new Knock(process.env.KNOCK_SECRET_KEY);

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

    // redis.del("cached:categories");

    //
    // The key of the workflow (from Knock dashboard)
    // const knockNotification = await knockClient.workflows.trigger("new-user", {
    //   actor: {
    //     id: currentUser.id,
    //     name: currentUser.name ?? "",
    //     email: currentUser.email,
    //   },
    //   recipients: ["user_2kdm8tDJ1IMir6gZm02lb72EmGn"],

    // });

    // await knockClient.workflows.trigger("invoice-created", {
    //   recipients: [
    //     {
    //       id: currentUser.id,
    //       name: currentUser.name ?? "",
    //       email: currentUser.email,
    //     },
    //   ],
    //   data: {
    //     name: "Dipak Giri",
    //     email: "dipakgiri.dev@gmail.com",
    //     position: "software engineer",
    //   },
    // });

    //

    return NextResponse.json({
      success: "true",
      message: "category created successfully",
    });
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
