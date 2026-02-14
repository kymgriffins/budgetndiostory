/**
 * Blog Database Helpers
 * 
 * Functions to fetch blog posts from the Neon database.
 * These replace the dummy data with real database queries.
 */

import { sql } from "@/lib/db";
import { BlogPost, Author, BlogCategory } from "./blog-types";

// Type for database blog post row
interface DbBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category_id: string | null;
  author_id: string;
  thumbnail_url: string | null;
  tags: string[] | null;
  status: string;
  featured: boolean;
  view_count: number;
  read_time_minutes: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  og_image_url: string | null;
  discussion_enabled: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  author_name: string | null;
  author_image: string | null;
  category_name: string | null;
  category_slug: string | null;
  category_emoji: string | null;
  comment_count: number | null;
}

// Type for database author row
interface DbAuthor {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string | null;
}

/**
 * Get all published blog posts
 */
export async function getPublishedBlogPosts(limit?: number): Promise<BlogPost[]> {
  try {
    let query = sql`
      SELECT 
        bp.*,
        u.name as author_name,
        u.image as author_image,
        bc.name as category_name,
        bc.slug as category_slug,
        bc.emoji as category_emoji,
        COUNT(DISTINCT bc2.id) as comment_count
      FROM blog_posts bp
      LEFT JOIN users u ON u.id = bp.author_id
      LEFT JOIN blog_categories bc ON bc.id = bp.category_id
      LEFT JOIN blog_comments bc2 ON bc2.post_id = bp.id AND bc2.status = 'approved'
      WHERE bp.status = 'published'
      GROUP BY bp.id, u.name, u.image, bc.name, bc.slug, bc.emoji
      ORDER BY bp.published_at DESC
    `;
    
    if (limit) {
      query = sql`${query} LIMIT ${limit}`;
    }
    
    const rows = await query;
    const posts = rows as unknown as DbBlogPost[];
    
    return posts.map(mapDbToBlogPost);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const rows = await sql`
      SELECT 
        bp.*,
        u.name as author_name,
        u.image as author_image,
        bc.name as category_name,
        bc.slug as category_slug,
        bc.emoji as category_emoji,
        COUNT(DISTINCT bc2.id) as comment_count
      FROM blog_posts bp
      LEFT JOIN users u ON u.id = bp.author_id
      LEFT JOIN blog_categories bc ON bc.id = bp.category_id
      LEFT JOIN blog_comments bc2 ON bc2.post_id = bp.id AND bc2.status = 'approved'
      WHERE bp.slug = ${slug}
      GROUP BY bp.id, u.name, u.image, bc.name, bc.slug, bc.emoji
      LIMIT 1
    `;
    
    const posts = rows as unknown as DbBlogPost[];
    
    if (posts.length === 0) {
      return null;
    }
    
    return mapDbToBlogPost(posts[0]);
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

/**
 * Get a single blog post by ID
 */
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const rows = await sql`
      SELECT 
        bp.*,
        u.name as author_name,
        u.image as author_image,
        bc.name as category_name,
        bc.slug as category_slug,
        bc.emoji as category_emoji,
        COUNT(DISTINCT bc2.id) as comment_count
      FROM blog_posts bp
      LEFT JOIN users u ON u.id = bp.author_id
      LEFT JOIN blog_categories bc ON bc.id = bp.category_id
      LEFT JOIN blog_comments bc2 ON bc2.post_id = bp.id AND bc2.status = 'approved'
      WHERE bp.id = ${id}
      GROUP BY bp.id, u.name, u.image, bc.name, bc.slug, bc.emoji
      LIMIT 1
    `;
    
    const posts = rows as unknown as DbBlogPost[];
    
    if (posts.length === 0) {
      return null;
    }
    
    return mapDbToBlogPost(posts[0]);
  } catch (error) {
    console.error("Error fetching blog post by ID:", error);
    return null;
  }
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const rows = await sql`
      SELECT 
        bp.*,
        u.name as author_name,
        u.image as author_image,
        bc.name as category_name,
        bc.slug as category_slug,
        bc.emoji as category_emoji,
        COUNT(DISTINCT bc2.id) as comment_count
      FROM blog_posts bp
      LEFT JOIN users u ON u.id = bp.author_id
      LEFT JOIN blog_categories bc ON bc.id = bp.category_id
      LEFT JOIN blog_comments bc2 ON bc2.post_id = bp.id AND bc2.status = 'approved'
      WHERE bp.status = 'published' AND bp.featured = true
      GROUP BY bp.id, u.name, u.image, bc.name, bc.slug, bc.emoji
      ORDER BY bp.published_at DESC
      LIMIT ${limit}
    `;
    
    const posts = rows as unknown as DbBlogPost[];
    
    return posts.map(mapDbToBlogPost);
  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    return [];
  }
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(categorySlug: string, limit?: number): Promise<BlogPost[]> {
  try {
    let query = sql`
      SELECT 
        bp.*,
        u.name as author_name,
        u.image as author_image,
        bc.name as category_name,
        bc.slug as category_slug,
        bc.emoji as category_emoji,
        COUNT(DISTINCT bc2.id) as comment_count
      FROM blog_posts bp
      LEFT JOIN users u ON u.id = bp.author_id
      LEFT JOIN blog_categories bc ON bc.id = bp.category_id
      LEFT JOIN blog_comments bc2 ON bc2.post_id = bp.id AND bc2.status = 'approved'
      WHERE bp.status = 'published' AND bc.slug = ${categorySlug}
      GROUP BY bp.id, u.name, u.image, bc.name, bc.slug, bc.emoji
      ORDER BY bp.published_at DESC
    `;
    
    if (limit) {
      query = sql`${query} LIMIT ${limit}`;
    }
    
    const rows = await query;
    const posts = rows as unknown as DbBlogPost[];
    
    return posts.map(mapDbToBlogPost);
  } catch (error) {
    console.error("Error fetching blog posts by category:", error);
    return [];
  }
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(searchQuery: string, limit: number = 20): Promise<BlogPost[]> {
  try {
    const searchPattern = `%${searchQuery}%`;
    
    const rows = await sql`
      SELECT 
        bp.*,
        u.name as author_name,
        u.image as author_image,
        bc.name as category_name,
        bc.slug as category_slug,
        bc.emoji as category_emoji,
        COUNT(DISTINCT bc2.id) as comment_count
      FROM blog_posts bp
      LEFT JOIN users u ON u.id = bp.author_id
      LEFT JOIN blog_categories bc ON bc.id = bp.category_id
      LEFT JOIN blog_comments bc2 ON bc2.post_id = bp.id AND bc2.status = 'approved'
      WHERE bp.status = 'published' 
        AND (bp.title ILIKE ${searchPattern} 
          OR bp.excerpt ILIKE ${searchPattern} 
          OR bp.content ILIKE ${searchPattern}
          OR bp.tags::text ILIKE ${searchPattern})
      GROUP BY bp.id, u.name, u.image, bc.name, bc.slug, bc.emoji
      ORDER BY bp.published_at DESC
      LIMIT ${limit}
    `;
    
    const posts = rows as unknown as DbBlogPost[];
    
    return posts.map(mapDbToBlogPost);
  } catch (error) {
    console.error("Error searching blog posts:", error);
    return [];
  }
}

/**
 * Get all blog categories
 */
export async function getBlogCategories() {
  try {
    const rows = await sql`
      SELECT * FROM blog_categories 
      WHERE is_active = true 
      ORDER BY sort_order ASC
    `;
    
    return rows;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

/**
 * Map database row to BlogPost type
 */
function mapDbToBlogPost(row: DbBlogPost): BlogPost {
  const author: Author = {
    id: row.author_id,
    name: row.author_name || "Budget Ndio Story Team",
    role: "Author",
    avatar: row.author_image || undefined,
  };

  const category = (row.category_name as BlogCategory) || "Analysis";
  
  // Calculate read time text
  const readTime = `${row.read_time_minutes || 5} min read`;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || row.content.substring(0, 150) + "...",
    content: row.content,
    category,
    author,
    thumbnail: row.thumbnail_url || undefined,
    tags: row.tags || [],
    status: row.status as "draft" | "published" | "archived",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at || undefined,
    readTime,
    featured: row.featured,
    discussionEnabled: row.discussion_enabled,
    commentCount: row.comment_count || 0,
    seo: {
      title: row.seo_title || row.title,
      description: row.seo_description || row.excerpt || undefined,
      keywords: row.seo_keywords || undefined,
      ogImage: row.og_image_url || undefined,
    },
  };
}

/**
 * Create a new blog post (for admin use)
 */
export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  categoryId?: string;
  authorId: string;
  thumbnailUrl?: string;
  tags?: string[];
  status?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}) {
  try {
    const now = new Date().toISOString();
    const readTimeMinutes = Math.ceil(data.content.split(/\s+/).length / 200);
    
    const result = await sql`
      INSERT INTO blog_posts (
        title, slug, excerpt, content, category_id, author_id,
        thumbnail_url, tags, status, featured, read_time_minutes,
        seo_title, seo_description, seo_keywords, published_at, created_at, updated_at
      ) VALUES (
        ${data.title}, ${data.slug}, ${data.excerpt}, ${data.content},
        ${data.categoryId}, ${data.authorId}, ${data.thumbnailUrl},
        ${data.tags}, ${data.status || 'draft'}, ${data.featured || false},
        ${readTimeMinutes}, ${data.seoTitle}, ${data.seoDescription},
        ${data.seoKeywords}, ${data.status === 'published' ? now : null},
        ${now}, ${now}
      )
      RETURNING *
    `;
    
    return result as any[];
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
}

/**
 * Update a blog post (for admin use)
 */
export async function updateBlogPost(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categoryId: string;
    thumbnailUrl: string;
    tags: string[];
    status: string;
    featured: boolean;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
  }>
) {
  try {
    const now = new Date().toISOString();
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (data.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(data.title);
    }
    if (data.slug !== undefined) {
      updates.push(`slug = $${paramIndex++}`);
      values.push(data.slug);
    }
    if (data.excerpt !== undefined) {
      updates.push(`excerpt = $${paramIndex++}`);
      values.push(data.excerpt);
    }
    if (data.content !== undefined) {
      updates.push(`content = $${paramIndex++}`);
      values.push(data.content);
      updates.push(`read_time_minutes = $${paramIndex++}`);
      values.push(Math.ceil(data.content.split(/\s+/).length / 200));
    }
    if (data.categoryId !== undefined) {
      updates.push(`category_id = $${paramIndex++}`);
      values.push(data.categoryId);
    }
    if (data.thumbnailUrl !== undefined) {
      updates.push(`thumbnail_url = $${paramIndex++}`);
      values.push(data.thumbnailUrl);
    }
    if (data.tags !== undefined) {
      updates.push(`tags = $${paramIndex++}`);
      values.push(data.tags);
    }
    if (data.status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(data.status);
      if (data.status === 'published') {
        updates.push(`published_at = $${paramIndex++}`);
        values.push(now);
      }
    }
    if (data.featured !== undefined) {
      updates.push(`featured = $${paramIndex++}`);
      values.push(data.featured);
    }
    if (data.seoTitle !== undefined) {
      updates.push(`seo_title = $${paramIndex++}`);
      values.push(data.seoTitle);
    }
    if (data.seoDescription !== undefined) {
      updates.push(`seo_description = $${paramIndex++}`);
      values.push(data.seoDescription);
    }
    if (data.seoKeywords !== undefined) {
      updates.push(`seo_keywords = $${paramIndex++}`);
      values.push(data.seoKeywords);
    }
    
    updates.push(`updated_at = $${paramIndex++}`);
    values.push(now);
    
    values.push(id);
    
    const query = `
      UPDATE blog_posts 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;
    
    const result = await (sql as any).query(query, values);
    return result[0] as any;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
}

/**
 * Delete a blog post (for admin use)
 */
export async function deleteBlogPost(id: string) {
  try {
    await sql`DELETE FROM blog_posts WHERE id = ${id}`;
    return true;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
}
