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
                <h1 className="heading tracking-[-1.3px] text-primary font-semibold font-FoundersGrotesk uppercase">
                  WE BRIDGE <br />
                  <div className="flex items-center gap-[5px]">
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      transition={{
                        ease: [0.86, 0, 0.07, 0.995],
                        duration: 1,
                        delay: 1.5,
                      }}
                    >
                      {/* <Image
                        width={120}
                        height={50}
                        src={ochiside}
                        alt="img"
                        className="w-auto h-[95px] lg:w-auto lg:h-auto md:w-[100px] md:h-[63px] sm:w-[74px] sm:h-[45px] xm:w-[64px] xm:h-[40px] object-cover xl:mt-[15px] mt-[10px] rounded-[10px]"
                      /> */}
                    </motion.span>
                    <h1 className="heading tracking-[-1.3px] text-primary font-semibold font-FoundersGrotesk uppercase">
                      The BUDGET GAp
                    </h1>
                  </div>
                </h1>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.3} duration={0.8}>
            <div className="w-full border-t border-border pt-[20px]">
              <div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[20px]">
                <div className="w-[10%] sm:w-full xm:w-full">
                  <h3 className="paragraph font-medium text-secondry font-NeueMontreal">
                    About us:
                  </h3>
                </div>
                <div className="w-[48%] flex justify-between sm:w-full xm:w-full sm:flex-col xm:flex-col gap-[20px]">
                  <div className="w-[50%] flex flex-col gap-y-[40px] sm:w-full xm:w-full">
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
                    <div className="w-[35px] flex items-center justify-center h-[35px] border border-[#21212199] rounded-[50px] p-[12px] group-hover:bg-secondry transition-all duration-200 ease-in cursor-pointer sm:hidden xm:hidden">
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
        <Eyes className="w-[300px] h-[300px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
      </FadeUp>
      <FadeUp delay={0.8} duration={0.8} className="padding-x">
        <h1 className="sub-heading font-medium font-NeueMontreal text-secondry">
          Budget Ndio Story
          <br className="sm:hidden xm:hidden" /> The Past, The Present and The
          Future.
        </h1>
      </FadeUp>
    </section>
  );
}
