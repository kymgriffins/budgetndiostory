"use client";
import { FadeUp } from "@/animation";
import { Eyes } from "@/components";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full min-h-screen">
      <div className="w-full flex flex-col justify-between">
        <div className="w-full flex flex-col">
          <FadeUp delay={0.1} duration={0.8}>
            <div className="w-full margin padding-x">
              <div>
                <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
                  Budget Ndio Story: Translating Public Budgets Into Citizen Stories
                </h1>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.3} duration={0.8}>
            <div className="w-full border-t border-[#21212155] pt-[20px]">
              <div className="w-full flex justify-between padding-x smOnly:flex-col xm:flex-col gap-[20px]">
                <div className="w-[10%] smOnly:w-full xm:w-full">
                  <h3 className="paragraph font-medium text-secondry font-NeueMontreal">
                    About us:
                  </h3>
                </div>
                <div className="w-[48%] flex justify-between smOnly:w-full xm:w-full smOnly:flex-col xm:flex-col gap-[20px]">
                  <div className="w-[50%] flex flex-col gap-y-[40px] smOnly:w-full xm:w-full">
                    <div className="flex flex-col gap-y-[20px]">
                      <p className="paragraph font-NeueMontreal text-secondry">
                        In Kenya, the budget decides how we live, learn, move,
                        and survive. But most youth never see it, hear it, or
                        understand it. We exist to turn the budget into stories
                        people can actually relate to.
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-[20px]">
                      <p className="paragraph font-NeueMontreal text-secondry">
                        We believe the budget is not numbers. The budget is
                        people. So we explain it through real voices, real
                        places, and real experiences — using stories, visuals,
                        audio, and film.
                      </p>
                    </div>
                  </div>
                  <div className="flex w-fit h-fit gap-[5px] group">
                    <div className="rounded-[50px] border border-[#21212199] group-hover:bg-secondry py-[3px] px-[12px] cursor-pointer">
                      <Link
                        href="/services"
                        className="paragraph font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all duration-200 ease-in"
                      >
                        Our Work
                      </Link>
                    </div>
                    <div className="w-[35px] flex items-center justify-center h-[35px] border border-[#21212199] rounded-[50px] p-[12px] group-hover:bg-secondry transition-all duration-200 ease-in cursor-pointer smOnly:hidden xm:hidden">
                      <p className="paragraph font-normal text-secondry group-hover:text-background">
                        <ArrowUpRight strokeWidth={1.25} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
      <FadeUp delay={0.6} duration={0.8} className="padding-y">
        <Eyes className="w-[300px] h-[300px] mdOnly:w-[200px] mdOnly:h-[200px] smOnly:w-[150px] smOnly:h-[150px] xm:w-[150px] xm:h-[150px] smOnly:flex-col xm:flex-col" />
      </FadeUp>
      <FadeUp delay={0.8} duration={0.8} className="padding-x">
        <h2 className="sub-heading font-medium font-NeueMontreal text-secondry">
          Bridging the Gap Between Government Spending and Citizen Understanding
        </h2>
      </FadeUp>
    </section>
  );
}
