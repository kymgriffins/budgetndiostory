"use client";

import { Curve, Ready } from "@/components";
import SmoothScrollGsap from "@/components/SmoothScrollGsap";
import { Heroedu, LearningPath } from "@/container";
import { useEffect } from "react";

export default function Edu() {
  // Ensure proper scroll resolution on desktop
  useEffect(() => {
    // Force refresh on mount to ensure proper scroll calculations
    if (typeof window !== "undefined") {
      window.addEventListener("load", () => {
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 100);
      });
    }
  }, []);

  return (
    <>
      <Curve backgroundColor={"#f1f1f1"} showFooter>
        <SmoothScrollGsap className="h-screen overflow-y-auto overflow-x-hidden w-full">
          <Heroedu />
          <LearningPath />
          {/* <Ready /> */}
        </SmoothScrollGsap>
      </Curve>
    </>
  );
}
