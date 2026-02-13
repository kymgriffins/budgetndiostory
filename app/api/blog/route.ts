import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/blog-data";
import { generateSlug, calculateReadTime, generateId, DEFAULT_AUTHOR } from "@/lib/blog-types";

// In-memory storage for blog posts (simulates database)
// In production, this would be replaced with actual database operations
let blogPostsStore = [...blogPosts];

// GET all blog posts with optional filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let filteredPosts = [...blogPostsStore];

    // Filter by status
    if (status && status !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post.status === status
      );
    }

    // Filter by category
    if (category && category !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post.category === category
      );
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    filteredPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: filteredPosts,
      total: filteredPosts.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content || !body.category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title, content, category" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    
    // Generate slug from title
    const slug = generateSlug(body.title);
    
    // Check if slug already exists
    const existingPost = blogPostsStore.find(post => post.slug === slug);
    const uniqueSlug = existingPost ? `${slug}-${Date.now()}` : slug;

    // Create new blog post
    const newPost = {
      id: generateId(),
      title: body.title,
      slug: uniqueSlug,
      excerpt: body.excerpt || body.content.substring(0, 150) + "...",
      content: body.content,
      category: body.category,
      author: body.author || DEFAULT_AUTHOR,
      tags: body.tags || [],
      status: body.status || "draft",
      createdAt: now,
      updatedAt: now,
      publishedAt: body.status === "published" ? now : undefined,
      readTime: calculateReadTime(body.content),
      featured: body.featured || false,
      seo: body.seo || {
        title: body.title,
        description: body.excerpt || body.content.substring(0, 150),
        keywords: body.tags || [],
      },
    };

    // Add to store
    blogPostsStore.unshift(newPost);

    return NextResponse.json({
      success: true,
      message: "Blog post created successfully",
      data: newPost,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
