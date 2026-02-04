"use client";

import { PageTransition, SmoothScrollGsap } from "@/components";
import { CourseList, Features, LearnHero } from "@/container";
import { useEffect } from "react";

export default function LearnPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("load", () => {
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 100);
      });
    }
  }, []);

  return (
    <PageTransition>
      <SmoothScrollGsap className="min-h-screen overflow-y-auto overflow-x-hidden w-full bg-[#f1f1f1]">
        <LearnHero />
        <CourseList />
        <Features />
      </SmoothScrollGsap>
    </PageTransition>
  );
}
