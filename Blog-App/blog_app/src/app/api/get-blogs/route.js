import connecttoDb from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connecttoDb();
    const extractAllBlogsFromDatabase = await Blog.find({});

    if (extractAllBlogsFromDatabase) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          data: extractAllBlogsFromDatabase,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Something went wrong",
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Something went wrong",
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
