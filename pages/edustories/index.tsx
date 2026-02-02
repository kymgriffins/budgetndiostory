"use client";

import { Curve, Ready } from "@/components";
import SmoothScrollGsap from "@/components/SmoothScrollGsap";
import {
	BudgetWorksedustories,
	Heroedustories,
	Storiesedustories,
} from "@/container";
import { useEffect } from "react";

export default function EduStories() {
  // Keep behavior consistent with other pages: ensure LocomotiveScroll is available.
  // SmoothScrollGsap will create a scoped instance with GSAP integration.
  useEffect(() => {}, []);

  return (
    <>
      <Curve backgroundColor={"#f1f1f1"} showFooter>
        <SmoothScrollGsap className="w-full">
          <Heroedustories />
          <Storiesedustories />
          <BudgetWorksedustories />
          <Ready />
        </SmoothScrollGsap>
      </Curve>
    </>
  );
}
