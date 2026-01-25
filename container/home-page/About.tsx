"use client";
import Image from "next/image";
import { useState } from "react";
import { aboutImg } from "@/public";
import { LinkHover, FadeUp, ScaleIn, HoverScale } from "@/animation";
import { footerItems } from "@/constants";
import { Heading, RoundButton } from "@/components";

export default function About() {
	const [hovered, setHovered] = useState(false);

	return (
		<section className="w-full bg-about padding-y rounded-t-[20px] z-20 relative mt-[-15px]">
			<FadeUp delay={0.1} duration={0.8}>
				<div className="pl-[50px] sm:px-[20px] xm:px-[20px]">
					<h2 className="sub-heading font-medium font-NeueMontreal text-secondry">
						Budget Ndiyo empowers youth to understand
						<br className="sm:hidden xm:hidden" /> how
						<span className="sub-heading font-medium font-NeueMontreal link-flash cursor-pointer">
							government and county budgets
						</span>
						&nbsp;work, make informed decisions, <br className="sm:hidden xm:hidden" />
						<span className="sub-heading font-medium font-NeueMontreal link-flash cursor-pointer">
							engage in civic processes,
						</span>
						&nbsp;and&nbsp;
						<span className="sub-heading font-medium font-NeueMontreal link-flash cursor-pointer">
							manage personal finances effectively.
						</span>
					</h2>
				</div>
			</FadeUp>
			<FadeUp delay={0.2} duration={0.8}>
				<div className="w-full border-y border-[#21212155] my-[50px] py-[20px]">
					<div className="padding-x pb-[50px] w-full flex sm:flex-col xm:flex-col gap-[30px] justify-between">
						<div className="w-[50%] sm:w-full xm:w-full">
							<h3 className="sub-paragraph font-medium text-secondry font-NeueMontreal">
								What you can expect?
							</h3>
						</div>
						<div className="w-[50%] sm:w-full xm:w-full">
							<div className="w-full flex gap-[30px] h-full items-end sm:items-start sm:flex-col xm:items-start xm:flex-col">
								<div className="w-[40%] sm:w-[60%] xm:w-[60%]">
									<p className="sub-paragraph font-medium font-NeueMontreal text-secondry tracking-wide">
										We create engaging educational content to help young people understand budgets,
										how public funds are allocated, and how policy decisions impact communities.
									</p>
									<p className="sub-paragraph font-medium font-NeueMontreal text-secondry pt-[30px] tracking-wide">
										Our approach combines clear explanations, interactive visuals, and practical examples
										to make learning about government, county finances, and civic responsibility accessible and fun.
									</p>
								</div>
								<div className="w-[60%] flex justify-end flex-col sm:w-full xm:w-full">
									<h1 className="sub-paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
										Resources:
									</h1>
									<div className="flex flex-col">
										{footerItems.map((item) => (
											<LinkHover
												key={item.id}
												className="w-fit sub-paragraph font-medium capitalize before:h-[1px] after:h-[1px] before:bottom-[1px] after:bottom-[1px]"
												title={item.title}
												href={"/"}
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</FadeUp>
			<div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[30px]">
				<FadeUp delay={0.3} duration={0.8} className="flex flex-col gap-[30px]">
					<Heading title="Our approach:" />
					<div
						className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group"
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
					>
						<RoundButton
							href="/our-approach"
							title="read more"
							bgcolor="#000"
							className="bg-white text-black"
							style={{ color: "#fff" }}
						/>
					</div>
				</FadeUp>
				<ScaleIn delay={0.4}>
					<HoverScale scale={hovered ? 0.96 : 1}>
						<div className="w-[50%] sm:w-full xm:w-full transition transform duration-[1.5s] ease-[.215,.61,.355,1] rounded-[15px] overflow-hidden">
							<Image
								src={aboutImg}
								alt="about-img"
								className={`w-full h-full transition transform duration-[2s] ease-[.215,.61,.355,1] ${hovered ? "scale-[1.09]" : "scale-100"
									}`}
							/>
						</div>
					</HoverScale>
				</ScaleIn>
			</div>
		</section>
	);
}
