import { blogPosts } from "@/lib/blog-data";
import AdminContentClient from "./AdminContentClient";

export default async function AdminContentPage() {
  // Get search params for filtering
  const searchParams = new URLSearchParams();
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  return <AdminContentClient initialPosts={blogPosts as any} />;
}
