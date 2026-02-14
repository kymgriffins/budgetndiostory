import AdminSubscribersClient from "./AdminSubscribersClient";

// Mock subscriber data - would come from database in production
const mockSubscribers = [
  { id: "1", email: "john@example.com", name: "John Doe", status: "active", subscribedAt: "2024-01-15", source: "Website" },
  { id: "2", email: "sarah@example.com", name: "Sarah Smith", status: "active", subscribedAt: "2024-02-20", source: "Blog" },
  { id: "3", email: "james@example.com", name: "James Wilson", status: "active", subscribedAt: "2024-03-10", source: "Website" },
  { id: "4", email: "grace@example.com", name: "Grace Atieno", status: "active", subscribedAt: "2024-04-05", source: "Twitter" },
  { id: "5", email: "moses@example.com", name: "Moses Ochieng", status: "inactive", subscribedAt: "2024-05-12", source: "Website" },
  { id: "6", email: "alice@example.com", name: "Alice Wanjiku", status: "active", subscribedAt: "2024-06-18", source: "Newsletter" },
  { id: "7", email: "brian@example.com", name: "Brian Kiprop", status: "active", subscribedAt: "2024-07-22", source: "Website" },
  { id: "8", email: "cynthia@example.com", name: "Cynthia Akinyi", status: "active", subscribedAt: "2024-08-30", source: "Blog" },
  { id: "9", email: "david@example.com", name: "David Kariuki", status: "unsubscribed", subscribedAt: "2024-09-05", source: "Website" },
  { id: "10", email: "eve@example.com", name: "Eve Njeri", status: "active", subscribedAt: "2024-10-15", source: "Twitter" },
];

export default async function AdminSubscribersPage() {
  return <AdminSubscribersClient initialSubscribers={mockSubscribers as any} />;
}
