"use client";
import { FadeUp, TextHover } from "@/animation";
import { Marquee } from "@/components";
import { expectationsItems } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Expectations() {
  const [openItemId, setOpenItemId] = useState(null);

  const handleButtonClick = (id: any) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <section className="w-full bg-marquee padding-y rounded-t-[20px]">
      <FadeUp delay={0.1} duration={0.8}>
        <div className="w-full bg-marquee z-10 relative rounded-t-[20px]">
          <Marquee
            title="Taxs NA BUDGET"
            className="pb-[50px] lgOnly:pb-[40px] mdOnly:pb-[30px] smOnly:pb-[30px] xm:pb-[15px] text-[540px] leading-[330px] lgOnly:text-[380px] lgOnly:leading-[240px] mdOnly:text-[300px] mdOnly:leading-[160px] smOnly:text-[230px] smOnly:leading-[140px] xm:text-[130px] xm:leading-[80px]"
          />
        </div>
      </FadeUp>
      <FadeUp delay={0.2} duration={0.8}>
        <div className="w-full padding-x py-[20px]">
          <div className="w-full flex justify-between smOnly:flex-col xm:flex-col smOnly:gap-[20px] xm:gap-[20px]">
            <div className="w-[50%] smOnly:w-full xm:w-full">
              <h3 className="paragraph font-medium text-white font-NeueMontreal">
                What you can expect?
              </h3>
            </div>
            <div className="w-[50%] smOnly:w-full xm:w-full flex flex-wrap gap-[20px] smOnly:gap-[15px] xm:gap-[15px]">
              {expectationsItems.map((item, index) => (
                <div
                  className="w-[345px] smOnly:w-full xm:w-full flex justify-between gap-x-[20px] smOnly:flex-col xm:flex-col gap-[20px]"
                  key={item.id}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <FadeUp delay={0.3 + index * 0.1} duration={0.8}>
                    <div className="bg-[#145B52] w-full flex flex-col rounded-[20px] px-[30px] py-[20px] smOnly:px-[20px] smOnly:py-[15px] xm:px-[20px] xm:py-[15px]">
                      <div className="flex gap-x-[10px] items-center pb-[10px] mb-[80px] smOnly:mb-[60px] xm:mb-[50px]">
                        <h1 className="sub-heading font-normal font-NeueMontreal text-white">
                          {item.title1}
                        </h1>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <button className="small-text font-normal font-NeueMontreal text-white">
                          <TextHover
                            titile1={item.subTitle1}
                            titile2={item.subTitle1}
                          />
                        </button>
                        <button
                          onClick={() => handleButtonClick(item.id)}
                          className="small-text uppercase font-normal font-NeueMontreal text-white"
                        >
                          {openItemId === item.id ? (
                            "hide"
                          ) : (
                            <TextHover titile1={item.btn} titile2={item.btn} />
                          )}
                        </button>
                      </div>
                      <AnimatePresence>
                        {openItemId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              ease: [0.4, 0, 0.2, 1],
                              duration: 1,
                            }}
                          >
                            <div className="border-t border-[#f1f1f155] pt-[20px] text-background mt-[10px]">
                              {item.para1}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeUp>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
