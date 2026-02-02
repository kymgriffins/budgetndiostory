"use client";

import { Curve, Ready, Tags } from "@/components";
import SmoothScrollGsap from "@/components/SmoothScrollGsap";
import { getBlogImageById } from "@/utils/blogAssets";
import { blogPosts } from "@/utils/blogPosts";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

type EduStory = {
  id: number;
  title: string;
  content: string;
  image?: string;
  date?: string;
};

export default function EduStoryPage({ post }: { post: EduStory }) {
  return (
    <>
      <Curve backgroundColor={"#f1f1f1"} showFooter>
        <SmoothScrollGsap className="w-full">
          <section className="w-full min-h-screen" data-scroll-section>
            <div className="w-full margin padding-x">
              <div className="flex items-center justify-between gap-[20px] smOnly:flex-col xm:flex-col smOnly:items-start xm:items-start">
                <div
                  data-animate="fade-up"
                  className="w-[70%] smOnly:w-full xm:w-full"
                >
                  <h1 className="sub-heading font-FoundersGrotesk uppercase text-secondry">
                    {post.title}
                  </h1>
                  <p className="paragraph mt-[10px] text-gray-500 font-NeueMontreal">
                    {post.date ?? "—"}
                  </p>
                </div>
                <div data-animate="fade-up" className="w-fit">
                  <Link
                    href="/edustories"
                    className="paragraph font-NeueMontreal uppercase text-secondry link-flash"
                  >
                    Back to stories
                  </Link>
                </div>
              </div>

              <div className="w-full padding-y" data-animate="fade-up">
                <div className="w-full rounded-[16px] overflow-hidden">
                  <Image
                    src={getBlogImageById(post.id)}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="flex items-center gap-[10px] mt-[16px] flex-wrap">
                  <Tags
                    bgcolor="#212121"
                    item={{ id: 1, title: "edustory", href: "/edustories" }}
                    className="hover:text-white"
                  />
                  <Tags
                    bgcolor="#212121"
                    item={{ id: 2, title: "budget", href: "/edustories" }}
                    className="hover:text-white"
                  />
                </div>
              </div>

              <div className="w-full pb-[120px] lgOnly:pb-[80px] mdOnly:pb-[70px] smOnly:pb-[60px] xm:pb-[60px]">
                <div className="w-full max-w-[950px]" data-animate="fade-up">
                  <p className="paragraph font-NeueMontreal text-secondry whitespace-pre-line">
                    {post.content}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Ready />
        </SmoothScrollGsap>
      </Curve>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const idRaw = ctx.params?.id;
  const id = typeof idRaw === "string" ? Number.parseInt(idRaw, 10) : NaN;
  if (!Number.isFinite(id)) return { notFound: true };

  const post = blogPosts.find((p) => p.id === id);
  if (!post) return { notFound: true };

  return { props: { post } };
};
