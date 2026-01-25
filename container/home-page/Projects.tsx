"use client";
import { projectItem } from "@/constants";
import { Heading, ProjectCard, RoundButton, Tags } from "@/components";
import { FadeUp } from "@/animation";

export default function Projects() {
	return (
		<section className="w-full rounded-t-[20px]">
			<FadeUp delay={0.1} duration={0.8}>
				<Heading
					title="Featured projects"
					className="padding-x padding-y pb-[50px] border-b border-[#21212155]"
				/>
			</FadeUp>
			<div className="w-full flex justify-between gap-y-[50px] padding-x padding-y flex-wrap">
				{projectItem.map((item, index) => (
					<FadeUp key={item.id} delay={0.2 + (index * 0.1)} duration={0.8} className="w-[49%] sm:w-full xm:w-full">
						<div className="flex gap-[10px] items-center pb-[10px]">
							<span className="w-[10px] h-[10px] rounded-full bg-secondry" />
							<h1 className="small-text uppercase font-medium font-NeueMontreal text-secondry">
								{item.title}
							</h1>
						</div>
						<ProjectCard
							item={item}
							key={item.id}
						/>
						<div className="flex items-center gap-[10px] mt-[20px] flex-wrap">
							{item.links.map((link) => (
								<Tags
									className="hover:text-white"
									bgcolor="#212121"
									item={link}
									key={link.id}
								/>
							))}
						</div>
					</FadeUp>
				))}
			</div>
			<FadeUp delay={0.6} duration={0.8} className="w-full flex justify-center">
				<div className="flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
					<RoundButton
						href="/presentation"
						title="view all case studies"
						bgcolor="#000"
						className="bg-white text-black"
						style={{ color: "#fff" }}
					/>
				</div>
			</FadeUp>
		</section>
	);
}
