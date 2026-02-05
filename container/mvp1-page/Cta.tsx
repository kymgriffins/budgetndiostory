"use client";
import { FadeUp } from "@/animation";
import { RoundButton } from "@/components";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="w-full padding-x py-[100px]">
      <FadeUp>
        <div className="w-full bg-background border border-[#21212122] rounded-[32px] p-[60px] text-center">
          <h2 className="heading text-secondry font-FoundersGrotesk uppercase mb-[20px]">
            Ready to Understand <br />
            Your Budget?
          </h2>
          <p className="paragraph font-NeueMontreal text-secondry max-w-[500px] mx-auto mb-[40px]">
            Join thousands of young Kenyans who are taking control of their
            financial future through budget education.
          </p>
          <div className="flex flex-col smOnly:flex-row gap-[20px] justify-center items-center">
            <Link href="/tracker">
              <div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full">
                <RoundButton
                  bgcolor="#212121"
                  href="/tracker"
                  title="Explore Budgets"
                  className="bg-white text-black"
                  style={{ color: "#fff" }}
                />
              </div>
            </Link>
            <Link href="/contact">
              <p className="paragraph font-NeueMontreal text-secondry hover:underline">
                Get in Touch
              </p>
            </Link>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
