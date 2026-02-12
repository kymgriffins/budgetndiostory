import { TextHover } from "@/animation";
import { navbarItems } from "@/constants";
import { navVariants } from "@/motion";
import { logo } from "@/public";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        role="banner"
        aria-label="Main navigation"
        variants={navVariants}
        className="w-full h-[8vh] padding-x fixed top-0 left-0 z-50 backdrop-blur-[7px] flex items-center justify-between smOnly:hidden xm:hidden mdOnly:hidden"
        animate={hidden ? "hidden" : "vissible"}
      >
        <div className="w-[50%]">
          <Link href="/">
            <Image
              src={logo}
              alt="Budget Ndio Story – Home"
              width={70}
              height={70}
              priority
              loading="eager"
            />
          </Link>
        </div>
        <div className="flex gap-x-[20px] w-[50%] items-center">
          {navbarItems.map((item) => (
            <Link
              key={item.id}
              className={`w-fit paragraph font-medium font-NeueMontreal text-secondry capitalize flex flex-col hover`}
              href={item.href}
            >
              <TextHover titile1={item.title} titile2={item.title} />
            </Link>
          ))}
          {/* Strong CTA Button - Subscribe */}
          <Link
            href="/#newsletter"
            className="px-4 py-2 bg-[#00aa55] text-white text-sm font-medium font-NeueMontreal rounded-full hover:bg-[#008844] transition-colors"
            aria-label="Subscribe to newsletter"
          >
            Subscribe
          </Link>
        </div>
      </motion.nav>
      <MobileNav />
    </>
  );
}
