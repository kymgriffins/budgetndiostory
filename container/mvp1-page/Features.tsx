"use client";
import { FadeUp } from "@/animation";
import { motion } from "framer-motion";

const features = [
  {
    title: "Budget Tracking",
    description:
      "Track national and county budgets in real-time with easy-to-understand visualizations.",
    icon: "📊",
    size: "large",
  },
  {
    title: "Educational Content",
    description:
      "Learn about public finance through engaging stories and interactive lessons.",
    icon: "📚",
    size: "medium",
  },
  {
    title: "Podcast",
    description:
      "Listen to conversations about budgets, policy, and civic engagement.",
    icon: "🎙️",
    size: "medium",
  },
  {
    title: "Data Stories",
    description:
      "Explore how public money is spent through compelling data visualizations.",
    icon: "📈",
    size: "medium",
  },
];

export default function Features() {
  return (
    <section className="w-full padding-x py-[80px]">
      <FadeUp>
        <div className="w-full mb-[40px]">
          <h2 className="sub-heading font-FoundersGrotesk text-secondry uppercase">
            What We Do
          </h2>
        </div>
      </FadeUp>

      {/* Bento Grid */}
      <div className="w-full grid grid-cols-1 mdOnly:grid-cols-2 lgOnly:grid-cols-3 gap-[20px]">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className={`bg-background border border-[#21212122] rounded-[24px] p-[32px] ${
              feature.size === "large"
                ? "mdOnly:col-span-2 lgOnly:col-span-2"
                : ""
            }`}
          >
            <div className="text-[48px] mb-[20px]">{feature.icon}</div>
            <h3 className="heading text-secondry font-FoundersGrotesk uppercase mb-[12px]">
              {feature.title}
            </h3>
            <p className="paragraph font-NeueMontreal text-secondry">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
