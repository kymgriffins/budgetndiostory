"use client";
import { curve, text, translate, slideUp } from "@/motion";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const routes = {
  "/": "BUDGET NDIO STORY",
  "/services": "BUDGET NDIO STORY",
  "/presentation": "BUDGET NDIO STORY",
  "/ochi-team": "BUDGET NDIO STORY",
  "/insights": "BUDGET NDIO STORY",
  "/contact": "BUDGET NDIO STORY",
  "/case": "BUDGET NDIO STORY",
};

const anim = (variants) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

export default function Curve({ children, backgroundColor }) {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ backgroundColor }}>
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="fixed h w-full pointer-events-none
				 left-0 top-0 z-50 bg-black"
      />
      <motion.p
        className="absolute left-1/2 top-[40%] text-white text-[50px] z-[60] -translate-x-1/2 text-center font-FoundersGrotesk"
        {...anim(text)}
      >
        {routes[router.route]}
      </motion.p>
      {dimensions.width != null && <SVG {...dimensions} />}
      <motion.div {...anim(slideUp)}>
        {children}
      </motion.div>
    </div>
  );
}

const SVG = ({ height, width }) => {
  const initialPath = `M0 0 L${width} 0 L${width} ${height} L0 ${height} L0 0`;

  const targetPath = `M0 0 L${width} 0 L${width} ${height} L0 ${height} L0 0`;

  return (
      <motion.svg
        className="fixed h w-full pointer-events-none
				 left-0 top-0 z-50"
        {...anim(translate)}
      >
        <motion.path fill="black" {...anim(curve(initialPath, targetPath))} />
      </motion.svg>
  );
};
