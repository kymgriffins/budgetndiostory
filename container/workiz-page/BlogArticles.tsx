"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Marquee } from "@/components";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
}

export default function BlogArticles() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section className="w-full bg-marquee padding-y rounded-t-[20px]">
      <div className="w-full bg-marquee z-10 relative rounded-t-[20px]">
        <Marquee
          title="blog articles"
          className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
        />
      </div>
      <div className="w-full padding-x py-[30px]">
        <div className="w-full flex justify-between gap-[20px] flex-wrap sm:flex-col xm:flex-col">
          <div>
            <h3 className="paragraph font-medium text-white font-NeueMontreal">
              Latest articles
            </h3>
          </div>
          <div className="w-[70%] flex gap-y-[20px] sm:flex-col xm:flex-col sm:w-full xm:w-full gap-[10px]">
            {loading ? (
              <div className="flex justify-center items-center w-full h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-center py-[40px] text-white">
                <p>Error loading articles: {error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-[40px] text-white">
                <p>No articles found. Check back later!</p>
              </div>
            ) : (
              posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-between gap-[20px] sm:flex-col xm:flex-col"
                >
                  <div className="w-full flex gap-[20px] rounded-[20px] flex-col">
                    <div className="group overflow-hidden rounded-[20px] relative">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={300}
                          className="w-full h-[250px] object-cover group-hover:scale-[1.09] transform duration-[1s] ease-[.4,0,.2,1]"
                        />
                      )}
                    </div>
                    <div className="flex gap-[10px] items-start">
                      <span className="w-[10px] h-[10px] rounded-full bg-white mt-[6px]" />
                      <div className="flex-1">
                        <h4 className="paragraph uppercase font-medium font-NeueMontreal text-white mb-[5px]">
                          {post.title}
                        </h4>
                        <p className="text-[14px] text-gray-300 mb-[5px]">{post.date}</p>
                        <p className="text-[14px] text-gray-400 line-clamp-2">{post.content}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}