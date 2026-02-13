import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import AdminContentClient from "./AdminContentClient";

export default async function AdminContentPage() {
  const session = await auth();

  // Check if user is authenticated
  if (!session) {
    redirect("/auth/signin?callbackUrl=/admin/content");
  }

  // Check if user has admin or editor role
  const userRole = (session.user as any)?.role;
  if (userRole !== "admin" && userRole !== "editor") {
    redirect("/?error=unauthorized");
  }

  // Get search params for filtering
  const searchParams = new URLSearchParams();
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  return <AdminContentClient initialPosts={blogPosts as any} />;
}
