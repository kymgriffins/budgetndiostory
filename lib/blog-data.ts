// Blog Data Helpers - Now fetches from Neon Database
// These functions are used throughout the app to get blog data

import { getPublishedBlogPosts, getBlogPostBySlug as getBlogPostBySlugDb, getFeaturedBlogPosts, searchBlogPosts } from "./blog-db";
import { BlogPost } from "./blog-types";

/**
 * Get all published blog posts from database
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return await getPublishedBlogPosts();
}

/**
 * Get blog post by slug from database
 */
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const post = await getBlogPostBySlugDb(slug);
  return post || undefined;
}

/**
 * Get featured blog posts from database
 */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return await getFeaturedBlogPosts(3);
}

/**
 * Search blog posts from database
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  return await searchBlogPosts(query);
}

// Re-export blog posts as fallback for server-side rendering when DB is not available
// This is used as a fallback and should be replaced with database calls
export { blogPosts } from "./blog-data-dummy";
