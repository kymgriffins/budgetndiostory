"use client";
import { FadeUp } from "@/animation";
import { BackgroundImg } from "@/components";
import { backgroundAbout } from "@/public";

export default function About() {
  return (
    <section className="w-full padding-y">
      {/* <div className="w-full flex flex-col bg-background">
        <FadeUp delay={0.1} duration={0.8}>
          <div className="w-full border-t border-[#21212155] pt-[20px]">
            <div className="w-full flex justify-between padding-x smOnly:flex-col xm:flex-col gap-[30px]">
              <div>
                <h3 className="paragraph font-medium text-secondry font-NeueMontreal">
                  Budget Ndio Story:
                </h3>
              </div>
              <div className="w-[48%] smOnly:w-full xm:w-full flex justify-between">
                <div className="w-[50%] smOnly:w-full xm:w-full flex flex-col gap-y-[40px]">
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
      </div> */}
      <FadeUp delay={0.3} duration={0.8}>
        <div className="padding-x pt-[100px] lgOnly:pt-[80px] mdOnly:pt-[60px] smOnly:pt-[40px] xm:pt-[40px]">
          <BackgroundImg src={backgroundAbout} />
        </div>
      </FadeUp>
      <FadeUp delay={0.5} duration={0.8}>
        <div className="w-full flex flex-col bg-background">
          <div className="w-full border-t border-[#21212155] pt-[40px]">
            <div className="w-full flex justify-between padding-x smOnly:flex-col xm:flex-col gap-[30px]">
              <div>
                <h2 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
                  Our Mission
                </h2>
              </div>
              <div className="w-[48%] smOnly:w-full xm:w-full flex justify-between">
                <div className="w-[100%] smOnly:w-full xm:w-full flex flex-col gap-y-[40px]">
                  <div className="flex flex-col gap-y-[20px]">
                    <p className="paragraph font-NeueMontreal text-secondry">
                      Budget Ndio Story translates national and county budgets
                      into short, verifiable stories that help citizens
                      understand where public money goes and how to act. We
                      believe that every Kenyan has the right to know how their
                      tax shillings are being spent by the government.
                    </p>
                    <p className="paragraph font-NeueMontreal text-secondry">
                      Our team of journalists, data analysts, and creative
                      storytellers works together to decode complex budget
                      documents and present them in formats that are accessible,
                      engaging, and actionable for everyday citizens.
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-[20px]">
                    <p className="paragraph font-NeueMontreal text-secondry">
                      We work with communities to help them understand budget
                      allocations for their schools, hospitals, roads, and other
                      public services. By making budget information transparent
                      and relatable, we empower citizens to hold their leaders
                      accountable.
                    </p>
                    <p className="paragraph font-NeueMontreal text-secondry">
                      Through our stories, we connect abstract numbers to
                      real-world impacts, showing how budget decisions affect
                      families, businesses, and communities across Kenya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
