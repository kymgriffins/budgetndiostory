"use client";
import Image from "next/image";
import { principles1, principles2 } from "@/public";
import { FadeUp } from "@/animation";

export default function Principles() {
	return (
		<section className="w-full padding-y rounded-t-[20px] bg-background">
			<FadeUp delay={0.1} duration={0.8}>
				<div>
					<h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry mb-[50px]">
						Two beliefs that guide how we
						<br className="smOnly:hidden xm:hidden" /> tell the budget story:
					</h1>
				</div>
			</FadeUp>
			<div className="w-full border-t border-[#21212155]">
				<div className="w-full padding-x mt-[50px] flex justify-between gap-[30px] items-center smOnly:flex-col xm:flex-col">
					<FadeUp delay={0.2} duration={0.8}>
						<div className="w-[50%] smOnly:w-full xm:w-full flex flex-col gap-[20px]">
							<Image
								src={principles1}
								alt="img"
								className="w-full rounded-[15px]"
							/>
							<div className="flex flex-col gap-[20px]">
								<p className="paragraph font-NeueMontreal text-secondry">
									Whether the story aims to inform or
									<br />
									question, it must shift how people
									<br /> see public money. We look for
									<br /> real-life moments that make the
									<br /> budget suddenly feel personal.
								</p>
							</div>
						</div>
					</FadeUp>
					<FadeUp delay={0.4} duration={0.8}>
						<div className="w-[50%] smOnly:w-full xm:w-full flex flex-col gap-[20px]">
							<Image
								src={principles2}
								alt="img"
								className="w-full rounded-[15px]"
							/>
							<div className="flex flex-col gap-[20px]">
								<p className="paragraph font-NeueMontreal text-secondry">
									The story should reveal what is
									<br /> hidden, ignored, or rarely
									<br /> explained. We use visuals and
									<br /> voices to focus attention and
									<br /> help people feel the impact.
								</p>
							</div>
						</div>
					</FadeUp>
				</div>
			</div>
		</section>
	);
}