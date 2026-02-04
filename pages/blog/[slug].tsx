import BlogComments from "@/components/BlogComments";
import { blogPosts, getPublishedPosts } from "@/lib/blog-data";
import { getCommentsByPostId } from "@/lib/blog-discussions";
import { BlogPost, CATEGORY_CONFIG, ThreadComment } from "@/lib/blog-types";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

// Generate static paths for all published posts
export async function getStaticPaths() {
  const posts = getPublishedPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

// Get static props for a single post
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = getPublishedPosts()
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Get comments for this post
  const comments = getCommentsByPostId(post.id);

  return {
    props: {
      post,
      relatedPosts,
      comments,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

export default function BlogPostPage({
  post,
  relatedPosts,
  comments: initialComments,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
  comments: ThreadComment[];
}) {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState<ThreadComment[]>(initialComments);

  // Simple markdown-like content renderer
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-[36px] font-FoundersGrotesk font-bold mt-[32px] mb-[16px] text-[#111]"
          >
            {line.replace("# ", "")}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-[28px] font-FoundersGrotesk font-semibold mt-[28px] mb-[14px] text-[#111]"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-[22px] font-FoundersGrotesk font-medium mt-[24px] mb-[12px] text-[#111]"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-[#00aa55] pl-[20px] py-[8px] my-[20px] text-[16px] font-NeueMontreal italic text-[#212121]/70 bg-[#f5f5f5] rounded-r-[8px]"
          >
            {line.replace("> ", "")}
          </blockquote>
        );
      }

      // Unordered lists
      if (line.startsWith("- ")) {
        return (
          <li
            key={index}
            className="ml-[24px] list-disc text-[16px] font-NeueMontreal text-[#212121]/70 mb-[8px]"
          >
            {line.replace("- ", "")}
          </li>
        );
      }

      // Numbered lists
      if (/^\d+\. /.test(line)) {
        return (
          <li
            key={index}
            className="ml-[24px] list-decimal text-[16px] font-NeueMontreal text-[#212121]/70 mb-[8px]"
          >
            {line.replace(/^\d+\. /, "")}
          </li>
        );
      }

      // Empty lines
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // Regular paragraphs
      return (
        <p
          key={index}
          className="text-[16px] font-NeueMontreal text-[#212121]/80 leading-[1.8] mb-[16px]"
        >
          {line}
        </p>
      );
    });
  };

  // If the page is still generating, show loading
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <div className="w-[48px] h-[48px] border-4 border-[#212121]/10 border-t-[#00aa55] rounded-full animate-spin mx-auto mb-[16px]"></div>
          <p className="text-[16px] font-NeueMontreal text-[#212121]/60">
            Loading article...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.seo.title || post.title} | Budget Ndio Story</title>
        <meta
          name="description"
          content={post.seo.description || post.excerpt}
        />
        <meta
          name="keywords"
          content={post.seo.keywords?.join(", ") || post.tags.join(", ")}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        ref={scrollerRef}
        data-scroll-container
        className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#fafafa] text-[#212121]"
        style={{ position: "relative" }}
      >
        <div ref={contentRef} data-scroll-content>
          {/* Spacer for fixed navbar */}
          <div className="h-[8vh]" />

          <a
            href="#article-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="article-content" className="w-full">
            {/* Breadcrumb */}
            <nav className="px-4 sm:px-[40px] md:px-[60px] py-[16px] max-w-[1200px] mx-auto">
              <ol className="flex items-center gap-[8px] text-[13px] font-NeueMontreal">
                <li>
                  <Link
                    href="/"
                    className="text-[#212121]/50 hover:text-[#212121] transition"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-[#212121]/30">/</li>
                <li>
                  <Link
                    href="/blog"
                    className="text-[#212121]/50 hover:text-[#212121] transition"
                  >
                    Blog
                  </Link>
                </li>
                <li className="text-[#212121]/30">/</li>
                <li className="text-[#212121]/70 truncate max-w-[200px]">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Article Header */}
            <article>
              <header className="px-4 sm:px-[40px] md:px-[60px] py-[20px] max-w-[900px] mx-auto">
                <div className="flex items-center gap-[12px] mb-[20px] flex-wrap">
                  <Link
                    href={`/blog?category=${post.category.toLowerCase()}`}
                    className={`px-[14px] py-[6px] rounded-full text-[12px] font-NeueMontreal font-medium bg-gradient-to-r ${CATEGORY_CONFIG[post.category as keyof typeof CATEGORY_CONFIG]?.color} text-white hover:opacity-90 transition`}
                  >
                    {post.category}
                  </Link>
                  <span className="text-[13px] font-NeueMontreal text-[#212121]/40">
                    {new Date(
                      post.publishedAt || post.createdAt,
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-[#212121]/20"></span>
                  <span className="text-[13px] font-NeueMontreal text-[#212121]/40">
                    {post.readTime}
                  </span>
                </div>

                <h1 className="text-[40px] sm:text-[48px] md:text-[56px] font-FoundersGrotesk font-bold text-[#111] leading-[1.1] mb-[24px]">
                  {post.title}
                </h1>

                <p className="text-[20px] sm:text-[22px] font-NeueMontreal text-[#212121]/60 leading-[1.6] mb-[32px] max-w-[800px]">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center gap-[16px] pb-[32px] border-b border-[#212121]/10">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-[48px] h-[48px] rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-[48px] h-[48px] rounded-full bg-[#212121]/10 flex items-center justify-center text-[20px] font-medium text-[#212121]/60">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-[16px] font-NeueMontreal font-medium text-[#212121]">
                      {post.author.name}
                    </p>
                    <p className="text-[13px] font-NeueMontreal text-[#212121]/50">
                      {post.author.role}
                    </p>
                  </div>
                </div>
              </header>

              {/* Featured Image Area */}
              <div className="px-4 sm:px-[40px] md:px-[60px] py-[20px] max-w-[1000px] mx-auto">
                <div className="relative h-[400px] sm:h-[500px] rounded-[24px] overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_CONFIG[post.category as keyof typeof CATEGORY_CONFIG]?.color || "from-gray-400 to-gray-600"}`}
                  ></div>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[120px] sm:text-[160px] opacity-30">
                      {CATEGORY_CONFIG[
                        post.category as keyof typeof CATEGORY_CONFIG
                      ]?.emoji || "📰"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="px-4 sm:px-[40px] md:px-[60px] py-[32px] max-w-[800px] mx-auto">
                <div className="prose prose-lg max-w-none">
                  {renderContent(post.content)}
                </div>

                {/* Tags */}
                <div className="mt-[48px] pt-[32px] border-t border-[#212121]/10">
                  <p className="text-[14px] font-NeueMontreal text-[#212121]/50 mb-[12px]">
                    Tagged with:
                  </p>
                  <div className="flex flex-wrap gap-[8px]">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?search=${tag}`}
                        className="px-[12px] py-[6px] rounded-full text-[13px] font-NeueMontreal bg-[#f5f5f5] text-[#212121]/60 hover:bg-[#212121] hover:text-white transition-all duration-300"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-[32px] flex items-center gap-[16px]">
                  <span className="text-[14px] font-NeueMontreal text-[#212121]/50">
                    Share this article:
                  </span>
                  <button className="w-[40px] h-[40px] rounded-full bg-[#212121]/5 hover:bg-[#212121] hover:text-white flex items-center justify-center transition-all duration-300">
                    <span className="text-[18px]">📤</span>
                  </button>
                  <button className="w-[40px] h-[40px] rounded-full bg-[#212121]/5 hover:bg-[#1877f2] hover:text-white flex items-center justify-center transition-all duration-300">
                    <span className="text-[18px]">f</span>
                  </button>
                  <button className="w-[40px] h-[40px] rounded-full bg-[#212121]/5 hover:bg-[#1da1f2] hover:text-white flex items-center justify-center transition-all duration-300">
                    <span className="text-[18px]">𝕏</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="px-4 sm:px-[40px] md:px-[60px] py-[60px] bg-white mt-[20px]">
                <div className="max-w-[1200px] mx-auto">
                  <h2 className="text-[28px] font-FoundersGrotesk font-semibold text-[#111] mb-[32px]">
                    Related Articles
                  </h2>
                  <div className="grid grid-cols-3 gap-[24px] lg:grid-cols-2 mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="group block rounded-[20px] overflow-hidden bg-[#fafafa] border border-[#212121]/8 hover:border-[#212121]/15 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                      >
                        <div className="relative h-[140px] overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_CONFIG[relatedPost.category as keyof typeof CATEGORY_CONFIG]?.color || "from-gray-400 to-gray-600"}`}
                          ></div>
                          <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                        <div className="p-[20px]">
                          <span className="text-[11px] font-NeueMontreal px-[8px] py-[4px] rounded-full bg-white/90 text-[#212121]/60">
                            {relatedPost.category}
                          </span>
                          <h3 className="mt-[12px] text-[18px] font-FoundersGrotesk font-medium text-[#111] leading-[1.2] group-hover:text-[#212121]/70 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="mt-[8px] text-[13px] font-NeueMontreal text-[#212121]/50 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Discussion / Comments */}
            <section className="px-4 sm:px-[40px] py-[40px] max-w-[900px] mx-auto">
              <BlogComments
                postId={post.id}
                comments={comments}
                onAddComment={(comment: ThreadComment) => {
                  setComments([comment, ...comments]);
                }}
                onReply={(parentId: string, content: string) => {
                  // Handle reply - in production, this would call an API
                  console.log("Reply to", parentId, ":", content);
                }}
                onReact={(commentId: string, reaction: string) => {
                  // Handle reaction - in production, this would call an API
                  console.log("React to", commentId, ":", reaction);
                }}
              />
            </section>

            {/* Back to Blog */}
            <section className="px-4 sm:px-[40px] py-[40px] text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-[8px] px-[24px] py-[14px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:opacity-90 transition hover:scale-[1.02]"
              >
                <span>←</span>
                <span>Back to Blog</span>
              </Link>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
