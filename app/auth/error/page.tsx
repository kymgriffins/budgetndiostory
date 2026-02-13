"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  const callbackUrl = searchParams?.get("callbackUrl");

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "Access was denied. You may not have permission to sign in.",
    Verification: "The verification link has expired or has already been used.",
    OAuthSignin: "Error starting the OAuth sign-in process.",
    OAuthCallback: "Error completing the OAuth sign-in process.",
    OAuthCreateAccount: "Could not create OAuth account.",
    EmailCreateAccount: "Could not create email account.",
    Callback: "Error in the OAuth callback handler.",
    OAuthAccountNotLinked:
      "This email is already associated with another account.",
    EmailSignin: "Error sending the email sign-in link.",
    CredentialsSignin:
      "Sign in failed. Please check your credentials.",
    SessionRequired: "Please sign in to access this page.",
    Default: "An unexpected error occurred.",
  };

  const getErrorMessage = (errorKey: string | null) => {
    if (!errorKey) return errorMessages.Default;
    return errorMessages[errorKey] || errorMessages.Default;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="max-w-md w-full px-6 py-12 bg-[#161616] rounded-2xl border border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-500/10 rounded-full">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold font-NeueMontreal text-white mb-2">
            Authentication Error
          </h1>
          <p className="text-white/60 paragraph font-NeueMontreal">
            {getErrorMessage(error || null)}
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/auth/signin"
            className="block w-full text-center px-6 py-3 bg-[#00aa55] text-white rounded-full font-medium font-NeueMontreal hover:bg-[#008844] transition-colors"
          >
            Try Again
          </a>

          {callbackUrl && (
            <a
              href={callbackUrl}
              className="block w-full text-center px-6 py-3 bg-[#212121] text-white rounded-full font-medium font-NeueMontreal hover:bg-[#323232] transition-colors"
            >
              Go Back Home
            </a>
          )}
        </div>

        <p className="mt-8 text-center text-white/40 paragraph font-NeueMontreal text-sm">
          Need help?{" "}
          <a href="/contact" className="text-white/60 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
