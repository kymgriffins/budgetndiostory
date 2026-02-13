import { NextResponse } from "next/server";
import storiesData from "@/mockdata/stories.json";

// GET all stories with optional filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let filteredStories = storiesData.stories;

    // Filter by category
    if (category && category !== "all") {
      filteredStories = filteredStories.filter(
        (story) => story.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredStories = filteredStories.filter(
        (story) =>
          story.title.toLowerCase().includes(searchLower) ||
          story.excerpt.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredStories,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}

// POST - Submit a new story
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content || !body.author) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Story submitted successfully",
      data: {
        id: `story-${Date.now()}`,
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
