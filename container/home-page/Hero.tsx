"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { budgetNdiyoLogo, governmentIcon } from "@/public";
import { awwwards } from "@/public";
export default function Hero() {
	return (
		<section
			className="w-full h-screen smOnly:mb-[-10px] xm:mb-[-10px]"
			data-scroll
			data-scroll-speed="-.3"
		>
			<div className="w-full h-full flex flex-col justify-between">
				<div />
				<div className="w-full flex flex-col justify-between h-[75vh] smOnly:h-[85vh] xm:h-[85vh]">
					<div className="w-full flex justify-between gap-[20px] pl-[50px] mdOnly:pl-[30px] smOnly:pl-[20px] xm:pl-[20px]">
						<div>
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
								Empowering Youth <br />
								<div className="flex items-center gap-[5px]">
									<motion.span
										initial={{ width: 0 }}
										animate={{ width: "auto" }}
										transition={{
											ease: [0.86, 0, 0.07, 0.995],
											duration: 1,
											delay: 1.5,
										}}
										className="leading-[130px] lgOnly:leading-[98px] mdOnly:leading-[75px] smOnly:leading-[50px] xm:leading-[45px]"
									>
										{/* <Image
											width={120}
											height={50}
											src={ochiside}
											alt="Budget Ndio Story"
											className="w-auto h-[95px] lgOnly:w-auto lgOnly:h-auto mdOnly:w-[100px] mdOnly:h-[63px] smOnly:w-[74px] smOnly:h-[45px] xm:w-[64px] xm:h-[40px] object-cover xlOnly:mt-[15px] mt-[10px] rounded-[10px]"
										/> */}
										{/* Video Alternative */}
										{/*

										<video
											controls
											autoPlay
											loop
											muted
										>
											<source
												src="https://www.w3schools.com/html/mov_bbb.mp4"
												type="video/mp4"
											/>
										</video> */}
										{/* {Video background} */}

									</motion.span>
									<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
										understand budgets
									</h1>
								</div>
								and governance
							</h1>
						</div>
						<div>
							<Image
								src={awwwards}
								alt="Government"
								width={60}
								height={60}
								className="xm:hidden smOnly:hidden"
							/>
						</div>
					</div>
					<div className="w-full flex flex-col h-[22vh] border-t border-[#21212155] py-[20px] smOnly:mb-[80px] xm:mb-[80px] gap-[30px]">
						<div className="flex justify-between items-center padding-x gap-[20px] smOnly:flex-col smOnly:items-start xm:flex-col xm:items-start">
							<div className="w-[50%] xm:w-full smOnly:w-full">
								<p className="paragraph font-NeueMontreal text-secondry">
									Bridging the budget literacy gap for youth
								</p>
							</div>
							<div className="w-[50%] xm:w-full smOnly:w-full flex justify-between xm:flex-col xm:items-start smOnly:flex-col smOnly:items-start gap-[20px]">
								<div>
									<p className="paragraph font-NeueMontreal text-secondry">
										Learn how government and county budgets affect you
									</p>
								</div>
								<div className="flex items-center gap-[5px] group">
									<div className="rounded-[50px] border border-[#21212199] group-hover:bg-secondry py-[3px] px-[12px] cursor-pointer">
										<Link
											className="paragraph font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all transform duration-[0.3s] ease-[.215,.61,.355,1]"
											href="/"
										>
											start learning
										</Link>
									</div>
									<div className="w-[33px] flex items-center justify-center h-[33px] border border-[#21212199] rounded-full p-[1px] smOnly:p-[30px] xm:pb-[30px] group-hover:bg-secondry transition-all transform duration-[0.3s] ease-[.215,.61,.355,1] cursor-pointer xm:hidden smOnly:hidden">
										<p className="font-normal text-secondry group-hover:text-background">
											<ArrowUpRight
												size={24}
												strokeWidth={1.25}
											/>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full flex items-center overflow-hidden justify-center xm:hidden smOnly:hidden">
							<motion.p
								initial={{ y: "-100%", opacity: 0 }}
								animate={{ y: "100%", opacity: 0.5 }}
								transition={{
									duration: 1.8,
									repeat: Infinity,
									ease: [0.3, 0.86, 0.36, 0.95],
								}}
								className="paragraph opacity-50 font-NeueMontreal text-secondry"
							>
								scroll down to explore
							</motion.p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
