"use client";
import { Curve, Ready } from "@/components";
import {
	Heropresentation,
	Projectspresentation,
	Publication,
} from "@/container";
import { useEffect } from "react";

export default function Presentation() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return (
    <>
      <Curve backgroundColor={"#f1f1f1"} showFooter>
        <Heropresentation />
        <Projectspresentation />
        <Publication />
        <Ready />
      </Curve>
    </>
  );
}
