import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { workiz, workizhero } from "@/public";
import { BackgroundImg, Rounded } from "@/components";

export default function Hero() {
	return (
		<section className="w-full rounded-b-[20px]">
			<div className="w-full pb-[200px]">
				<div className="w-full flex flex-col">
					<div className="w-full margin padding-x">
						<div>
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
								<div className="flex items-center gap-[5px]">
									<motion.span
										initial={{ width: 0 }}
										animate={{ width: "auto" }}
										transition={{
											ease: [0.86, 0, 0.07, 0.995],
											duration: 1,
											delay: 1.5,
										}}
										className="leading-[130px] lgOnly:leading-[98px] mdOnly:leading-[75px] smOnly:leading-[50px] xm:leading-[45px]">
										<Image
											width={120}
											height={50}
											src={workizhero}
											alt="img"
											className="w-auto h-[95px] lgOnly:w-auto lgOnly:h-auto mdOnly:w-[100px] mdOnly:h-[63px] smOnly:w-[74px] smOnly:h-[45px] xm:w-[64px] xm:h-[40px] object-cover xlOnly:mt-[15px] mt-[10px] rounded-[10px]"
										/>
									</motion.span>
									<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
										WORKIZ EASY
									</h1>
								</div>
							</h1>
						</div>
					</div>
					<div className="w-full border-t border-[#21212155] pt-[20px] ">
						<div className="w-full flex justify-between smOnly:gap-[25px] xm:gap-[25px] padding-x smOnly:flex-col xm:flex-col">
							<div className="w-[50%] smOnly:w-full xm:w-full">
								<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
									Description:
								</h3>
							</div>
							<div className="w-[50%] smOnly:w-full xm:w-full smOnly:flex-col xm:flex-col flex gap-[20px]">
								<div className="w-[50%] smOnly:w-full xm:w-full flex flex-col gap-y-[40px]">
									<p className="paragraph font-NeueMontreal text-secondry">
										Onboarding, internal and sales <br />
										presentations for software startup.
									</p>
								</div>
								<div className="flex flex-col gap-[10px]">
									<div className="w-fit rounded-[50px] border border-[#212121] cursor-pointer">
										<Link
											className="small-text font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all duration-300 ease-in-out hover:text-white"
											href="/services/">
											<Rounded
												className="py-[3px]"
												backgroundColor="#000">
												<p className="z-10 px-[15px]">
													onboarding presentations
												</p>
											</Rounded>
										</Link>
									</div>
									<div className="w-fit rounded-[50px] border border-[#212121] cursor-pointer">
										<Link
											className="small-text font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all duration-300 ease-in-out hover:text-white"
											href="/services/">
											<Rounded
												className="py-[3px]"
												backgroundColor="#000">
												<p className="z-10 px-[15px]">
													policy deck and playbook
												</p>
											</Rounded>
										</Link>
									</div>
									<div className="w-fit rounded-[50px] border border-[#212121] cursor-pointer">
										<Link
											className="small-text font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all duration-300 ease-in-out hover:text-white"
											href="/services/">
											<Rounded
												className="py-[3px]"
												backgroundColor="#000">
												<p className="z-10 px-[15px]">sales deck</p>
											</Rounded>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full pt-[100px] lgOnly:pt-[80px] mdOnly:pt-[60px] smOnly:pt-[40px] xm:pt-[40px]">
				<BackgroundImg src={workiz} />
			</div>
		</section>
	);
}
