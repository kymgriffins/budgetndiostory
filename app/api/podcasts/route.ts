import { NextResponse } from "next/server";
import podcastsData from "@/mockdata/podcasts.json";

// GET all podcasts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");

    let filteredPodcasts = podcastsData.podcasts;

    // Filter featured
    if (featured === "true") {
      filteredPodcasts = filteredPodcasts.filter((podcast) => podcast.isFeatured);
    }

    // Filter by category
    if (category) {
      filteredPodcasts = filteredPodcasts.filter(
        (podcast) => podcast.category.toLowerCase() === category.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredPodcasts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch podcasts" },
      { status: 500 }
    );
  }
}

// POST - Submit a podcast subscription or feedback
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.email && !body.message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Submission received successfully",
      data: {
        id: `podcast-sub-${Date.now()}`,
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
