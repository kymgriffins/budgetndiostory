"use client";

import { useState } from "react";

interface NewsletterProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: "light" | "dark";
  onSubscribe?: (email: string) => void;
}

export default function Newsletter({
  className = "",
  placeholder = "Your email",
  buttonText = "Subscribe",
  variant = "dark",
  onSubscribe,
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setMessage("Thank you for subscribing! Check your inbox for confirmation.");
      setEmail("");

      // Call optional callback
      if (onSubscribe) {
        onSubscribe(email);
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  const baseStyles =
    "flex gap-2 w-full transition-all duration-300 ease-in-out";

  const variantStyles = {
    light:
      "bg-transparent border-b border-[#21212155] focus-within:border-[#212121] text-[#212121]",
    dark:
      "bg-white/5 border-b border-white/10 focus-within:border-white/30 text-white",
  };

  const inputStyles = {
    light:
      "flex-1 bg-transparent text-[#212121] placeholder-[#21212155] focus:outline-none py-[10px] paragraph font-NeueMontreal",
    dark:
      "flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none py-[10px] paragraph font-NeueMontreal",
  };

  const buttonStyles = {
    light:
      "paragraph font-NeueMontreal text-[#212121] uppercase hover:underline whitespace-nowrap",
    dark:
      "paragraph font-NeueMontreal text-white uppercase hover:underline whitespace-nowrap",
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={`${baseStyles} ${variantStyles[variant]}`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === "loading" || status === "success"}
          className={inputStyles[variant]}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`${buttonStyles[variant]} ${
            status === "success" ? "text-[#00aa55]" : ""
          } ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {status === "loading"
            ? "..."
            : status === "success"
            ? "✓"
            : buttonText}
        </button>
      </form>

      {message && (
        <p
          className={`mt-2 text-sm font-NeueMontreal transition-opacity duration-300 ${
            status === "error"
              ? "text-red-500"
              : status === "success"
              ? "text-[#00aa55]"
              : "text-white/60"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
