import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminUsersClient from "./AdminUsersClient";

// Mock user data - would come from database in production
const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@budgetndiostory.org", role: "admin", status: "active", createdAt: "2024-01-01" },
  { id: "2", name: "Sarah Muthoni", email: "sarah@example.com", role: "editor", status: "active", createdAt: "2024-02-15" },
  { id: "3", name: "James Kariuki", email: "james@example.com", role: "author", status: "active", createdAt: "2024-03-20" },
  { id: "4", name: "Peninah L.", email: "peninah@example.com", role: "author", status: "active", createdAt: "2024-04-10" },
  { id: "5", name: "Dr. Achieng Ochieng", email: "achieng@example.com", role: "viewer", status: "active", createdAt: "2024-05-05" },
  { id: "6", name: "Samuel T.", email: "samuel@example.com", role: "viewer", status: "inactive", createdAt: "2024-06-12" },
  { id: "7", name: "Grace N.", email: "grace@example.com", role: "viewer", status: "active", createdAt: "2024-07-08" },
  { id: "8", name: "Moses W.", email: "moses@example.com", role: "viewer", status: "pending", createdAt: "2024-08-15" },
];

export default async function AdminUsersPage() {
  const session = await auth();

  // Check if user is authenticated
  if (!session) {
    redirect("/auth/signin?callbackUrl=/admin/users");
  }

  // Check if user has admin role only (users management is admin-only)
  const userRole = (session.user as any)?.role;
  if (userRole !== "admin") {
    redirect("/admin?error=admin_only");
  }

  return <AdminUsersClient initialUsers={mockUsers as any} />;
}
