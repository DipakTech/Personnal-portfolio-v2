import { BlogInfo, main } from "@/lib/groqAgent";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const blogInfo: BlogInfo = await request.json();
  const content = await main(blogInfo);
  return NextResponse.json(content);
}
