"use client";
import { backgroundAbout } from "@/public";
import { BackgroundImg } from "@/components";
import { FadeUp } from "@/animation";

export default function About() {
  return (
    <section className="w-full padding-y">
      <div className="w-full flex flex-col bg-background">
        <FadeUp delay={0.1} duration={0.8}>
          <div className="w-full border-t border-[#21212155] pt-[20px]">
            <div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[30px]">
              <div>
                <h3 className="paragraph font-medium text-secondry font-NeueMontreal">
                  Budget Ndio Story:
                </h3>
              </div>
              <div className="w-[48%] sm:w-full xm:w-full flex justify-between">
                <div className="w-[50%] sm:w-full xm:w-full flex flex-col gap-y-[40px]">
                  <div className="flex flex-col gap-y-[20px]">
                    <p className="paragraph font-NeueMontreal text-secondry">
                      We are storytellers, journalists,
                      <br /> creatives, and curious Kenyans.
                      <br /> We work together to translate the
                      <br /> national and county budgets into
                      <br /> stories people can see, hear,
                      <br /> and feel.
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-[20px]">
                    <p className="paragraph font-NeueMontreal text-secondry">
                      We are not politicians.
                      <br /> We are not technocrats.
                      <br /> We are translators of power —  turning public money into human stories that demand attention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
      <FadeUp delay={0.3} duration={0.8}>
        <div className="padding-x pt-[100px] lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xm:pt-[40px]">
          <BackgroundImg src={backgroundAbout} />
        </div>
      </FadeUp>
    </section>
  );
}