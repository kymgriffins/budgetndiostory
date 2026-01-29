"use client";
import { FadeUp, TextMask } from "@/animation";
import { Eyes, RoundButton, Rounded } from "@/components";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Ready() {
  const container = useRef(null);
  const phrase = ["Budget", "Ndio", "Story"];

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const mq = useTransform(scrollYProgress, [0, 1], [0, -700]);

  return (
    <section
      className="w-full relative z-30 min-h-screen smOnly:h-screen xm:h-screen bg-about padding-y rounded-t-[20px] mt-[-20px]"
      ref={container}
    >
      <div className="w-full h-full flex justify-center gap-[50px] items-center flex-col">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-white text-[290px] leading-[230px] lgOnly:text-[220px] lgOnly:leading-[170px] mdOnly:text-[180px] mdOnly:leading-[140px] smOnly:text-[120px] smOnly:leading-[90px] xm:text-[80px] xm:leading-[60px] tracking-[-2.5px] text-center font-bold font-FoundersGrotesk text-secondry uppercase pointer-events-none">
            <TextMask>{phrase}</TextMask>
          </h1>
        </div>
        <FadeUp delay={0.3} duration={0.8}>
          <div className="flex flex-col  items-center gap-[10px]">
            <div className="flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
              <RoundButton
                href="/contact"
                title="start the project"
                className="bg-white text-black"
                bgcolor="#000"
                style={{ color: "#fff" }}
              />
            </div>
            <p className="text-[20px] font-NeueMontreal text-secondry">OR</p>
            <div className="flex items-center justify-between bg-transparent cursor-pointer rounded-full group border border-[#212121]">
              <Link
                className="xlOnly:text-[18px] xlOnly:leading-[28px] text-[14px] leading-[24px] uppercase font-normal font-NeueMontreal"
                href="/contact"
              >
                <Rounded className="py-[6px]" backgroundColor="#212121">
                  <p className="z-10 px-[10px] ml-[15px] py-[6px] group-hover:text-white text-white">
                    contact us
                  </p>
                  <div className="bg-black group-hover:bg-white text-white p-[10px] rounded-full scale-[0.3] mr-[10px] group-hover:scale-[0.9] transition-all z-10 transform duration-[0.3s] ease-[.215,.61,.355,1]">
                    <ArrowUpRight
                      strokeWidth={1.5}
                      size={30}
                      className="scale-[0] group-hover:scale-[1]"
                    />
                  </div>
                </Rounded>
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
      <motion.div
        className="w-full absolute top-[50%] transform translate-y-[-50%] gap-[30px] flex items-center justify-center"
        style={{ y: mq }}
      >
        <Eyes className="w-[200px] h-[200px] mdOnly:w-[170px] mdOnly:h-[170px] smOnly:w-[150px] smOnly:h-[150px] xm:w-[150px] xm:h-[150px] smOnly:flex-col xm:flex-col" />
      </motion.div>
    </section>
  );
}
