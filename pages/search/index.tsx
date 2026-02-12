"use client";

import { NavbarLanding } from "@/components";
import { blogPosts } from "@/lib/blog-data";
import { podcasts } from "@/mockdata";
import { shorts } from "@/mockdata";
import { motion } from "framer-motion";
import { Search, ArrowRight, FileText, Mic, Video } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    articles: [] as typeof blogPosts,
    podcasts: [] as typeof podcasts,
    videos: [] as typeof shorts,
  });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (q) {
      setQuery(Array.isArray(q) ? q[0] : q);
      performSearch(Array.isArray(q) ? q[0] : q);
    }
  }, [q]);

  const performSearch = (searchQuery: string) => {
    setIsSearching(true);
    const query = searchQuery.toLowerCase();

    // Search articles
    const articleResults = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );

    // Search podcasts
    const podcastResults = podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(query) ||
        podcast.description.toLowerCase().includes(query) ||
        podcast.category.toLowerCase().includes(query)
    );

    // Search videos
    const videoResults = shorts.filter(
      (short) =>
        short.title.toLowerCase().includes(query) ||
        short.description.toLowerCase().includes(query) ||
        short.category.toLowerCase().includes(query)
    );

    setResults({
      articles: articleResults,
      podcasts: podcastResults,
      videos: videoResults,
    });
    setIsSearching(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const totalResults =
    results.articles.length + results.podcasts.length + results.videos.length;

  return (
    <>
      <Head>
        <title>Search | Budget Ndio Story</title>
        <meta
          name="description"
          content="Search across our budget stories, podcasts, and videos"
        />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen">
        <NavbarLanding />

        <main className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search Header */}
            <div className="text-center mb-12">
              <h1 className="font-FoundersGrotesk text-4xl md:text-5xl font-semibold mb-4">
                Search
              </h1>
              <p className="font-NeueMontreal text-white/60">
                Find budget stories, podcasts, videos, and more
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mb-12">
              <div className="relative max-w-2xl mx-auto">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for stories, podcasts, videos..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-24 text-white placeholder-white/40 focus:outline-none focus:border-[#00aa55] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#00aa55] text-black rounded-full font-NeueMontreal text-sm uppercase hover:bg-[#00cc66] transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Results */}
            {query && (
              <div className="space-y-8">
                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                  <p className="font-NeueMontreal text-white/60">
                    {isSearching
                      ? "Searching..."
                      : `${totalResults} result${totalResults !== 1 ? "s" : ""} for "${query}"`}
                  </p>
                </div>

                {totalResults === 0 && !isSearching && (
                  <div className="text-center py-16">
                    <Search size={48} className="mx-auto text-white/20 mb-4" />
                    <p className="font-NeueMontreal text-white/60 mb-4">
                      No results found for "{query}"
                    </p>
                    <p className="font-NeueMontreal text-white/40 text-sm">
                      Try different keywords or browse our content below
                    </p>
                    <div className="flex justify-center gap-4 mt-6">
                      <Link
                        href="/blog"
                        className="px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal text-sm uppercase hover:bg-[#00cc66] transition-colors"
                      >
                        Browse Stories
                      </Link>
                      <Link
                        href="/podcasts"
                        className="px-6 py-3 border border-white/30 rounded-full font-NeueMontreal text-sm uppercase hover:bg-white/10 transition-colors"
                      >
                        Browse Podcasts
                      </Link>
                    </div>
                  </div>
                )}

                {/* Articles Results */}
                {results.articles.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <FileText size={18} className="text-[#00aa55]" />
                      <h2 className="font-FoundersGrotesk text-xl">
                        Articles ({results.articles.length})
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      {results.articles.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className="group block bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00aa55] transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <span className="inline-block px-3 py-1 bg-[#00aa55]/10 text-[#00aa55] rounded-full text-xs font-NeueMontreal mb-2">
                                {post.category}
                              </span>
                              <h3 className="font-FoundersGrotesk text-lg group-hover:text-[#00aa55] transition-colors">
                                {post.title}
                              </h3>
                              <p className="font-NeueMontreal text-white/60 text-sm mt-1 line-clamp-2">
                                {post.excerpt}
                              </p>
                            </div>
                            <ArrowRight
                              size={20}
                              className="text-white/40 group-hover:text-[#00aa55] transition-colors"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Podcasts Results */}
                {results.podcasts.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Mic size={18} className="text-[#00aa55]" />
                      <h2 className="font-FoundersGrotesk text-xl">
                        Podcasts ({results.podcasts.length})
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      {results.podcasts.map((podcast) => (
                        <Link
                          key={podcast.id}
                          href={`/podcasts/${podcast.id}`}
                          className="group block bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00aa55] transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <span className="inline-block px-3 py-1 bg-[#00aa55]/10 text-[#00aa55] rounded-full text-xs font-NeueMontreal mb-2">
                                {podcast.category}
                              </span>
                              <h3 className="font-FoundersGrotesk text-lg group-hover:text-[#00aa55] transition-colors">
                                {podcast.title}
                              </h3>
                              <p className="font-NeueMontreal text-white/60 text-sm mt-1 line-clamp-2">
                                {podcast.excerpt}
                              </p>
                            </div>
                            <ArrowRight
                              size={20}
                              className="text-white/40 group-hover:text-[#00aa55] transition-colors"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Videos Results */}
                {results.videos.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Video size={18} className="text-[#00aa55]" />
                      <h2 className="font-FoundersGrotesk text-xl">
                        Videos ({results.videos.length})
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      {results.videos.map((video) => (
                        <Link
                          key={video.id}
                          href="/shorts"
                          className="group block bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00aa55] transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <span className="inline-block px-3 py-1 bg-[#00aa55]/10 text-[#00aa55] rounded-full text-xs font-NeueMontreal mb-2">
                                {video.category}
                              </span>
                              <h3 className="font-FoundersGrotesk text-lg group-hover:text-[#00aa55] transition-colors">
                                {video.title}
                              </h3>
                              <p className="font-NeueMontreal text-white/60 text-sm mt-1 line-clamp-2">
                                {video.description}
                              </p>
                            </div>
                            <ArrowRight
                              size={20}
                              className="text-white/40 group-hover:text-[#00aa55] transition-colors"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Initial State */}
            {!query && (
              <div className="text-center py-16">
                <p className="font-NeueMontreal text-white/60">
                  Enter a search term to find content
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
