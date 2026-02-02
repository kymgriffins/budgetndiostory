"use client";
import { Curve, Ready } from "@/components";
import {
	Archive,
	Capibilyties,
	Clientsservices,
	Expectations,
	Heroservices,
	Process,
} from "@/container";
import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return (
    <>
      <Curve backgroundColor={"#f1f1f1"} showFooter>
        <Heroservices />
        <Process />
        <Capibilyties />
        <Clientsservices />
        <Archive />
        <Expectations />
        <Ready />
      </Curve>
    </>
  );
}
