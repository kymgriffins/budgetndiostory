"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") {
    return (
      <span className="paragraph font-medium font-NeueMontreal text-secondry">
        Loading...
      </span>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="paragraph font-medium font-NeueMontreal text-secondry hidden sm:hidden md:block">
          {session.user?.name || session.user?.email}
        </span>
        <button
          onClick={() => {
            setIsLoading(true);
            signOut();
          }}
          disabled={isLoading}
          className="px-4 py-2 bg-[#212121] text-white text-sm font-medium font-NeueMontreal rounded-full hover:bg-[#424242] transition-colors disabled:opacity-50"
        >
          {isLoading ? "..." : "Logout"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        setIsLoading(true);
        signIn("google");
      }}
      disabled={isLoading}
      className="px-4 py-2 bg-[#00aa55] text-white text-sm font-medium font-NeueMontreal rounded-full hover:bg-[#008844] transition-colors disabled:opacity-50"
    >
      {isLoading ? "..." : "Login with Google"}
    </button>
  );
}
