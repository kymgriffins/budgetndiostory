"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components";
import { serviceCapaybilitiesItem } from "@/constants";
import { FadeUp } from "@/animation";

export default function Capibilyties() {
	const [hovered, setHovered] = useState(false);
	const [hovered1, setHovered1] = useState(false);
	return (
		<div className="w-full bg-about padding-y rounded-t-[20px]">
			<FadeUp delay={0.1} duration={0.8}>
				<div className="w-[82%] sm:w-full xm:w-full padding-x mb-[70px]">
					<h1 className="sub-heading font-medium font-NeueMontreal text-secondry">
						<span className="xl:link-flash lg:link-flash md:link-flash cursor-pointer">
							Let's be honest.
						</span>
						&nbsp;Budget information doesn't have to be boring or confusing.
						We turn complex financial data into engaging stories that youth
						can understand and act on, empowering communities to participate
						in civic life.
						<span className="xl:link-flash lg:link-flash md:link-flash cursor-pointer">
							&nbsp;Making budgets accessible for everyone.
						</span>
					</h1>
				</div>
			</FadeUp>
			<FadeUp delay={0.2} duration={0.8}>
				<div className="w-full flex sm:flex-col xm:flex-col justify-between py-[20px] padding-x border-t border-[#21212155] sm:gap-[15px] xm:gap-[15px]">
					<div className="w-[10%] sm:w-full xm:w-full">
						<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
							Our Capabilities:
						</h3>
					</div>
					<FadeUp delay={0.3} duration={0.8}>
						<div className="w-[90%] flex flex-col gap-y-[30px]">
							{serviceCapaybilitiesItem.map((item, index) => (
								<div
									className="w-full flex sm:flex-col xm:flex-col justify-between sm:gap-[15px] xm:gap-[15px]"
									key={item.id}
									style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
									<div className="w-[40%] flex justify-end mr-[150px] sm:hidden xm:hidden">
										{hovered && item.id === 1 ? (
											<Image
												src={item.src1}
												alt="img"
												width={300}
												height={200}
												className="w-[300px] h-[200px] rounded-[20px]"
											/>
										) : (
											hovered1 &&
											item.id === 1 && (
												<Image
													src={item.src2}
													alt="img"
													width={300}
													height={200}
													className="w-[300px] h-[200px] rounded-[20px]"
												/>
											)
										)}
									</div>
									<div className="w-[25%] sm:w-full xm:w-full">
										<div className="flex gap-x-[10px] flex-col">
											<div className="flex items-center gap-x-[10px] pb-[20px]">
												<span className="w-[12px] h-[12px] rounded-full bg-secondry" />
												<h1 className="paragraph uppercase font-medium font-NeueMontreal text-secondry">
													{item.title1}
												</h1>
											</div>
										</div>
										<div
											className="flex flex-col gap-y-[5px]"
											onMouseEnter={() => setHovered(item.id === 1 && true)}
											onMouseLeave={() => setHovered(item.id === 1 && false)}>
											{item.links1.map((link) => (
												<Button
													href={link.href}
													title={link.title}
													key={link.id}
												/>
											))}
										</div>
									</div>
									<div className="w-[25%] sm:w-full xm:w-full">
										<div className="flex gap-x-[10px] flex-col">
											<div className="flex items-center gap-x-[10px] pb-[20px]">
												<span className="w-[12px] h-[12px] rounded-full bg-secondry" />
												<h1 className="paragraph uppercase font-medium font-NeueMontreal text-secondry">
													{item.title2}
												</h1>
											</div>
										</div>
										<div
											className="flex flex-col gap-y-[5px]"
											onMouseEnter={() => setHovered1(item.id === 1 && true)}
											onMouseLeave={() => setHovered1(item.id === 1 && false)}>
											{item.links2.map((link) => (
												<Button
													href={link.href}
													title={link.title}
													key={link.id}
												/>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</FadeUp>
				</div>
			</FadeUp>
		</div>
	);
}