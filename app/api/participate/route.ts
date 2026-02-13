import { NextResponse } from "next/server";
import participateData from "@/mockdata/participate.json";

// GET participation data
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: participateData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch participation data" },
      { status: 500 }
    );
  }
}

// POST - Submit participation (poll, voice note, story, etc.)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.type) {
      return NextResponse.json(
        { success: false, error: "Missing participation type" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Participation submitted successfully",
      data: {
        id: `participation-${Date.now()}`,
        ...body,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
