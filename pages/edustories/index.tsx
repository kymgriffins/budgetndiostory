"use client";
import { useEffect } from "react";
import Head from "next/head";
import { Curve } from "@/components";
import EduVideoCard from "@/components/EduVideoCard";
import { edustoriesItems } from "@/constants";
import { StaggerContainer } from "@/animation/PageAnimations";

export default function EduStories() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Edu Stories - Cinematic Budget Education | Budget Ndio Story</title>
        <meta
          name="description"
          content="Discover cinematic video stories that make budget education engaging and accessible. Explore governance, finance, and youth empowerment through interactive hover-to-play videos."
        />
        <meta
          name="keywords"
          content="budget education, youth empowerment, governance videos, financial literacy, Kenyan budget stories, interactive learning"
        />
        <meta name="author" content="Budget Ndio Story" />
        <meta property="og:title" content="Edu Stories - Cinematic Budget Education" />
        <meta
          property="og:description"
          content="Interactive video stories bringing budget education to life for Kenyan youth. Hover to play and learn about governance and finance."
        />
        <meta property="og:image" content="/public/project1.webp" />
        <meta property="og:url" content="https://budgetndiostory.com/edustories" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Edu Stories - Cinematic Budget Education" />
        <meta
          name="twitter:description"
          content="Interactive video stories bringing budget education to life for Kenyan youth."
        />
        <meta name="twitter:image" content="/public/project1.webp" />
        <link rel="canonical" href="https://budgetndiostory.com/edustories" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Edu Stories - Cinematic Budget Education",
              "description": "Discover cinematic video stories that make budget education engaging and accessible for Kenyan youth.",
              "url": "https://budgetndiostory.com/edustories",
              "publisher": {
                "@type": "Organization",
                "name": "Budget Ndio Story",
                "url": "https://budgetndiostory.com"
              },
              "mainEntity": {
                "@type": "ItemList",
                "name": "Educational Video Stories",
                "description": "Collection of interactive video stories about budget education and governance",
                "numberOfItems": edustoriesItems.length,
                "itemListElement": edustoriesItems.map((item, index) => ({
                  "@type": "VideoObject",
                  "name": item.title,
                  "description": item.description,
                  "thumbnailUrl": "/public/project1.webp",
                  "uploadDate": "2024-01-27",
                  "duration": "PT2M",
                  "url": `https://budgetndiostory.com${item.videoSrc}`,
                  "position": index + 1
                }))
              }
            })
          }}
        />
      </Head>
      <Curve backgroundColor="#f1f1f1">
        {/* Hero Section */}
        <section className="w-full h-screen flex items-center justify-center padding-x">
        <div className="text-center">
          <h1 className="heading text-[#212121] font-semibold font-FoundersGrotesk uppercase mb-4">
            Edu Stories
          </h1>
          <p className="paragraph font-NeueMontreal text-secondry max-w-2xl mx-auto">
            Discover cinematic narratives that bring budget education to life. Hover over the videos to explore stories of governance, finance, and youth empowerment.
          </p>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="w-full padding-x py-20">
        <div className="w-full">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#212121]">
            Cinematic Budget Stories
          </h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {edustoriesItems.map((item) => (
              <EduVideoCard
                key={item.id}
                title={item.title}
                description={item.description}
                videoSrc={item.videoSrc}
              />
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Curve>
    </>
  );
}
