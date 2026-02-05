"use client";
import { FadeUp } from "@/animation";
import { motion } from "framer-motion";

export default function Hero() {
  const title = ["Budget", "Ndio", "Story"];

  return (
    <section className="w-full min-h-screen padding-x pt-[120px] pb-[60px]">
      <FadeUp>
        <div className="w-full flex flex-col gap-[40px]">
          {/* Main Hero Text */}
          <div className="w-full">
            <h1 className="heading tracking-[-2px] text-secondry font-semibold font-FoundersGrotesk uppercase leading-tight">
              Making <span className="text-secondry">Budgets</span> <br />
              <span className="text-secondry">Accessible</span> to All
            </h1>
            <p className="paragraph max-w-[600px] text-secondry font-NeueMontreal mt-[20px]">
              We transform complex budget data into engaging stories that help
              Kenyan youth understand where public money comes from and where it
              goes.
            </p>
          </div>

          {/* Bento Grid Stats Cards */}
          <div className="w-full grid grid-cols-2 lgOnly:grid-cols-4 gap-[20px] mt-[20px]">
            {[
              { label: "Budgets Analyzed", value: "50+" },
              { label: "Youth Reached", value: "100K+" },
              { label: "Partners", value: "25+" },
              { label: "Stories Told", value: "200+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-background border border-[#21212122] p-[24px] rounded-[16px]"
              >
                <p className="sub-heading font-FoundersGrotesk text-secondry uppercase">
                  {stat.value}
                </p>
                <p className="paragraph font-NeueMontreal text-secondry mt-[8px]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
