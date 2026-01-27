"use client";
import { LinkHover, TextMask } from "@/animation";
import { Eyes } from "@/components";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Socials() {
	const [rotate, setRotate] = useState(0);
	// Phrases matching the Budget Ndio Story vibe
	const phrase = ["Budget", "Ndio", "Story"];

	useEffect(() => {
		window.addEventListener("mousemove", (e) => {
			let mouseX = e.clientX;
			let mouseY = e.clientY;

			let deltaX = mouseX - window.innerWidth / 2;
			let deltaY = mouseY - window.innerHeight / 2;

			let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
			setRotate(angle - 280);
		});
	}, []);

	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});
	const mq = useTransform(scrollYProgress, [0, 1], [0, -700]);

	return (
		<section
			className="w-full min-h-screen sm:h-screen xm:h-screen bg-about padding-y relative"
			ref={container}
		>
			<div className="w-full h-full flex justify-center gap-[50px] items-center flex-col">
				{/* Rotating Story Phrases */}
				<div className="flex flex-col gap-[10px] pb-[50px]">
					<h1 className="text-white text-[277px] leading-[207px] lg:text-[230px] lg:leading-[170px] md:text-[150px] md:leading-[100px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] text-center font-bold font-FoundersGrotesk text-secondry uppercase pointer-events-none">
						<TextMask>{phrase}</TextMask>
					</h1>
				</div>

				{/* Contact / Info Section */}
				<div className="w-full border-t border-[#21212155] pt-[20px]">
					<div className="w-full flex sm:flex-col xm:flex-col justify-between gap-y-[20px] padding-x">
						{/* Storyline Contact Info */}
						<div className="w-[50%] sm:w-full xm:w-full">
							<h3 className="paragraph font-medium text-white font-NeueMontreal">
								Where Budget Meets Reality
							</h3>
						</div>
						<div className=" w-[50%] sm:w-full xm:w-full flex sm:flex-col xm:flex-col justify-between gap-y-[20px]">
							<div>
								<h1 className=" paragraph font-medium font-NeueMontreal text-white	 pb-[20px]">
									Visit Us
								</h1>
								<div className="flex flex-col gap-y-[10px]">
									<LinkHover
										className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
										title="Budget Hub, Nairobi"
										href="/"
									/>
									<LinkHover
										className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
										title="Affordable Street, Nairobi"
										href="/"
									/>
									<LinkHover
										className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
										title="Floor 2, Room 15"
										href="/"
									/>
									<LinkHover
										className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
										title="Open for Everyone"
										href="/"
									/>
								</div>
							</div>

							<div className="flex w-fit h-fit gap-x-[5px] group">
								<div className="rounded-[50px] border-[2px] border-[#21212155] group-hover:bg-secondry py-[3px] px-[12px] cursor-pointer">
									<Link
										href="mailto:hello@budgetndiyo.com"
										className="paragraph font-NeueMontreal text-white uppercase group-hover:text-background transition-all duration-200 ease-in"
									>
										hello@budgetndiostory.ke
									</Link>
								</div>
								<div className="w-[33px] flex items-center justify-center h-[33px] border-[2px] border-[#21212155] rounded-[50px] group-hover:bg-secondry transition-all duration-200 ease-in cursor-pointer sm:hidden xm:hidden">
									<p className="paragraph font-normal text-secondry group-hover:text-background">
										<ArrowUpRight size={24} strokeWidth={1.25} />
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Motion Eyes */}
			<motion.div
				className="w-full absolute top-[50%] transform translate-y-[-50%] gap-[30px] flex items-center justify-center"
				style={{ y: mq }}
			>
				<Eyes className="w-[230px] h-[230px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
			</motion.div>
		</section>
	);
}
