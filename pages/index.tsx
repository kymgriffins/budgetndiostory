"use client";
import { Curve, Marquee, Ready } from "@/components";
import {
	About,
	Aboutabout,
	Hero,
	Heroabout,
	Team,
	VideoHome
} from "@/container";
import Faq from "@/container/contact-page/Faq";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <>
      <Curve backgroundColor={"#f1f1f1"}>
        <Hero />
        <div className="w-full bg-marquee z-10 relative rounded-t-[20px] padding-y">
          <Marquee
            title="BUDGET NDIO STORY"
            className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
          />
        </div>
        <About />
        <VideoHome />
        {/* <Projects /> */}
        <Heroabout />
        <Aboutabout />
        <Team />
        {/* <Principles /> */}
        {/* <Partners /> */}
        <br />
        <br />
        <br />
        {/* <Insights /> */}

        {/* <Clients /> */}
        <Faq />
        <Ready />
      </Curve>
    </>
  );
}
