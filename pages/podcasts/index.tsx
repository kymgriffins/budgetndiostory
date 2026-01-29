import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import LandingFooter from "@/components/LandingFooter";

export default function Podcasts() {
	const scrollerRef = useRef<HTMLDivElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);

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

	const episodes = [
		{
			id: 1,
			title: "Budget Breakdowns: The Health Sector",
			duration: "24 min",
			excerpt: "A deep dive into how much Kenya spends on healthcare and where the gaps are.",
			type: "breakdown",
		},
		{
			id: 2,
			title: "Conversations: Dr. Jane on Tax Policy",
			duration: "32 min",
			excerpt: "Understanding tax collection, fairness, and what funds the government.",
			type: "conversation",
		},
		{
			id: 3,
			title: "Youth Voices: What We Want Funded",
			duration: "18 min",
			excerpt: "Kenyan youth discuss the budget priorities they want to see.",
			type: "voices",
		},
		{
			id: 4,
			title: "Audio Story: The Road That Never Was",
			duration: "28 min",
			excerpt: "Narrated account of Ksh 150M allocated for a road project that stalled.",
			type: "story",
		},
		{
			id: 5,
			title: "Budget 101: National vs County",
			duration: "16 min",
			excerpt: "A short explainer on the differences between national and county budgets.",
			type: "breakdown",
		},
		{
			id: 6,
			title: "On the Ground: Water Project Delays",
			duration: "26 min",
			excerpt: "Audio documentary on the Makueni water project and why it's delayed.",
			type: "story",
		},
	];

	return (
		<>
			<Head>
				<title>Podcasts & Audio Stories - Budget Ndio Story</title>
				<meta name="description" content="Listen to budget breakdowns, expert conversations, and stories from Kenyan communities." />
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
										🎙️ Listen to the Budget
									</span>
								</div>

								<h1 data-hero="title" className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]">
									Podcasts & Audio Stories
								</h1>

								<p data-hero="sub" className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]">
									Budget stories, conversations, and breakdowns for people who prefer to listen while commuting, cooking, or studying.
								</p>

								<div data-hero="cta" className="mt-[32px] flex items-center gap-[12px] flex-wrap">
									<Link
										href="/home"
										className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
										Back to Home
									</Link>
									<Link
										href="#episodes"
										className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
										Browse Episodes
									</Link>
								</div>
							</div>
						</section>

						{/* FEATURED EPISODE */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Latest Episode
									</h2>
								</div>

								<div
									data-animate="fade-up"
									className="rounded-[28px] overflow-hidden bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px]">
									<div className="grid grid-cols-2 gap-[30px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
										<div className="rounded-[20px] bg-gradient-to-br from-[#ff85b5]/30 to-[#ff85b5]/10 border border-[#ff85b5]/20 h-[300px] smOnly:h-[250px] xm:h-[250px] flex items-center justify-center">
											<div className="text-[80px]">🎙️</div>
										</div>
										<div className="flex flex-col justify-between">
											<div>
												<p className="small-text font-NeueMontreal text-[#212121]/60 uppercase tracking-wide">Episode 24</p>
												<h3 className="sub-heading font-FoundersGrotesk text-[#111] uppercase mt-[12px]">
													Budget Breakdowns: The Health Sector
												</h3>
												<p className="mt-[16px] paragraph font-NeueMontreal text-[#212121]/70">
													How much is spent on healthcare? Where do the gaps exist? Why are health centers underfunded? This episode breaks it down with data and real stories from health workers.
												</p>
												<div className="mt-[16px] flex gap-[16px] flex-wrap">
													<span className="px-[12px] py-[6px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/60">
														24 minutes
													</span>
													<span className="px-[12px] py-[6px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/60">
														Health & Hospitals
													</span>
												</div>
											</div>
											<div className="flex items-center gap-[12px] mt-[20px]">
												<button className="flex-1 px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
													▶ Play
												</button>
												<button className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
													📥
												</button>
												<button className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
													↗
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* EPISODE GRID */}
						<section id="episodes" className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										All Episodes
									</h2>
								</div>

								<div className="space-y-[14px]">
									{episodes.map((ep, idx) => (
										<div
											key={ep.id}
											className="rounded-[20px] bg-white border border-black/5 p-[22px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition group cursor-pointer">
											<div className="flex items-start justify-between gap-[16px] flex-wrap">
												<div className="flex-1">
													<div className="flex items-start gap-[12px] flex-wrap">
														<span className="px-[10px] py-[6px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/60">
															Ep {idx + 1}
														</span>
														<div>
															<h3 className="sub-heading font-FoundersGrotesk text-[#111]">
																{ep.title}
															</h3>
															<p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70">
																{ep.excerpt}
															</p>
														</div>
													</div>
												</div>
												<div className="text-right flex-shrink-0">
													<p className="small-text font-NeueMontreal text-[#212121]/60">
														{ep.duration}
													</p>
												</div>
											</div>

											<div className="mt-[16px] flex items-center gap-[10px]">
												<button className="px-[14px] py-[8px] rounded-full bg-[#212121] text-white small-text font-NeueMontreal hover:opacity-90 transition">
													▶ Play
												</button>
												<button className="px-[14px] py-[8px] rounded-full border border-[#212121]/25 text-[#212121] small-text font-NeueMontreal hover:bg-[#212121]/5 transition">
													📥 Download
												</button>
												<button className="px-[14px] py-[8px] rounded-full border border-[#212121]/25 text-[#212121] small-text font-NeueMontreal hover:bg-[#212121]/5 transition">
													📤 Share
												</button>
												<span className="px-[10px] py-[6px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/60 ml-auto">
													{ep.type}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</section>

						{/* SUBSCRIBE CTA */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="rounded-[28px] bg-[#111] text-white border border-white/10 p-[26px]">
									<div className="flex items-center justify-between gap-[16px] flex-wrap">
										<div>
											<h3 className="sub-heading font-FoundersGrotesk uppercase">
												Never Miss an Episode
											</h3>
											<p className="mt-[10px] paragraph font-NeueMontreal text-white/70">
												Subscribe on your favorite podcast platform or get WhatsApp notifications.
											</p>
										</div>
										<div className="flex items-center gap-[12px] flex-wrap">
											<button className="px-[18px] py-[12px] rounded-full bg-white text-[#111] paragraph font-NeueMontreal hover:opacity-90 transition">
												Subscribe
											</button>
											<button className="px-[18px] py-[12px] rounded-full border border-white/40 text-white paragraph font-NeueMontreal hover:bg-white/10 transition">
												WhatsApp
											</button>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* EXPLORE MORE CTA */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] flex items-end justify-between gap-[16px] flex-wrap">
									<div>
										<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
											Explore Other Formats
										</h3>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[62ch]">
											Prefer reading? Watch documentaries? Check out our stories and shorts.
										</p>
									</div>
									<div className="flex items-center gap-[12px]">
										<Link
											href="/stories"
											className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
											Stories
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
		</div>
	</>
	);
}
