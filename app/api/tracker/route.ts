import { NextResponse } from "next/server";
import unifiedTrackerData from "@/mockdata/tracker-unified.json";

// GET all tracker data
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: unifiedTrackerData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch tracker data" },
      { status: 500 }
    );
  }
}

// POST - Add new project/update
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.category || !body.budget) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, this would save to database
    // For now, we return success with the submitted data
    return NextResponse.json({
      success: true,
      message: "Project submitted successfully",
      data: {
        id: `project-${Date.now()}`,
        ...body,
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
