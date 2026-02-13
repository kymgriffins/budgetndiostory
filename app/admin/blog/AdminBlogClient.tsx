"use client";

import { BlogPost, BlogCategory } from "@/lib/blog-types";
import Link from "next/link";
import { useState } from "react";

interface AdminBlogClientProps {
  posts: BlogPost[];
}

export default function AdminBlogClient({ posts: initialPosts }: AdminBlogClientProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Analysis" as BlogCategory,
    author: {
      id: "default",
      name: "Budget Ndio Story Team",
      role: "Editorial Team",
    },
    tags: "",
    status: "draft" as "draft" | "published" | "archived",
    featured: false,
  });

  const categories: BlogCategory[] = [
    "Infrastructure",
    "Health",
    "Education",
    "Youth",
    "Water",
    "Agriculture",
    "Governance",
    "Analysis",
    "Opinion",
  ];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Create a new post
  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setPosts([result.data, ...posts]);
        resetForm();
        alert("Post created successfully!");
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
    setLoading(false);
  };

  // Update an existing post
  const handleUpdate = async () => {
    if (!editingPost) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${editingPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setPosts(posts.map((p) => (p.id === editingPost.id ? result.data : p)));
        resetForm();
        alert("Post updated successfully!");
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post");
    }
    setLoading(false);
  };

  // Delete a post
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id));
        alert("Post deleted successfully!");
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    }
    setLoading(false);
  };

  // Edit a post
  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category as BlogCategory,
      author: post.author,
      tags: post.tags.join(", "),
      status: post.status as "draft" | "published" | "archived",
      featured: post.featured || false,
    });
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Analysis",
      author: {
        id: "default",
        name: "Budget Ndio Story Team",
        role: "Editorial Team",
      },
      tags: "",
      status: "draft",
      featured: false,
    });
    setShowForm(false);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      case "archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-[16px] p-6 border border-[#212121]/8 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-[12px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] font-NeueMontreal placeholder-[#212121]/40 focus:outline-none focus:border-[#212121]/30"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 rounded-[12px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] font-NeueMontreal focus:outline-none focus:border-[#212121]/30"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-4 py-2 bg-[#212121] text-white text-[14px] font-NeueMontreal rounded-full hover:opacity-90 transition"
          >
            + New Post
          </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-[16px] border border-[#212121]/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#212121]/10">
                <th className="px-6 py-4 text-left text-[12px] font-NeueMontreal font-medium text-[#212121]/50 uppercase tracking-[0.1em]">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-NeueMontreal font-medium text-[#212121]/50 uppercase tracking-[0.1em]">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-NeueMontreal font-medium text-[#212121]/50 uppercase tracking-[0.1em]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-NeueMontreal font-medium text-[#212121]/50 uppercase tracking-[0.1em]">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-[12px] font-NeueMontreal font-medium text-[#212121]/50 uppercase tracking-[0.1em]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-[#212121]/5 hover:bg-[#fafafa] transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[16px] font-NeueMontreal font-medium text-[#212121]">
                        {post.title}
                      </p>
                      <p className="text-[13px] font-NeueMontreal text-[#212121]/50 mt-1 truncate max-w-[300px]">
                        {post.excerpt}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-NeueMontreal text-[#212121]/70">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-[12px] font-NeueMontreal font-medium ${getStatusColor(
                        post.status,
                      )}`}
                    >
                      {post.status}
                    </span>
                    {post.featured && (
                      <span className="ml-2 inline-flex px-3 py-1 rounded-full text-[12px] font-NeueMontreal font-medium bg-blue-100 text-blue-700">
                        ★ Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-NeueMontreal text-[#212121]/60">
                      {new Date(post.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 text-[13px] font-NeueMontreal text-[#212121]/60 hover:text-[#212121] hover:bg-[#f5f5f5] rounded-lg transition"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-3 py-1.5 text-[13px] font-NeueMontreal text-[#212121]/60 hover:text-[#212121] hover:bg-[#f5f5f5] rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1.5 text-[13px] font-NeueMontreal text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <span className="text-[48px]">📭</span>
            <p className="mt-4 text-[16px] font-NeueMontreal text-[#212121]/50">
              No posts found
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#212121]/10 px-8 py-4 flex items-center justify-between">
              <h2 className="text-[24px] font-FoundersGrotesk font-bold">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h2>
              <button
                onClick={resetForm}
                className="w-[32px] h-[32px] rounded-full bg-[#f5f5f5] hover:bg-[#212121] hover:text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-[14px] font-NeueMontreal font-medium text-[#212121]/70 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-[12px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] font-NeueMontreal focus:outline-none focus:border-[#212121]/30"
                  placeholder="Enter post title..."
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-[14px] font-NeueMontreal font-medium text-[#212121]/70 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-[12px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] font-NeueMontreal focus:outline-none focus:border-[#212121]/30 resize-none"
                  placeholder="Brief description..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-[14px] font-NeueMontreal font-medium text-[#212121]/70 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={10}
                  className="w-full px-4 py-3 rounded-[12px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] font-NeueMontreal focus:outline-none focus:border-[#212121]/30 resize-none font-mono text-[14px]"
                  placeholder="Write your content here... (Supports markdown)"
                />
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-NeueMontreal font-medium text-[#212121]/70 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as BlogCategory,
                      })
                    }
                    className="w-full px-4 py-3 rounded-[12px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] font-NeueMontreal focus:outline-none focus:border-[#212121]/30"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-NeueMontreal font-medium text-[#212121]/70 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "draft" | "published" | "archived",
                      })
                    }
                    className="w-full px-4 py-3 rounded-[12px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] font-NeueMontreal focus:outline-none focus:border-[#212121]/30"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[14px] font-NeueMontreal font-medium text-[#212121]/70 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-[12px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] font-NeueMontreal focus:outline-none focus:border-[#212121]/30"
                  placeholder="budget, kenya, devolution..."
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-[20px] h-[20px] rounded border-[#212121]/30"
                />
                <label
                  htmlFor="featured"
                  className="text-[14px] font-NeueMontreal text-[#212121]/70"
                >
                  Mark as featured
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={editingPost ? handleUpdate : handleCreate}
                  disabled={loading || !formData.title || !formData.content}
                  className="px-6 py-3 bg-[#212121] text-white text-[14px] font-NeueMontreal rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-[#f5f5f5] text-[#212121] text-[14px] font-NeueMontreal rounded-full hover:bg-[#e5e5e5] transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
