import { blogPosts as initialPosts } from "@/lib/blog-data";
import { BlogPost, BlogCategory } from "@/lib/blog-types";
import Link from "next/link";
import AdminBlogClient from "./AdminBlogClient";

// Fetch posts from API
async function getBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog?status=all`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    // Fallback to static data if API fails
    return initialPosts;
  }
}

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  // Fetch blog posts from API
  const posts = await getBlogPosts();

  return (
    <>
      <div className="min-h-screen bg-[#f5f5f5]">
        {/* Header */}
        <header className="bg-white border-b border-[#212121]/10 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-[20px] font-FoundersGrotesk font-bold"
                >
                  Budget Ndio Story
                </Link>
                <span className="text-[#212121]/30">/</span>
                <span className="text-[18px] font-NeueMontreal text-[#212121]/70">
                  Blog Admin
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/blog"
                  className="px-4 py-2 text-[14px] font-NeueMontreal text-[#212121]/70 hover:text-[#212121] transition"
                >
                  View Blog
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-[16px] p-6 border border-[#212121]/8">
              <p className="text-[12px] font-NeueMontreal text-[#212121]/50 uppercase tracking-[0.1em]">
                Total Posts
              </p>
              <p className="text-[36px] font-FoundersGrotesk font-bold text-[#111] mt-2">
                {posts.length}
              </p>
            </div>
            <div className="bg-white rounded-[16px] p-6 border border-[#212121]/8">
              <p className="text-[12px] font-NeueMontreal text-[#212121]/50 uppercase tracking-[0.1em]">
                Published
              </p>
              <p className="text-[36px] font-FoundersGrotesk font-bold text-green-600 mt-2">
                {posts.filter((p: BlogPost) => p.status === "published").length}
              </p>
            </div>
            <div className="bg-white rounded-[16px] p-6 border border-[#212121]/8">
              <p className="text-[12px] font-NeueMontreal text-[#212121]/50 uppercase tracking-[0.1em]">
                Drafts
              </p>
              <p className="text-[36px] font-FoundersGrotesk font-bold text-yellow-600 mt-2">
                {posts.filter((p: BlogPost) => p.status === "draft").length}
              </p>
            </div>
            <div className="bg-white rounded-[16px] p-6 border border-[#212121]/8">
              <p className="text-[12px] font-NeueMontreal text-[#212121]/50 uppercase tracking-[0.1em]">
                Featured
              </p>
              <p className="text-[36px] font-FoundersGrotesk font-bold text-blue-600 mt-2">
                {posts.filter((p: BlogPost) => p.featured).length}
              </p>
            </div>
          </div>

          {/* Pass data to client component */}
          <AdminBlogClient posts={posts} />
        </main>
      </div>
    </>
  );
}
