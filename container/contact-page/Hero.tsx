"use client";
import { FadeUp } from "@/animation";

export default function Hero() {
  return (
    <section className="w-full padding-x pt-[120px] pb-[60px]">
      <FadeUp duration={0.8}>
        <div className="w-full flex flex-col gap-[30px]">
          <h1 className="heading tracking-[-2px] text-secondry font-semibold font-FoundersGrotesk uppercase leading-tight">
            Get in <span className="text-secondry">Touch</span>
          </h1>
          <p className="paragraph max-w-[600px] text-secondry font-NeueMontreal">
            Have a question about budgets, want to collaborate on a project, or
            just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </FadeUp>
    </section>
  );
}
