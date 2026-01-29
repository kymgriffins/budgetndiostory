import Link from "next/link";
import { Tags } from "@/components";

const topics = [
	{ id: 1, title: "budget basics", href: "/edustories" },
	{ id: 2, title: "where money goes", href: "/edustories" },
	{ id: 3, title: "accountability", href: "/edustories" },
	{ id: 4, title: "youth impact", href: "/edustories" },
];

export default function Hero() {
	return (
		<section className="w-full min-h-screen" data-scroll-section>
			<div className="w-full flex flex-col justify-between">
				<div className="w-full flex flex-col">
					<div className="w-full margin padding-x">
						<div data-animate="fade-up">
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
								EDU STORIES
							</h1>
							<p className="paragraph mt-[20px] text-secondry font-NeueMontreal max-w-[760px]">
								Budget stories, simplified. Learn how the budget works, who benefits, and
								how decisions show up in real life.
							</p>
						</div>
					</div>

					<div className="w-full border-t border-[#21212155] pt-[20px]">
						<div className="w-full flex justify-between padding-x smOnly:flex-col xm:flex-col gap-[20px]">
							<div className="w-[50%] smOnly:w-full xm:w-full">
								<h3
									className="paragraph font-medium text-secondry font-NeueMontreal"
									data-animate="fade-up">
									Explore:
								</h3>
							</div>
							<div
								className="w-[50%] smOnly:w-full xm:w-full flex flex-wrap items-center gap-[10px]"
								data-animate="fade-up">
								{topics.map((item) => (
									<Tags
										key={item.id}
										bgcolor="#212121"
										item={item}
										className="hover:text-white"
									/>
								))}
							</div>
						</div>
					</div>

					<div className="w-full padding-x padding-y">
						<div
							className="w-full flex items-center justify-between gap-[20px] smOnly:flex-col xm:flex-col"
							data-animate="fade-up">
							<div className="w-[60%] smOnly:w-full xm:w-full">
								<h2 className="sub-heading font-FoundersGrotesk uppercase text-secondry">
									From numbers to stories people can feel.
								</h2>
								<p className="paragraph mt-[10px] text-gray-500 font-NeueMontreal">
									We break down budgets into short, visual stories so students, youth, and
									communities can follow the money and ask better questions.
								</p>
							</div>
							<div className="w-fit">
								<Link
									href="#stories"
									className="paragraph font-NeueMontreal uppercase text-secondry link-flash">
									Start reading
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


