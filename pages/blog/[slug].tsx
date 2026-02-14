"use client";

import { MainFooter, NavbarLanding } from "@/components";
import { BlogPost, CATEGORY_CONFIG } from "@/lib/blog-types";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageSquare,
  Share2,
  Tag,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { blogPosts } from "@/lib/blog-data-dummy";

export default function BlogPostPage() {
  const pathname = usePathname();

  // Extract slug from pathname: /blog/slug -> slug
  const slug = useMemo(() => {
    if (!pathname) return "";
    const segments = pathname.split("/").filter(Boolean);
    // Expecting ["blog", "slug"]
    if (segments.length >= 2) {
      return segments[segments.length - 1];
    }
    return "";
  }, [pathname]);

  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  // Try to fetch from API first, fall back to dummy data
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setPost(data.data);
        } else {
          // Fall back to dummy data
          const foundPost = blogPosts.find(
            (p) => p.slug.toLowerCase() === slug.toLowerCase()
          );
          setPost(foundPost);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        // Fall back to dummy data
        const foundPost = blogPosts.find(
          (p) => p.slug.toLowerCase() === slug.toLowerCase()
        );
        setPost(foundPost);
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [slug]);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!post || post.status !== "published") {
    return (
      <>
        <Head>
          <title>Post Not Found - Budget Ndio Story</title>
        </Head>
        <div className="bg-[#0a0a0a] text-white min-h-screen">
          <NavbarLanding />
          <main className="pt-32 pb-16 px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-6xl mb-4 block">😕</span>
              <h1 className="font-FoundersGrotesk text-3xl font-semibold mb-4">
                Post Not Found
              </h1>
              <p className="font-NeueMontreal text-white/60 mb-8">
                The article you're looking for doesn't exist or hasn't been
                published yet.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-NeueMontreal text-sm"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </div>
          </main>
          <MainFooter />
        </div>
      </>
    );
  }

  const categoryConfig =
    CATEGORY_CONFIG[post.category as keyof typeof CATEGORY_CONFIG];

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out "${post.title}" on Budget Ndio Story`;

  return (
    <>
      <Head>
        <title>{post.seo.title || post.title}</title>
        <meta
          name="description"
          content={post.seo.description || post.excerpt}
        />
        {post.seo.keywords && (
          <meta name="keywords" content={post.seo.keywords.join(", ")} />
        )}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta name="theme-color" content="#0a0a0a" />
        <link
          rel="canonical"
          href={`https://budgetndiostory.org/blog/${post.slug}`}
        />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen">
        {/* Navigation */}
        <NavbarLanding />

        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-12 px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Back Link */}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-NeueMontreal text-white/50 hover:text-white transition-colors mb-8"
                >
                  <ArrowLeft size={16} />
                  Back to Blog
                </Link>

                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-NeueMontreal bg-white/10 border border-white/10`}
                  >
                    <span className="text-lg">{categoryConfig?.emoji}</span>
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-FoundersGrotesk text-3xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="font-NeueMontreal text-lg text-white/60 leading-relaxed mb-8">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/10">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff2f55] to-[#00aa55] flex items-center justify-center font-FoundersGrotesk font-medium text-sm">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-NeueMontreal text-sm font-medium">
                        {post.author.name}
                      </p>
                      <p className="font-NeueMontreal text-xs text-white/50">
                        {post.author.role}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm font-NeueMontreal text-white/50">
                    <Calendar size={16} />
                    {new Date(
                      post.publishedAt || post.createdAt,
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  {/* Read Time */}
                  <div className="flex items-center gap-2 text-sm font-NeueMontreal text-white/50">
                    <Clock size={16} />
                    {post.readTime}
                  </div>

                  {/* Comments */}
                  <div className="flex items-center gap-2 text-sm font-NeueMontreal text-white/50">
                    <MessageSquare size={16} />
                    {post.commentCount || 0} comments
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Image Placeholder */}
          <section className="px-8 pb-12">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[400px] rounded-2xl overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${categoryConfig?.color || "from-gray-400 to-gray-600"}`}
                />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            </div>
          </section>

          {/* Content */}
          <section className="px-8 pb-16">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Article Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                  {post.content.split("\n").map((paragraph, i) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    // Headers
                    if (trimmed.startsWith("# ")) {
                      return (
                        <h1
                          key={i}
                          className="font-FoundersGrotesk text-3xl font-semibold mt-12 mb-6"
                        >
                          {trimmed.replace(/^#+\s*/, "")}
                        </h1>
                      );
                    }
                    if (trimmed.startsWith("## ")) {
                      return (
                        <h2
                          key={i}
                          className="font-FoundersGrotesk text-2xl font-semibold mt-10 mb-4"
                        >
                          {trimmed.replace(/^#+\s*/, "")}
                        </h2>
                      );
                    }
                    if (trimmed.startsWith("### ")) {
                      return (
                        <h3
                          key={i}
                          className="font-FoundersGrotesk text-xl font-semibold mt-8 mb-3"
                        >
                          {trimmed.replace(/^#+\s*/, "")}
                        </h3>
                      );
                    }

                    // Blockquotes
                    if (trimmed.startsWith("> ")) {
                      return (
                        <blockquote
                          key={i}
                          className="border-l-4 border-[#ff2f55] pl-6 my-6 italic text-white/70"
                        >
                          {trimmed.replace(/^>\s*/, "")}
                        </blockquote>
                      );
                    }

                    // Lists
                    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                      return (
                        <li key={i} className="ml-4 mb-2 text-white/80">
                          {trimmed.replace(/^[-*]\s*/, "")}
                        </li>
                      );
                    }

                    // Numbered lists
                    if (/^\d+\.\s/.test(trimmed)) {
                      return (
                        <li
                          key={i}
                          className="ml-4 mb-2 text-white/80 list-decimal"
                        >
                          {trimmed.replace(/^\d+\.\s*/, "")}
                        </li>
                      );
                    }

                    // Regular paragraphs
                    return (
                      <p
                        key={i}
                        className="font-NeueMontreal text-white/80 leading-relaxed mb-4"
                      >
                        {trimmed}
                      </p>
                    );
                  })}
                </article>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-3">
                    <Tag size={18} className="text-white/50" />
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${tag}`}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-NeueMontreal text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 flex items-center gap-4">
                  <span className="text-sm font-NeueMontreal text-white/50">
                    Share this article:
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setShowShare(!showShare)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-NeueMontreal text-white/70 hover:bg-white/10 transition-colors"
                    >
                      <Share2 size={16} />
                      Share
                    </button>
                    {showShare && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 mt-2 p-3 bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm"
                      >
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              window.open(
                                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                  shareText,
                                )}&url=${encodeURIComponent(shareUrl)}`,
                                "_blank",
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
                          >
                            Twitter
                          </button>
                          <button
                            onClick={() =>
                              window.open(
                                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                  shareUrl,
                                )}`,
                                "_blank",
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
                          >
                            Facebook
                          </button>
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(shareUrl)
                            }
                            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
                          >
                            Copy
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff2f55] to-[#00aa55] flex items-center justify-center font-FoundersGrotesk font-medium text-lg flex-shrink-0">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-FoundersGrotesk text-lg font-medium mb-1">
                        {post.author.name}
                      </p>
                      <p className="font-NeueMontreal text-sm text-[#ff2f55] mb-3">
                        {post.author.role}
                      </p>
                      {post.author.bio && (
                        <p className="font-NeueMontreal text-white/70 text-sm leading-relaxed">
                          {post.author.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Related Posts */}
          <section className="px-8 py-16 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-FoundersGrotesk text-2xl font-semibold mb-8">
                  More Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {blogPosts
                    .filter((p) => p.id !== post.id && p.status === "published")
                    .slice(0, 2)
                    .map((relatedPost) => {
                      const relatedConfig =
                        CATEGORY_CONFIG[
                          relatedPost.category as keyof typeof CATEGORY_CONFIG
                        ];
                      return (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all"
                        >
                          <div className="relative h-32 overflow-hidden">
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${relatedConfig?.color || "from-gray-400 to-gray-600"}`}
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute top-3 left-3">
                              <span className="px-2 py-1 rounded-full text-xs font-NeueMontreal bg-black/50 text-white/90">
                                {relatedPost.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-FoundersGrotesk text-lg font-medium group-hover:text-[#00aa55] transition-colors">
                              {relatedPost.title}
                            </h3>
                            <p className="mt-2 text-sm font-NeueMontreal text-white/60 line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <MainFooter />
      </div>
    </>
  );
}

// Per-page layout - co-located with page
BlogPostPage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>;
};
