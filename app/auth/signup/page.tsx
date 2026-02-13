"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (provider: string) => {
    setIsLoading(true);
    setError("");

    try {
      await signIn(provider, {
        callbackUrl: "/",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="max-w-md w-full px-6 py-12 bg-[#161616] rounded-2xl border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-NeueMontreal text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-white/60 paragraph font-NeueMontreal">
            Sign up to start tracking budgets and making an impact
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500 paragraph font-NeueMontreal text-sm">
              {error}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => handleSignUp("google")}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-[#0a0a0a] rounded-full font-medium font-NeueMontreal hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#161616] text-white/40">
                or continue with email
              </span>
            </div>
          </div>

          <button
            onClick={() => handleSignUp("email")}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#212121] text-white rounded-full font-medium font-NeueMontreal hover:bg-[#323232] transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Continue with Email
              </>
            )}
          </button>
        </div>

        <p className="mt-8 text-center text-white/40 paragraph font-NeueMontreal text-sm">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-white/60 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-white/60 hover:underline">
            Privacy Policy
          </a>
        </p>

        <p className="mt-6 text-center text-white/60 paragraph font-NeueMontreal text-sm">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-[#00aa55] hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
