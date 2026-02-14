import { NextResponse } from "next/server";
import { 
  getPublishedBlogPosts, 
  getFeaturedBlogPosts,
  getBlogPostsByCategory,
  searchBlogPosts,
  createBlogPost,
  getBlogCategories
} from "@/lib/blog-db";

// GET all blog posts with optional filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    
    let posts;
    
    // Get featured posts
    if (featured === "true") {
      posts = await getFeaturedBlogPosts(limit ? parseInt(limit) : 3);
      return NextResponse.json({
        success: true,
        data: posts,
        total: posts.length,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Search posts
    if (search) {
      posts = await searchBlogPosts(search, limit ? parseInt(limit) : 20);
      return NextResponse.json({
        success: true,
        data: posts,
        total: posts.length,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Filter by category
    if (category && category !== "all") {
      posts = await getBlogPostsByCategory(category, limit ? parseInt(limit) : undefined);
      return NextResponse.json({
        success: true,
        data: posts,
        total: posts.length,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Filter by status (for admin)
    if (status && status !== "all") {
      // For now, get published posts only (admin filtering would need admin auth)
      posts = await getPublishedBlogPosts(limit ? parseInt(limit) : undefined);
      return NextResponse.json({
        success: true,
        data: posts,
        total: posts.length,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Default: get all published posts
    posts = await getPublishedBlogPosts(limit ? parseInt(limit) : undefined);
    
    // Also get categories
    const categories = await getBlogCategories();
    
    return NextResponse.json({
      success: true,
      data: posts,
      categories,
      total: posts.length,
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
    if (!body.title || !body.content || !body.authorId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title, content, authorId" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    // Check if slug already exists and make it unique
    const existingPost = await getPublishedBlogPosts(100);
    let uniqueSlug = slug;
    let counter = 1;
    while (existingPost.some(p => p.slug === uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    // Create new blog post
    const newPost = await createBlogPost({
      title: body.title,
      slug: uniqueSlug,
      excerpt: body.excerpt || body.content.substring(0, 150) + "...",
      content: body.content,
      categoryId: body.categoryId || null,
      authorId: body.authorId,
      thumbnailUrl: body.thumbnailUrl,
      tags: body.tags || [],
      status: body.status || "draft",
      featured: body.featured || false,
      seoTitle: body.seoTitle || body.title,
      seoDescription: body.seoDescription || body.excerpt || body.content.substring(0, 150),
      seoKeywords: body.seoKeywords || body.tags || [],
    });

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
