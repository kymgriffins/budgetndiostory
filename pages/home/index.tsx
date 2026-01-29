import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
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

				// Ensure correct offset calculations for scrollerProxy
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
					// Hero reveal
					gsap.fromTo("[data-hero='sub']", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
					gsap.fromTo("[data-hero='title']", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.05 });
					gsap.fromTo("[data-hero='cta']", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", delay: 0.12 });

					// Fade-up elements
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

	return (
		<>
			<Head>
				<title>Budget Ndio Story - The Kenyan Budget, Told as a Story</title>
				<meta
					name="description"
					content="Budget Ndio Story breaks down Kenya's national and county budgets through storytelling for youth. Watch stories, listen to podcasts, and understand where your money goes."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div ref={scrollerRef} className="h-screen overflow-hidden">
				<div ref={contentRef}>
					<main className="w-full">
						{/* HERO WITH BACKGROUND VIDEO */}
						<section className="padding-x padding-y min-h-screen flex flex-col justify-center relative">
							{/* Background Video */}
							<div className="absolute inset-0 -z-10 overflow-hidden rounded-[28px] mdOnly:rounded-[18px] smOnly:rounded-[12px] xm:rounded-[12px]">
								<video
									autoPlay
									muted
									loop
									className="w-full h-full object-cover"
									poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23212121' width='1920' height='1080'/%3E%3C/svg%3E"
								>
									<source src="https://videos.pexels.com/video-files/5064626/5064626-sd_640_360_30fps.mp4" type="video/mp4" />
								</video>
								{/* Dark Overlay */}
								<div className="absolute inset-0 bg-black/50" />
							</div>

							<div className="relative z-10 max-w-[1200px] mx-auto w-full">
								<div data-hero="sub" className="inline-block mb-[20px]">
									<span className="px-[14px] py-[8px] rounded-full bg-white/15 border border-white/25 small-text font-NeueMontreal text-[#f1f1f1]">
										🎬 A story everyone should know
									</span>
								</div>

								<h1 data-hero="title" className="heading font-FoundersGrotesk text-[#f1f1f1] uppercase leading-[1.2] max-w-[800px]">
									The Kenyan Budget, Told as a Story
								</h1>

								<p data-hero="sub" className="mt-[24px] sub-heading font-NeueMontreal text-[#f1f1f1]/80 max-w-[600px]">
									Where public money comes from, how it's spent, and why it matters—through stories, not spreadsheets.
								</p>

								<div data-hero="cta" className="mt-[32px] flex items-center gap-[12px] flex-wrap">
									<Link
										href="#featured-story"
										className="px-[18px] py-[12px] rounded-full bg-white text-[#212121] paragraph font-NeueMontreal hover:opacity-90 transition">
										Watch the Story
									</Link>
									<Link
										href="/stories"
										className="px-[18px] py-[12px] rounded-full border border-white/40 text-white paragraph font-NeueMontreal hover:bg-white/10 transition">
										Explore Stories
									</Link>
									<Link
										href="/podcasts"
										className="px-[18px] py-[12px] rounded-full border border-white/40 text-white paragraph font-NeueMontreal hover:bg-white/10 transition">
										Listen to Podcast
									</Link>
								</div>

								<div data-hero="sub" className="mt-[20px] flex gap-[10px] flex-wrap">
									<span className="px-[12px] py-[8px] rounded-full bg-white/15 border border-white/20 small-text font-NeueMontreal text-white/70">
										📊 Budget simplified
									</span>
									<span className="px-[12px] py-[8px] rounded-full bg-white/15 border border-white/20 small-text font-NeueMontreal text-white/70">
										🎙️ Youth-focused
									</span>
									<span className="px-[12px] py-[8px] rounded-full bg-white/15 border border-white/20 small-text font-NeueMontreal text-white/70">
										🇰🇪 Your budget, your story
									</span>
								</div>
							</div>
						</section>

						{/* FEATURED STORY OF THE WEEK */}
						<section id="featured-story" className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="flex items-end justify-between gap-[16px] flex-wrap mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										This Week's Story
									</h2>
									<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[60ch]">
										A deep dive into how budget allocation impacts real communities in Kenya.
									</p>
								</div>

								<div
									data-animate="fade-up"
									className="rounded-[28px] overflow-hidden bg-gradient-to-br from-white via-white to-white/70 border border-black/5 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
									<div className="grid grid-cols-2 gap-[0px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
										{/* Video */}
										<div className="h-[400px] smOnly:h-[280px] xm:h-[280px] bg-gradient-to-br from-[#212121]/10 to-[#212121]/5 relative overflow-hidden flex items-center justify-center">
											<div className="text-center text-[#212121]/40">
												<p className="paragraph font-NeueMontreal">📹 Featured Documentary</p>
											</div>
										</div>

										{/* Content */}
										<div className="p-[32px] smOnly:p-[22px] xm:p-[22px] flex flex-col justify-between">
											<div>
												<p className="small-text font-NeueMontreal text-[#212121]/60 uppercase tracking-wide">Featured Documentary</p>
												<h3 className="heading font-FoundersGrotesk text-[#111] uppercase mt-[14px]">
													This Road Never Got Built: A Budget Story
												</h3>
												<p className="mt-[16px] paragraph font-NeueMontreal text-[#212121]/70">
													Ksh 150M was allocated for a county road in 2022. Three years later, locals still wait. We tracked what happened to the money, who knew what, and what it means for your budget.
												</p>
											</div>

											<div className="mt-[24px] flex items-center gap-[16px]">
												<Link
													href="/stories/road-story"
													className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
													Read Story
												</Link>
												<Link
													href="/stories/road-story"
													className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
													Watch Documentary
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* QUICK BUDGET SNAPSHOT */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="flex items-end justify-between gap-[16px] flex-wrap mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Budget Snapshot
									</h2>
									<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[60ch]">
										Where your tax money goes—visual, not numbers-heavy.
									</p>
								</div>

								<div data-animate="fade-up" className="grid grid-cols-4 gap-[14px] mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1">
									<div className="rounded-[26px] overflow-hidden bg-white border border-black/5 p-[18px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Health</p>
										<p className="heading font-FoundersGrotesk text-[#111] mt-[8px]">14%</p>
										<div className="h-[80px] bg-gradient-to-br from-[#ff6b6b]/20 to-[#ff6b6b]/5 rounded-[12px] mt-[12px]" />
									</div>
									<div className="rounded-[26px] overflow-hidden bg-white border border-black/5 p-[18px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Education</p>
										<p className="heading font-FoundersGrotesk text-[#111] mt-[8px]">18%</p>
										<div className="h-[80px] bg-gradient-to-br from-[#4ecdc4]/20 to-[#4ecdc4]/5 rounded-[12px] mt-[12px]" />
									</div>
									<div className="rounded-[26px] overflow-hidden bg-white border border-black/5 p-[18px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Roads & Infrastructure</p>
										<p className="heading font-FoundersGrotesk text-[#111] mt-[8px]">22%</p>
										<div className="h-[80px] bg-gradient-to-br from-[#ffd93d]/20 to-[#ffd93d]/5 rounded-[12px] mt-[12px]" />
									</div>
									<div className="rounded-[26px] overflow-hidden bg-white border border-black/5 p-[18px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Youth Programs</p>
										<p className="heading font-FoundersGrotesk text-[#111] mt-[8px]">6%</p>
										<div className="h-[80px] bg-gradient-to-br from-[#ff85b5]/20 to-[#ff85b5]/5 rounded-[12px] mt-[12px]" />
									</div>
								</div>
							</div>
						</section>

						{/* CTA SECTION - EXPLORE CONTENT TYPES */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="flex items-end justify-between gap-[16px] flex-wrap mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Choose Your Way to Learn
									</h2>
									<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[60ch]">
										Budget Ndio Story comes in the format you prefer.
									</p>
								</div>

								<div
									data-animate="cards"
									className="grid grid-cols-3 gap-[14px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
									<Link
										href="/stories"
										className="rounded-[26px] overflow-hidden bg-white border border-black/5 p-[18px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition group cursor-pointer"
									>
										<p className="small-text font-NeueMontreal text-[#212121]/60">From the Ground</p>
										<p className="paragraph font-NeueMontreal mt-[8px] group-hover:text-[#212121]">Stories & Documentaries</p>
										<div className="h-[180px] bg-gradient-to-br from-[#00ff85]/15 via-black/0 to-black/10 rounded-[12px] mt-[12px]" />
										<p className="mt-[12px] small-text font-NeueMontreal text-[#212121]/50">Real people, real impact</p>
									</Link>
									<Link
										href="/podcasts"
										className="rounded-[26px] overflow-hidden bg-white border border-black/5 p-[18px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition group cursor-pointer"
									>
										<p className="small-text font-NeueMontreal text-[#212121]/60">Listen</p>
										<p className="paragraph font-NeueMontreal mt-[8px] group-hover:text-[#212121]">Podcasts & Audio Stories</p>
										<div className="h-[180px] bg-gradient-to-br from-[#ff85b5]/15 via-black/0 to-black/10 rounded-[12px] mt-[12px]" />
										<p className="mt-[12px] small-text font-NeueMontreal text-[#212121]/50">While commuting, working, studying</p>
									</Link>
									<Link
										href="/shorts"
										className="rounded-[26px] overflow-hidden bg-white border border-black/5 p-[18px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition group cursor-pointer"
									>
										<p className="small-text font-NeueMontreal text-[#212121]/60">Quick Hits</p>
										<p className="paragraph font-NeueMontreal mt-[8px] group-hover:text-[#212121]">Skits & Short Videos</p>
										<div className="h-[180px] bg-gradient-to-br from-[#ffd93d]/15 via-black/0 to-black/10 rounded-[12px] mt-[12px]" />
										<p className="mt-[12px] small-text font-NeueMontreal text-[#212121]/50">Funny, sharp, shareable</p>
									</Link>
								</div>
							</div>
						</section>

						{/* TRACKER CTA */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div
									data-animate="fade-up"
									className="rounded-[32px] bg-[#111] text-white border border-white/10 p-[26px] smOnly:p-[18px] xm:p-[18px]">
									<div className="flex items-end justify-between gap-[16px] flex-wrap">
										<div>
											<h3 className="sub-heading font-FoundersGrotesk uppercase">
												See Where the Money Went
											</h3>
											<p className="paragraph font-NeueMontreal text-white/70 mt-[10px] max-w-[62ch]">
												Browse interactive maps, track budget sectors, and see what's allocated, in progress, completed, or stalled.
											</p>
										</div>
										<Link
											href="/tracker"
											className="px-[18px] py-[12px] rounded-full bg-white text-[#111] paragraph font-NeueMontreal hover:opacity-90 transition flex-shrink-0">
											Open Tracker
										</Link>
									</div>
								</div>
							</div>
						</section>

						{/* PARTICIPATION CTA */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="flex items-end justify-between gap-[16px] flex-wrap mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Your Voice Matters
									</h2>
									<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[60ch]">
										This is not performative. Tell us what you want funded in your community.
									</p>
								</div>

								<div
									data-animate="fade-up"
									className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] smOnly:p-[18px] xm:p-[18px]">
									<div className="grid grid-cols-2 gap-[20px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
										<div>
											<p className="small-text font-NeueMontreal text-[#212121]/60 uppercase tracking-wide">Share Your Opinion</p>
											<h3 className="heading font-FoundersGrotesk text-[#111] uppercase mt-[12px]">
												What Should Be Funded Next?
											</h3>
											<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
												Answer quick polls, submit voice notes, or comment on stories. Your input shapes what we investigate next.
											</p>
											<Link
												href="/participate"
												className="mt-[16px] inline-block px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
												Participate Now
											</Link>
										</div>
										<div className="rounded-[16px] bg-gradient-to-br from-[#00ff85]/10 to-[#00ff85]/5 border border-[#00ff85]/20 p-[20px] flex flex-col justify-center">
											<p className="heading font-FoundersGrotesk text-[#212121]">42K</p>
											<p className="small-text font-NeueMontreal text-[#212121]/60">youth voices heard</p>
											<p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70">
												From polls, comments, and submissions in the last 3 months.
											</p>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* FOOTER CTA */}
						<section className="padding-x pb-[80px] smOnly:pb-[60px] xm:pb-[60px]">
							<div className="max-w-[1200px] mx-auto">
								<div
									data-animate="fade-up"
									className="rounded-[32px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] smOnly:p-[18px] xm:p-[18px]">
									<div className="flex items-end justify-between gap-[16px] flex-wrap">
										<div>
											<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
												Learn More About the Budget
											</h3>
											<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px] max-w-[62ch]">
												Understanding Kenya's budget is understanding your country's future. Let's break it down together.
											</p>
										</div>
										<div className="flex items-center gap-[12px] flex-wrap">
											<Link
												href="/budget-simplified"
												className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
												Budget 101
											</Link>
											<Link
												href="/about"
												className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
												About Us
											</Link>
										</div>
									</div>
								</div>
							</div>
						</section>
					</main>
				</div>
			</div>
		</>
	);
}
