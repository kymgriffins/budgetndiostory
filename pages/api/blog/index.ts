import { blogPosts } from "../../../lib/blog-data";
import {
  BlogPost,
  calculateReadTime,
  generateId,
  generateSlug,
} from "../../../lib/blog-types";
import { NextApiRequest, NextApiResponse } from "next";

// GET - Get all published blog posts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const { category, search, featured, status } = req.query;

        let posts = [...blogPosts];

        // Filter by status (default to published for public API)
        if (status === "all") {
          posts = posts;
        } else if (status) {
          posts = posts.filter((post) => post.status === status);
        } else {
          // Default to published for public requests
          posts = posts.filter((post) => post.status === "published");
        }

        // Filter by category
        if (category && typeof category === "string") {
          posts = posts.filter(
            (post) => post.category.toLowerCase() === category.toLowerCase(),
          );
        }

        // Search by title, excerpt, content, or tags
        if (search && typeof search === "string") {
          const query = search.toLowerCase();
          posts = posts.filter(
            (post) =>
              post.title.toLowerCase().includes(query) ||
              post.excerpt.toLowerCase().includes(query) ||
              post.content.toLowerCase().includes(query) ||
              post.tags.some((tag) => tag.toLowerCase().includes(query)),
          );
        }

        // Filter featured
        if (featured === "true") {
          posts = posts.filter((post) => post.featured);
        }

        res.status(200).json({
          success: true,
          count: posts.length,
          data: posts,
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, error: "Failed to fetch posts" });
      }
      break;

    case "POST":
      // Create a new blog post
      try {
        const {
          title,
          content,
          excerpt,
          category,
          author,
          thumbnail,
          tags,
          status,
          featured,
        } = req.body;

        // Validation
        if (!title || !content) {
          return res.status(400).json({
            success: false,
            error: "Title and content are required",
          });
        }

        const newPost: BlogPost = {
          id: generateId(),
          title,
          slug: generateSlug(title),
          excerpt: excerpt || content.substring(0, 150) + "...",
          content,
          category: category || "Analysis",
          author: author || {
            id: "default",
            name: "Budget Ndio Story Team",
            role: "Editorial Team",
          },
          thumbnail,
          tags: tags || [],
          status: status || "draft",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt:
            status === "published" ? new Date().toISOString() : undefined,
          readTime: calculateReadTime(content),
          featured: featured || false,
          seo: {
            title: `${title} | Budget Ndio Story`,
            description: excerpt || content.substring(0, 150),
            keywords: tags || [],
          },
        };

        blogPosts.push(newPost);

        res.status(201).json({
          success: true,
          data: newPost,
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, error: "Failed to create post" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
