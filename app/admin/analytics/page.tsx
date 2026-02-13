import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminAnalyticsClient from "./AdminAnalyticsClient";

export default async function AdminAnalyticsPage() {
  const session = await auth();

  // Check if user is authenticated
  if (!session) {
    redirect("/auth/signin?callbackUrl=/admin/analytics");
  }

  // Check if user has admin or editor role
  const userRole = (session.user as any)?.role;
  if (userRole !== "admin" && userRole !== "editor") {
    redirect("/?error=unauthorized");
  }

  return <AdminAnalyticsClient />;
}
