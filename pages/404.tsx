import { MainFooter, NavbarLanding } from "@/components";
import { ArrowRight, Home, Search } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Budget Ndio Story</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Explore our budget stories, tracker, and educational resources."
        />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        <NavbarLanding />

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Number */}
            <h1 className="font-FoundersGrotesk text-[120px] lg:text-[180px] font-semibold leading-none tracking-tight text-white/10">
              404
            </h1>

            {/* Page Title */}
            <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-[-20px] lg:mt-[-40px]">
              Page Not Found
            </h2>

            <p className="font-NeueMontreal text-white/60 mt-4 text-lg max-w-lg mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been
              moved or deleted.
            </p>

            {/* Helpful Links */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
              >
                <Home size={16} />
                Go Home
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                <ArrowRight size={16} />
                Browse Stories
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                <Search size={16} />
                Search
              </Link>
            </div>

            {/* Popular Pages */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="font-NeueMontreal text-white/50 text-sm mb-4">
                Popular pages you might be interested in:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "Budget Tracker", href: "/tracker" },
                  { name: "Learn", href: "/learn" },
                  { name: "Services", href: "/services" },
                  { name: "Contact", href: "/contact" },
                  { name: "About", href: "/about" },
                ].map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full font-NeueMontreal text-sm hover:bg-white/10 transition-colors"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>

        <MainFooter />
      </div>
    </>
  );
}
