import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/server';
import AdminSidebar from "./AdminSidebar";

// Server components using auth must be rendered dynamically
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  const { data: session } = await auth.getSession();

  // If not authenticated, redirect to sign in
  if (!session?.user) {
    redirect('/api/auth/sign-in');
  }

  // Check if user has admin role (you may need to adjust based on your user data structure)
  const userRole = (session.user as any)?.role || 'viewer';
  if (userRole !== 'admin') {
    // Redirect non-admin users to home page
    redirect('/');
  }
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <a href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-lg font-semibold font-FoundersGrotesk text-gray-900">
                  Budget Ndio Story
                </span>
              </a>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-medium font-NeueMontreal text-gray-600">
                Admin Panel
              </span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Quick Links */}
              <a
                href="/"
                target="_blank"
                className="text-sm font-NeueMontreal text-gray-500 hover:text-gray-700 transition flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation - Client Component */}
        <AdminSidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
