"use client";
import { Form, Herocontact, Socials } from "@/container";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <>
      <Herocontact />
      <Form />
      <Socials />
    </>
  );
}
