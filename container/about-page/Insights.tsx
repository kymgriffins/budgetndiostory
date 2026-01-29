"use client";
import Link from "next/link";
import Image from "next/image";
import { latestItemss } from "@/constants";
import { FadeUp } from "@/animation";

export default function Insights() {
	return (
		<section className="w-full pb-[100px] lgOnly:pb-[80px] mdOnly:pb-[60px] smOnly:pb-[40px] xm:pb-[40px] bg-background">
			<div className="w-full flex flex-col justify-between">
				<div className="w-full flex flex-col">
					<FadeUp delay={0.1} duration={0.8}>
						<div className="padding-x pb-[30px]">
							<h2 className="sub-heading font-normal tracking-[-1.3px] text-[#212121] font-NeueMontreal">
								Budget Stories
							</h2>
						</div>
					</FadeUp>
					<div className="w-full border-t border-[#21212155] pt-[20px]">
						<div className="w-full flex smOnly:flex-col xm:flex-col smOnly:gap-[20px] xm:gap-[20px] padding-x">
							<FadeUp delay={0.2} duration={0.8}>
								<div className="w-[50%] smOnly:w-full xm:w-full smOnly:flex-col xm:flex-col">
									<h3 className="text-[20px] leading-[30px] font-medium text-secondry font-NeueMontreal">
										Latest story:
									</h3>
								</div>
							</FadeUp>
							<FadeUp delay={0.3} duration={0.8}>
								<div className="w-[50%] smOnly:w-full xm:w-full smOnly:flex-col xm:flex-col">
									{latestItemss.map((item) => (
										<div
											key={item.id}
											className={`group relative overflow-hidden ${
												item.id == 1 && "hidden"
											} block`}>
											<div className="w-full flex flex-col gap-[20px]">
												<Link
													className="w-[350px] overflow-hidden rounded-[15px]"
													href={item.href}>
													<Image
														src={item.src}
														alt="img"
														className="w-full hover:scale-[1.09] transition transform duration-[1s] ease-[.4,0,.2,1]"
													/>
												</Link>
												<div className="flex gap-[10px] items-center absolute left-[25px] top-[25px]">
													{item.links.map((link) => (
														<div
															className="transform translate-y-[-200%] group-hover:translate-y-0 transition-all duration-300 ease-in-out"
															key={link.id}>
															<div className="rounded-[50px] border border-about  py-[2px] px-[15px] cursor-pointer">
																<Link
																	className="text-[18px] leading-[22px] font-NeueMontreal text-about uppercase"
																	href={"/"}>
																	{link.title}
																</Link>
															</div>
														</div>
													))}
												</div>
												<div className="flex flex-col gap-[7px]">
													<h3 className="text-[20px] leading-[30px] font-NeueMontreal font-normal text-secondry">
														Where the money was promised: <br /> What we found on
														the ground.
													</h3>
													<p className="text-[20px] leading-[30px] font-NeueMontreal font-normal text-gray-400">
														{item.subTitle}
													</p>
													<p className="text-[20px] leading-[30px] font-NeueMontreal font-normal text-gray-400">
														{item.date}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</FadeUp>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}