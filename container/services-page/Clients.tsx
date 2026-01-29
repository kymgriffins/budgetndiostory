"use client";
import { FadeUp } from "@/animation";
import { Button } from "@/components";
import { serviceClientsItem } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Clients() {
  const [activeAccordion, setActiveAccordion] = useState(
    serviceClientsItem[0].id,
  );
  const toggleAccordion = (itemId: any) => {
    setActiveAccordion((prev) => (prev === itemId ? null : itemId));
  };
  return (
    <section className="w-full padding-y">
      <FadeUp delay={0.1} duration={0.8}>
        <h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px]">
          Budget Ecosystem
        </h1>
      </FadeUp>
      {serviceClientsItem.map((item, index) => (
        <div
          key={item.id}
          className={`w-full flex py-[10px] flex-col ${
            item.id == 1
              ? "border-y border-[#21212155]"
              : "border-b border-[#21212155]"
          }`}
          style={{ animationDelay: `${0.2 + index * 0.1}s` }}
        >
          <FadeUp delay={0.2 + index * 0.1} duration={0.8}>
            <div className="w-full flex items-center justify-between py-[10px] padding-x gap-[10px] smOnly:flex-col xm:flex-col">
              <div className="flex-1 flex items-center smOnly:w-full xm:w-full">
                <div className="flex-1 smOnly:w-full xm:w-full">
                  <Link
                    href={item.href}
                    className="small-text font-normal font-NeueMontreal text-secondry link-flash"
                  >
                    {item.website}
                  </Link>
                </div>
                <div className="hidden smOnly:hidden xm:hidden">
                  <motion.h3
                    className={`small-text font-normal font-NeueMontreal text-secondry ${
                      activeAccordion === item.id ? "opacity-100" : "opacity-0"
                    } opacity-0 transition-all duration-200 ease-in-out`}
                  >
                    {item.title}
                  </motion.h3>
                </div>
              </div>
              <div className="flex-1 flex justify-between items-center smOnly:w-full xm:w-full">
                <div className="flex-1 smOnly:w-full xm:w-full">
                  <h3 className="small-text font-normal font-NeueMontreal text-secondry">
                    {item.name}
                  </h3>
                </div>
                <div className="flex-shrink-0 flex items-end justify-end smOnly:w-full xm:w-full">
                  <button
                    className={`small-text font-normal font-NeueMontreal uppercase transition-all duration-200 ease-in-out ${
                      activeAccordion === item.id
                        ? "text-gray-300"
                        : "text-secondry link-flash"
                    }`}
                    onClick={() => toggleAccordion(item.id)}
                  >
                    {activeAccordion === item.id ? "read" : "read"}
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`w-full flex justify-between padding-x gap-[10px] smOnly:flex-col xm:flex-col`}
            >
              <div className="hidden smOnly:hidden xm:hidden" />
              <div className="flex-1 flex flex-wrap gap-x-[5px] smOnly:w-full xm:w-full smOnly:pt-[10px] xm:pt-[10px]">
                {item.links.map((link) => (
                  <AnimatePresence key={link.id}>
                    {activeAccordion === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          ease: [0.4, 0, 0.2, 1],
                          duration: 1,
                        }}
                      >
                        <Button
                          href={link.href}
                          title={link.title}
                          key={link.id}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
              <div className="flex-1 smOnly:w-full xm:w-full">
                <AnimatePresence>
                  {activeAccordion === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        ease: [0.4, 0, 0.2, 1],
                        duration: 1.3,
                      }}
                    >
                      <div className="flex flex-col gap-[20px] py-[30px]">
                        <div className="w-[130px] h-[130px] smOnly:w-[100px] smOnly:h-[100px] xm:w-[100px] xm:h-[100px]">
                          <Image
                            src={item.src}
                            alt="clientImg"
                            className="w-full h-full object-cover rounded-[10px]"
                          />
                        </div>
                        <div className="">
                          <p className="small-text tracking-wider font-normal font-NeueMontreal text-secondry">
                            {item.review}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="hidden smOnly:hidden xm:hidden" />
            </div>
          </FadeUp>
        </div>
      ))}
    </section>
  );
}
