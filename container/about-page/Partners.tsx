"use client";
import Image from "next/image";
import { Ratings } from "@/components";
import { aboutPartberItems } from "@/constants";
import { FadeUp } from "@/animation";

export default function Principles() {
  return (
    <section className="w-full bg-background">
      <FadeUp delay={0.1} duration={0.8}>
        <div>
          <h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry">
            We've built long-lasting partnerships
            <br className="smOnly:hidden xm:hidden" /> with the most ambitious brands
            <br className="smOnly:hidden xm:hidden" />
            across the globe:
          </h1>
        </div>
      </FadeUp>
      <div className="w-full border-t border-[#21212155] mt-[50px]">
        <div className="flex justify-between gap-[20px] smOnly:flex-col xm:flex-col pt-[50px]">
          {aboutPartberItems.map((item, index) => (
            <FadeUp key={item.id} delay={0.2 + index * 0.1} duration={0.8}>
              <div className="w-[440px] smOnly:w-[380px] xm:w-[350px] padding-x py-[30px] shrink-0">
                <div className="w-full h-full flex flex-col gap-[50px]">
                  <div>
                    <Image
                      src={item.src}
                      alt="img"
                      width={80}
                      height={80}
                      className="w-[80px] h-[80px]"
                    />
                  </div>
                  <div className="flex flex-col gap-[20px]">
                    <p className="paragraph text-secondry font-NeueMontreal font-normal underline">
                      {item.title}
                    </p>
                    <p className="paragraph text-secondry font-NeueMontreal font-normal">
                      {item.para}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      {/* <div className="padding-x padding-y">
        <Ratings />
      </div> */}
    </section>
  );
}