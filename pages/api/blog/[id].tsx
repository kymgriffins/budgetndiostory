import { NextApiRequest, NextApiResponse } from "next";
import { blogPosts } from "../../../lib/blog-data";
import { BlogPost } from "../../../lib/blog-types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ success: false, error: "Invalid post ID" });
  }

  const postIndex = blogPosts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ success: false, error: "Post not found" });
  }

  switch (req.method) {
    case "GET":
      // Get a single blog post
      const post = blogPosts[postIndex];
      res.status(200).json({
        success: true,
        data: post,
      });
      break;

    case "PUT":
      // Update a blog post
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

        const existingPost = blogPosts[postIndex];

        // Only allow updates if post exists
        if (!existingPost) {
          return res
            .status(404)
            .json({ success: false, error: "Post not found" });
        }

        // Update the post
        const updatedPost: BlogPost = {
          ...existingPost,
          title: title || existingPost.title,
          slug:
            title && title !== existingPost.title
              ? title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")
              : existingPost.slug,
          excerpt: excerpt || existingPost.excerpt,
          content: content || existingPost.content,
          category: category || existingPost.category,
          author: author || existingPost.author,
          thumbnail:
            thumbnail !== undefined ? thumbnail : existingPost.thumbnail,
          tags: tags || existingPost.tags,
          status: status || existingPost.status,
          updatedAt: new Date().toISOString(),
          publishedAt:
            status === "published" && !existingPost.publishedAt
              ? new Date().toISOString()
              : existingPost.publishedAt,
          readTime: content
            ? Math.ceil(content.split(/\s+/).length / 200) + " min read"
            : existingPost.readTime,
          featured: featured !== undefined ? featured : existingPost.featured,
          seo: {
            ...existingPost.seo,
            title: title
              ? `${title} | Budget Ndio Story`
              : existingPost.seo.title,
            description: excerpt || existingPost.seo.description,
            keywords: tags || existingPost.seo.keywords,
          },
        };

        blogPosts[postIndex] = updatedPost;

        res.status(200).json({
          success: true,
          data: updatedPost,
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, error: "Failed to update post" });
      }
      break;

    case "DELETE":
      // Delete a blog post
      try {
        const deletedPost = blogPosts.splice(postIndex, 1)[0];

        res.status(200).json({
          success: true,
          message: "Post deleted successfully",
          data: deletedPost,
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, error: "Failed to delete post" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
