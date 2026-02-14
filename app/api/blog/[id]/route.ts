import { NextResponse } from "next/server";
import { 
  getBlogPostById, 
  getBlogPostBySlug,
  updateBlogPost, 
  deleteBlogPost 
} from "@/lib/blog-db";

// GET single blog post by ID or slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Try to find by ID first, then by slug
    let post = await getBlogPostById(id);
    
    if (!post) {
      // Try by slug
      post = await getBlogPostBySlug(id);
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT - Update a blog post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if post exists
    const existingPost = await getBlogPostById(id);
    
    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Update the post
    const updatedPost = await updateBlogPost(id, {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      categoryId: body.categoryId,
      thumbnailUrl: body.thumbnailUrl,
      tags: body.tags,
      status: body.status,
      featured: body.featured,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      seoKeywords: body.seoKeywords,
    });

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      data: updatedPost,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if post exists
    const existingPost = await getBlogPostById(id);
    
    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Delete the post
    await deleteBlogPost(id);

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
