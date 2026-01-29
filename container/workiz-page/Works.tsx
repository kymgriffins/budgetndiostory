import Link from "next/link";
import { workizItem } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import { Marquee, ProjectCard, Rounded, Tags } from "@/components";

export default function Works() {
	return (
		<section className="w-full bg-marquee rounded-t-[20px]">
			<div className="w-full bg-marquee z-10 relative rounded-t-[20px] pt-[100px] lgOnly:pt-[80px] mdOnly:pt-[60px] smOnly:pt-[40px] xm:pt-[40px]">
				<Marquee
					title="other projects"
					className="pb-[50px] lgOnly:pb-[40px] mdOnly:pb-[30px] smOnly:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lgOnly:text-[380px] lgOnly:leading-[240px] mdOnly:text-[300px] mdOnly:leading-[160px] smOnly:text-[230px] smOnly:leading-[140px] xm:text-[130px] xm:leading-[80px] "
				/>
			</div>
			<div className="w-full flex justify-between gap-y-[30px] padding-x py-[20px] flex-wrap">
				{workizItem.map((item) => (
					<div
						className="w-[49%] smOnly:w-full xm:w-full"
						key={item.id}>
						<div className="flex gap-x-[10px] items-center pb-[10px]">
							<span className="w-[10px] h-[10px] rounded-full bg-white" />
							<h1 className="text-[18px] leading-[21px] uppercase font-medium font-NeueMontreal text-white">
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
									className="text-white hover:text-secondry"
									bgcolor="#fff"
									item={link}
									key={link.id}
								/>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="w-full flex padding-y justify-center">
				<div className="flex items-center justify-between bg-white cursor-pointer rounded-full group">
					<Link
						className="paragraph text-secondry uppercase font-normal font-NeueMontreal"
						href={"/presentation"}>
						<Rounded
							className="py-[6px]"
							backgroundColor="#212121">
							<p className="text-secondry z-10 px-[10px] ml-[15px] py-[6px] group-hover:text-white">
								view all case studies
							</p>
							<div className="bg-secondry p-[10px] rounded-full scale-[0.3] mr-[10px] group-hover:scale-[0.9] transition-all z-10 text-secondry group-hover:bg-white  duration-300 ease-in-out">
								<ArrowUpRight
									strokeWidth={1.5}
									size={30}
									className="scale-[0] group-hover:scale-[1]"
								/>
							</div>
						</Rounded>
					</Link>
				</div>
			</div>
		</section>
	);
}
