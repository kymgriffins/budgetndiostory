import Link from "next/link";
import Image from "next/image";
import { Marquee, Tags } from "@/components";
import { blogPosts } from "@/utils/blogPosts";
import { getBlogImageById } from "@/utils/blogAssets";

export default function Stories() {
	const items = blogPosts.map((p) => {
		const excerpt =
			typeof p.content === "string" && p.content.length > 0
				? p.content.length > 140
					? `${p.content.slice(0, 140)}…`
					: p.content
				: "—";
		return {
			id: p.id,
			title: p.title,
			date: p.date,
			excerpt,
			href: `/edustories/${p.id}`,
			src: getBlogImageById(p.id),
		};
	});

	const tagsById: Record<number, Array<{ id: number; title: string; href: string }>> = {
		1: [
			{ id: 1, title: "budget basics", href: "/edustories" },
			{ id: 2, title: "youth impact", href: "/edustories" },
		],
		2: [
			{ id: 1, title: "who benefits", href: "/edustories" },
			{ id: 2, title: "priorities", href: "/edustories" },
		],
		3: [
			{ id: 1, title: "quick reads", href: "/edustories" },
			{ id: 2, title: "accountability", href: "/edustories" },
		],
	};

	return (
		<section
			id="stories"
			className="w-full bg-marquee rounded-t-[20px]"
			data-scroll-section>
			<div className="w-full bg-marquee z-10 relative rounded-t-[20px] pt-[100px] lgOnly:pt-[80px] mdOnly:pt-[60px] smOnly:pt-[40px] xm:pt-[40px]">
				<div data-animate="fade-up">
					<Marquee
						title="stories"
						className="pb-[50px] lgOnly:pb-[40px] mdOnly:pb-[30px] smOnly:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lgOnly:text-[380px] lgOnly:leading-[240px] mdOnly:text-[300px] mdOnly:leading-[160px] smOnly:text-[230px] smOnly:leading-[140px] xm:text-[130px] xm:leading-[80px] "
					/>
				</div>
			</div>

			<div
				className="w-full flex justify-between gap-y-[30px] padding-x py-[20px] flex-wrap"
				data-animate="cards">
				{items.map((item) => (
					<div
						className="w-[49%] smOnly:w-full xm:w-full"
						key={item.id}
						data-animate="card">
						<div className="flex gap-x-[10px] items-center pb-[10px]">
							<span className="w-[10px] h-[10px] rounded-full bg-secondry" />
							<h1 className="text-[18px] leading-[21px] uppercase font-medium font-NeueMontreal text-secondry">
								{item.title}
							</h1>
						</div>
						<Link
							href={item.href}
							className="block w-full rounded-[12px] overflow-hidden border border-[#21212122] bg-white hover:scale-[0.99] transition-transform duration-300">
							<div className="w-full overflow-hidden">
								<Image
									src={item.src}
									alt={item.title}
									className="w-full h-auto object-cover"
									priority={item.id === 1}
								/>
							</div>
							<div className="p-[16px]">
								<p className="small-text font-NeueMontreal text-gray-500 uppercase">
									{item.date ?? "—"}
								</p>
								<p className="paragraph font-NeueMontreal text-secondry mt-[8px]">
									{item.excerpt}
								</p>
								<p className="paragraph font-NeueMontreal text-secondry mt-[14px] underline underline-offset-4">
									Read story
								</p>
							</div>
						</Link>
						<div className="flex items-center gap-[10px] mt-[16px] flex-wrap">
							{(tagsById[item.id] ?? []).map((t) => (
								<Tags
									key={t.id}
									bgcolor="#212121"
									item={t}
									className="hover:text-white"
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}


