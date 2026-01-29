import { Eyes } from "@/components";

export default function Hero() {
	return (
		<section className="w-full padding-x bg-about sticky top-0 h-[65vh]">
			<div className="w-full pt-[170px] pb-[20px]">
				<div className="w-fit relative">
					<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
						work
						<sup className="paragraph font-normal absolute top-[20px] ml-[10px] font-NeueMontreal">
							(9)
						</sup>
					</h1>
				</div>
			</div>
			<Eyes className="w-[300px] h-[300px] mdOnly:w-[200px] mdOnly:h-[200px] smOnly:w-[150px] smOnly:h-[150px] xm:w-[150px] xm:h-[150px] smOnly:flex-col xm:flex-col" />
		</section>
	);
}
