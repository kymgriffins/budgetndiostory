// Blog Types for Budget Ndio Story CMS

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: Author;
  thumbnail?: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  readTime: string;
  featured?: boolean;
  seo: SEOMeta;
  // Threading/discussion system
  discussionEnabled?: boolean;
  commentCount?: number;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export type BlogCategory =
  | "Infrastructure"
  | "Health"
  | "Education"
  | "Youth"
  | "Water"
  | "Agriculture"
  | "Governance"
  | "Analysis"
  | "Opinion";

export interface SEOMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

// ============================================
// THREADING/DISCUSSION SYSTEM TYPES
// ============================================

export interface ThreadComment {
  id: string;
  postId: string;
  parentId: string | null; // null for top-level comments
  author: CommentAuthor;
  content: string;
  createdAt: string;
  updatedAt?: string;
  status: "approved" | "pending" | "flagged";
  upvotes: number;
  downvotes: number;
  replies?: ThreadComment[];
  isEdited: boolean;
}

export interface CommentAuthor {
  id: string;
  name: string;
  avatar?: string | null;
  role?: "user" | "moderator" | "admin";
  isVerified?: boolean;
}

export interface ThreadChannel {
  id: string;
  name: string;
  description: string;
  postId: string;
  isActive: boolean;
  createdAt: string;
}

export interface ThreadReaction {
  id: string;
  commentId: string;
  userId: string;
  reaction: "👍" | "❤️" | "💡" | "🤔" | "🔥" | "👏";
  createdAt: string;
}

export interface ThreadNotification {
  id: string;
  userId: string;
  type: "reply" | "mention" | "upvote" | "follow";
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

// Helper functions
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function generateCommentId(): string {
  return (
    "cmt_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  );
}

export function calculateTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

// Default author for blog posts
export const DEFAULT_AUTHOR: Author = {
  id: "default",
  name: "Budget Ndio Story Team",
  role: "Editorial Team",
  bio: "Investigative journalists and data analysts committed to budget transparency.",
};

// Category colors and emojis
export const CATEGORY_CONFIG: Record<
  BlogCategory,
  { color: string; emoji: string }
> = {
  Infrastructure: { color: "from-orange-400 to-red-500", emoji: "🛣️" },
  Health: { color: "from-green-400 to-emerald-600", emoji: "🏥" },
  Education: { color: "from-amber-400 to-orange-500", emoji: "📚" },
  Youth: { color: "from-purple-400 to-violet-600", emoji: "👥" },
  Water: { color: "from-cyan-400 to-blue-500", emoji: "💧" },
  Agriculture: { color: "from-lime-400 to-green-500", emoji: "🌾" },
  Governance: { color: "from-gray-400 to-gray-600", emoji: "🏛️" },
  Analysis: { color: "from-blue-400 to-indigo-500", emoji: "📊" },
  Opinion: { color: "from-pink-400 to-rose-500", emoji: "💭" },
};
