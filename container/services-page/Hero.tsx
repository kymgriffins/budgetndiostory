"use client";
import { FadeUp } from "@/animation";

export default function Hero() {
  return (
    <section className="w-full min-h-screen">
      <div className="w-full flex flex-col justify-between">
        <div className="w-full flex flex-col">
          <FadeUp delay={0.1} duration={0.8}>
            <div className="w-full margin padding-x">
              <div>
                <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
                  services
                </h1>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.8}>
            <div className="w-full border-t border-[#21212155]">
              <p className="w-[80%] sm:w-full xm:w-full sub-heading font-normal padding-x font-NeueMontreal text-secondry padding-y">
                We create budget literacy solutions tailored for youth and
                citizens, empowering them to understand and engage with
                government budgets and governance processes.
              </p>
            </div>
          </FadeUp>
          <div className="w-full flex border-t border-[#21212155] py-[20px] flex-col">
            <div className="w-full flex justify-between sm:flex-col xm:flex-col padding-x sm:gap-[20px] xm:gap-[20px]">
              <FadeUp delay={0.3} duration={0.8}>
                <div className="w-[50%] sm:w-full xm:w-full">
                  <p className="paragraph font-NeueMontreal text-secondry">
                    We do this by following <br /> a simple approach:
                  </p>
                </div>
              </FadeUp>
              <div className="w-[50%] sm:w-full xm:w-full flex justify-between sm:flex-col xm:flex-col gap-[20px]">
                <FadeUp delay={0.4} duration={0.8}>
                  <div className="w-[50%] sm:w-full xm:w-full flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[20px]">
                      <p className="paragraph font-NeueMontreal text-secondry underline">
                        Goal defines it all
                      </p>
                      <p className="paragraph font-NeueMontreal text-secondry">
                        What do you want citizens or youth to learn?{" "}
                        <br className="sm:hidden xm:hidden" /> Understanding the
                        purpose of your presentation ensures clarity and impact.
                      </p>
                    </div>
                    <div className="flex flex-col gap-[20px]">
                      <p className="paragraph font-NeueMontreal text-secondry underline">
                        Audience is the hero
                      </p>
                      <p className="paragraph font-NeueMontreal text-secondry">
                        Who is your audience? Youth groups, students, or
                        community members?{" "}
                        <br className="sm:hidden xm:hidden" /> Knowing them
                        allows us to tailor content they care about and engage
                        with.
                      </p>
                    </div>
                  </div>
                </FadeUp>
                <FadeUp delay={0.5} duration={0.8}>
                  <div className="w-[50%] sm:w-full xm:w-full">
                    <div className="flex flex-col gap-[20px]">
                      <p className="paragraph font-NeueMontreal text-secondry underline">
                        Context makes a difference
                      </p>
                      <p className="paragraph font-NeueMontreal text-secondry">
                        Is this for a school workshop, youth forum, or online
                        briefing? <br className="sm:hidden xm:hidden" /> We
                        adapt content and design to the environment and audience
                        to maximize comprehension and engagement.
                      </p>
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
