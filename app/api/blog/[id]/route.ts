import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/blog-data";
import { calculateReadTime } from "@/lib/blog-types";

// In-memory storage for blog posts (simulates database)
let blogPostsStore = [...blogPosts];

// GET single blog post by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = blogPostsStore.find((post) => post.id === id);

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

    const postIndex = blogPostsStore.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    const existingPost = blogPostsStore[postIndex];
    const now = new Date().toISOString();

    // Update the post
    const updatedPost = {
      ...existingPost,
      title: body.title || existingPost.title,
      excerpt: body.excerpt || existingPost.excerpt,
      content: body.content || existingPost.content,
      category: body.category || existingPost.category,
      author: body.author || existingPost.author,
      tags: body.tags || existingPost.tags,
      status: body.status || existingPost.status,
      featured: body.featured !== undefined ? body.featured : existingPost.featured,
      seo: body.seo || existingPost.seo,
      updatedAt: now,
      // Set publishedAt if publishing for the first time
      publishedAt: body.status === "published" && !existingPost.publishedAt 
        ? now 
        : existingPost.publishedAt,
      // Recalculate read time if content changed
      readTime: body.content 
        ? calculateReadTime(body.content) 
        : existingPost.readTime,
    };

    blogPostsStore[postIndex] = updatedPost;

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
    const postIndex = blogPostsStore.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Remove the post from the store
    const deletedPost = blogPostsStore.splice(postIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
      data: deletedPost,
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
