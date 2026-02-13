import type { Metadata } from "next";
import "@/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Budget Ndio Story",
  description: "Kenyan budget transparency platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
