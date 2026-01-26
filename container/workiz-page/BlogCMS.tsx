"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rounded } from "@/components";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
}

export default function BlogCMS() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for creating/editing posts
  const [formData, setFormData] = useState({
    id: null as number | null,
    title: "",
    content: "",
    image: "",
    date: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && formData.id) {
        // Update existing post
        const response = await fetch(`/api/blog/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to update post');
        }
      } else {
        // Create new post
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to create post');
        }
      }

      // Reset form and refresh posts
      setFormData({
        id: null,
        title: "",
        content: "",
        image: "",
        date: ""
      });
      setIsEditing(false);
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
      console.error('Error saving post:', err);
    }
  };

  // Handle edit post
  const handleEdit = (post: BlogPost) => {
    setFormData({
      id: post.id,
      title: post.title,
      content: post.content,
      image: post.image,
      date: post.date
    });
    setIsEditing(true);
    setShowForm(true);
  };

  // Handle delete post
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  return (
    <section className="w-full padding-y">
      <div className="w-full padding-x">
        <div className="w-full flex justify-between items-center mb-[40px]">
          <h2 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
            Blog CMS Management
          </h2>
          <button
            onClick={() => {
              setFormData({
                id: null,
                title: "",
                content: "",
                image: "",
                date: ""
              });
              setIsEditing(false);
              setShowForm(!showForm);
            }}
            className="rounded-[50px] border border-[#212121] cursor-pointer"
          >
            <Rounded className="py-[3px]" backgroundColor="#000">
              <p className="z-10 px-[15px] small-text font-NeueMontreal text-white uppercase">
                {showForm ? 'Cancel' : 'Create New Post'}
              </p>
            </Rounded>
          </button>
        </div>

        {error && (
          <div className="mb-[20px] p-[15px] bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        {showForm && (
          <div className="mb-[40px] p-[30px] bg-gray-50 rounded-[20px] border border-gray-200">
            <h3 className="paragraph font-medium text-secondry font-NeueMontreal mb-[20px]">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-[20px]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-[5px]">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-[10px] border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-[5px]">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full p-[10px] border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-[5px]">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="/path/to/image.jpg"
                  className="w-full p-[10px] border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-[5px]">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-[10px] border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="flex gap-[10px]">
                <button
                  type="submit"
                  className="rounded-[50px] border border-[#212121] cursor-pointer"
                >
                  <Rounded className="py-[3px]" backgroundColor="#000">
                    <p className="z-10 px-[15px] small-text font-NeueMontreal text-white uppercase">
                      {isEditing ? 'Update Post' : 'Create Post'}
                    </p>
                  </Rounded>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      id: null,
                      title: "",
                      content: "",
                      image: "",
                      date: ""
                    });
                    setIsEditing(false);
                  }}
                  className="rounded-[50px] border border-gray-400 cursor-pointer"
                >
                  <Rounded className="py-[3px]" backgroundColor="#ccc">
                    <p className="z-10 px-[15px] small-text font-NeueMontreal text-white uppercase">
                      Cancel
                    </p>
                  </Rounded>
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="w-full">
          <h3 className="paragraph font-medium text-secondry font-NeueMontreal mb-[20px]">
            Blog Posts
          </h3>

          {loading ? (
            <div className="flex justify-center items-center h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-[40px] text-gray-500">
              <p>No blog posts found. Create your first post!</p>
            </div>
          ) : (
            <div className="space-y-[20px]">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-[25px] bg-white rounded-[15px] border border-gray-200 flex justify-between items-start gap-[20px]"
                >
                  <div className="flex-1">
                    <h4 className="text-[18px] font-medium text-[#212121] mb-[5px]">{post.title}</h4>
                    <p className="text-[14px] text-gray-600 mb-[10px]">{post.date}</p>
                    <p className="text-[14px] text-gray-700 line-clamp-3">{post.content}</p>
                  </div>

                  <div className="flex gap-[10px] flex-shrink-0">
                    <button
                      onClick={() => handleEdit(post)}
                      className="rounded-[50px] border border-blue-500 cursor-pointer"
                    >
                      <Rounded className="py-[3px]" backgroundColor="#3b82f6">
                        <p className="z-10 px-[10px] text-[12px] font-NeueMontreal text-white uppercase">
                          Edit
                        </p>
                      </Rounded>
                    </button>

                    <button
                      onClick={() => handleDelete(post.id)}
                      className="rounded-[50px] border border-red-500 cursor-pointer"
                    >
                      <Rounded className="py-[3px]" backgroundColor="#ef4444">
                        <p className="z-10 px-[10px] text-[12px] font-NeueMontreal text-white uppercase">
                          Delete
                        </p>
                      </Rounded>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}