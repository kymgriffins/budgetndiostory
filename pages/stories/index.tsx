import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LandingFooter from "@/components/LandingFooter";

export default function Stories() {
	const scrollerRef = useRef<HTMLDivElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);
	const [selectedCategory, setSelectedCategory] = useState("all");

	useEffect(() => {
		let loco: any;
		let ctx: any;
		let gsap: any;
		let ScrollTrigger: any;

		const el = scrollerRef.current;
		const content = contentRef.current;
		if (!el || !content) return;

		let cancelled = false;

		(async () => {
			try {
				if (
					typeof window !== "undefined" &&
					window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
				) {
					return;
				}

				const LocomotiveScroll = (await import("locomotive-scroll")).default;
				const gsapModule: any = await import("gsap");
				const stModule: any = await import("gsap/ScrollTrigger");

				gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
				ScrollTrigger = stModule.ScrollTrigger ?? stModule.default ?? stModule;

				if (!gsap?.registerPlugin || !ScrollTrigger) return;
				gsap.registerPlugin(ScrollTrigger);

				if (getComputedStyle(el).position === "static") {
					el.style.position = "relative";
				}

				loco = new LocomotiveScroll({
					lenisOptions: {
						wrapper: el,
						content,
						lerp: 0.08,
						smoothWheel: true,
						smoothTouch: true,
					} as any,
					scrollCallback: () => ScrollTrigger.update(),
					autoStart: true,
				});

				if (cancelled) return;

				const getScrollY = () => loco?.lenisInstance?.scroll ?? el.scrollTop ?? 0;

				ScrollTrigger.scrollerProxy(el, {
					scrollTop(value?: number) {
						if (typeof value === "number") {
							return loco?.scrollTo?.(value, { immediate: true });
						}
						return getScrollY();
					},
					getBoundingClientRect() {
						return {
							top: 0,
							left: 0,
							width: window.innerWidth,
							height: window.innerHeight,
						};
					},
					pinType:
						getComputedStyle(el).transform !== "none" ? "transform" : "fixed",
				});

				ScrollTrigger.defaults({ scroller: el });
				ScrollTrigger.addEventListener("refresh", () => loco?.update?.());

				ctx = gsap.context(() => {
					gsap.fromTo("[data-hero='sub']", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
					gsap.fromTo("[data-hero='title']", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.05 });
					gsap.fromTo("[data-hero='cta']", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", delay: 0.12 });

					(gsap.utils.toArray("[data-animate='fade-up']") as HTMLElement[]).forEach(
						(node) => {
							gsap.fromTo(
								node,
								{ y: 40, opacity: 0 },
								{
									y: 0,
									opacity: 1,
									duration: 0.8,
									ease: "power3.out",
									scrollTrigger: { trigger: node, start: "top 85%" },
								}
							);
						}
					);
				});

				return () => {
					cancelled = true;
					ctx?.revert?.();
					loco?.destroy?.();
					ScrollTrigger?.getAll?.().forEach?.((t: any) => t.kill?.());
				};
			} catch (err) {
				console.error(err);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	const stories = [
		{
			id: 1,
			title: "This Road Never Got Built: A Budget Story",
			category: "roads",
			excerpt: "Ksh 150M budgeted. Zero kilometers built. Where did it go?",
			readTime: "8 min read",
			image: "🛣️",
		},
		{
			id: 2,
			title: "Health Centers Without Medicine: The Nairobi County Story",
			category: "health",
			excerpt: "We visited 5 health centers with zero pharmaceutical budget.",
			readTime: "12 min read",
			image: "🏥",
		},
		{
			id: 3,
			title: "Youth Programs: Who's Getting the Money?",
			category: "youth",
			excerpt: "Tracking Ksh 2B in youth development funds across 3 counties.",
			readTime: "10 min read",
			image: "👥",
		},
		{
			id: 4,
			title: "School Feeding Program: Budget vs Reality",
			category: "education",
			excerpt: "What the budget promised vs. what students get to eat.",
			readTime: "9 min read",
			image: "🍽️",
		},
		{
			id: 5,
			title: "Water Project Delay: The Makueni County Investigation",
			category: "water",
			excerpt: "3-year delay on a water pipeline. How did the budget fail?",
			readTime: "11 min read",
			image: "💧",
		},
		{
			id: 6,
			title: "Agricultural Input Subsidy: Does It Reach Farmers?",
			category: "agriculture",
			excerpt: "We traced Ksh 8B from the budget to 50 farmers across the country.",
			readTime: "13 min read",
			image: "🌾",
		},
	];

	const categories = [
		{ id: "all", label: "All Stories" },
		{ id: "roads", label: "Infrastructure" },
		{ id: "health", label: "Health" },
		{ id: "education", label: "Education" },
		{ id: "youth", label: "Youth" },
		{ id: "water", label: "Water" },
		{ id: "agriculture", label: "Agriculture" },
	];

	const filteredStories = selectedCategory === "all" 
		? stories 
		: stories.filter(s => s.category === selectedCategory);

	return (
		<>
			<Head>
				<title>Stories from the Ground - Budget Ndio Story</title>
				<meta name="description" content="Real stories, documentaries, and field reports showing how Kenya's budget impacts communities." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div ref={scrollerRef} className="h-screen overflow-hidden">
				<div ref={contentRef}>
					<main className="w-full">
						{/* HERO */}
						<section className="padding-x padding-y min-h-[60vh] flex flex-col justify-center bg-gradient-to-br from-[#f1f1f1] to-white">
							<div className="max-w-[1200px] mx-auto w-full">
								<div data-hero="sub" className="inline-block mb-[20px]">
									<span className="px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/70">
										🎬 Real Stories, Real Impact
									</span>
								</div>

								<h1 data-hero="title" className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]">
									Stories from the Ground
								</h1>

								<p data-hero="sub" className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]">
									What was budgeted. What was promised. What exists. Who benefits. What went right or wrong.
								</p>

								<div data-hero="cta" className="mt-[32px] flex items-center gap-[12px] flex-wrap">
									<Link
										href="/home"
										className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
										Back to Home
									</Link>
								</div>
							</div>
						</section>

						{/* FILTERS */}
						<section className="padding-x py-[30px] sticky top-0 z-40 bg-white border-b border-black/5">
							<div className="max-w-[1200px] mx-auto">
								<div className="flex gap-[10px] overflow-x-auto pb-[10px]">
									{categories.map(cat => (
										<button
											key={cat.id}
											onClick={() => setSelectedCategory(cat.id)}
											className={`px-[14px] py-[8px] rounded-full whitespace-nowrap transition text-[14px] font-NeueMontreal ${
												selectedCategory === cat.id
													? "bg-[#212121] text-white"
													: "bg-white border border-black/10 text-[#212121] hover:border-black/20"
											}`}>
											{cat.label}
										</button>
									))}
								</div>
							</div>
						</section>

						{/* STORIES GRID */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div className="grid grid-cols-2 gap-[20px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
									{filteredStories.map(story => (
										<Link
											key={story.id}
											href={`/stories/${story.id}`}
											className="rounded-[26px] overflow-hidden bg-white border border-black/5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition group cursor-pointer"
										>
											<div className="p-[22px]">
												<div className="text-[48px] mb-[12px] group-hover:scale-110 transition">
													{story.image}
												</div>
												<h3 className="heading font-FoundersGrotesk text-[#111] line-clamp-2">
													{story.title}
												</h3>
												<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70 line-clamp-2">
													{story.excerpt}
												</p>
												<div className="mt-[16px] flex items-center justify-between gap-[12px]">
													<span className="small-text font-NeueMontreal text-[#212121]/60">
														{story.readTime}
													</span>
													<span className="px-[10px] py-[6px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/60">
														→
													</span>
												</div>
											</div>
											<div className="h-[180px] bg-gradient-to-br from-black/5 to-black/10" />
										</Link>
									))}
								</div>

								{filteredStories.length === 0 && (
									<div className="text-center py-[60px]">
										<p className="paragraph font-NeueMontreal text-[#212121]/70">
											No stories in this category yet. Check back soon.
										</p>
									</div>
								)}
							</div>
						</section>

						{/* CTA SECTION */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] flex items-end justify-between gap-[16px] flex-wrap">
									<div>
										<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
											Got a Story to Tell?
										</h3>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[62ch]">
											Know about a budget promise that fell through? Contact us. We're always looking for stories from the ground.
										</p>
									</div>
									<div className="flex items-center gap-[12px]">
										<Link
											href="/contact"
											className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
											Share a Story
										</Link>
										<Link
											href="/home"
											className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
											Home
										</Link>
									</div>
								</div>
							</div>
						</section>
				</main>
				<LandingFooter />
			</div>
		</div>	</>
	);
}