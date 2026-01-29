import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import LandingFooter from "@/components/LandingFooter";

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

					// Stagger feature cards (matches landing behavior)
					(gsap.utils.toArray("[data-animate='cards']") as HTMLElement[]).forEach(
						(wrap) => {
							const cards = wrap.querySelectorAll<HTMLElement>("[data-animate='card']");
							if (!cards.length) return;
							gsap.fromTo(
								cards,
								{ y: 30, opacity: 0 },
								{
									y: 0,
									opacity: 1,
									duration: 0.7,
									ease: "power3.out",
									stagger: 0.08,
									scrollTrigger: { trigger: wrap, start: "top 80%" },
								}
							);
						}
					);
				}, el);

				ScrollTrigger.refresh();
				loco?.resize?.();
			} catch {
				// no-op: page still renders without smooth scroll
			}
		})();

		return () => {
			cancelled = true;
			try {
				ctx?.revert?.();
				loco?.destroy?.();
			} catch {
				// no-op
			}
		};
	}, []);

	return (
		<>
			<Head>
				<title>Budget Ndio Story — The Kenyan Budget, Told Clearly</title>
				<meta
					name="description"
					content="Budget Ndio Story translates national and county budgets into short, verifiable stories that help citizens understand where public money goes and how to act." />
				<meta property="og:title" content="Budget Ndio Story — Civic Budget Stories" />
				<meta
					property="og:description"
					content="Track. Verify. Act. Stories, reports and multimedia that make public budgets clear and accountable." />
				<meta name="theme-color" content="#f1f1f1" />
			</Head>

			<div
				ref={scrollerRef}
				data-scroll-container
				className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#f1f1f1] text-[#212121]"
				style={{ position: "relative" }}>
				<div ref={contentRef} data-scroll-content>
					{/* Spacer for fixed navbar height (desktop + mobile nav are both 8vh) */}
					<div className="h-[8vh]" />

					<a
						href="#landing-content"
						className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full">
						Skip to content
					</a>

					<main id="landing-content">
						{/* HERO */}
						<section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
							<div className="max-w-[1200px] mx-auto">
								<div className="grid grid-cols-2 gap-[28px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1 items-start">
									<div>
										<p
											data-hero="sub"
											className="text-[12px] tracking-[0.18em] uppercase font-NeueMontreal text-[#212121]/70">
											The Kenyan Budget, Told as a Story
										</p>
										<h1
											data-hero="title"
											className="font-FoundersGrotesk uppercase text-[#111] tracking-[-0.03em] mt-[12px] leading-[0.88] text-[clamp(52px,10vw,160px)]">
											The Kenyan Budget.
											<br />
											Explained in Stories.
										</h1>
										<p
											data-animate="fade-up"
											className="mt-[16px] font-NeueMontreal text-[#212121]/75 text-[clamp(16px,2.1vw,22px)] leading-[1.45] max-w-[62ch]">
											Budget Ndio Story turns budgets into clear, local narratives—videos, field reports,
											podcasts and photo essays that show what was budgeted, what exists on the ground,
											and who benefits. Evidence-first, youth-focused, and built for civic action.
										</p>

										<div
											data-hero="cta"
											className="mt-[22px] flex items-center gap-[12px] flex-wrap">
											<Link
												href="/edustories"
												className="px-[18px] py-[12px] rounded-full bg-[#212121] text-[#f1f1f1] paragraph font-NeueMontreal hover:opacity-90 transition">
												Explore stories
											</Link>
											<Link
												href="/report"
												className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
												Report a finding
											</Link>
											<Link
												href="/participate"
												className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
												Get involved
											</Link>
										</div>

										<div
											data-animate="fade-up"
											className="mt-[20px] flex gap-[10px] flex-wrap">
											<span className="px-[12px] py-[8px] rounded-full bg-white/70 border border-black/5 small-text font-NeueMontreal text-[#212121]/70">
													National 
											</span>
											<span className="px-[12px] py-[8px] rounded-full bg-white/70 border border-black/5 small-text font-NeueMontreal text-[#212121]/70">
												County 
											</span>
											<span className="px-[12px] py-[8px] rounded-full bg-white/70 border border-black/5 small-text font-NeueMontreal text-[#212121]/70">
												Civic action
											</span>
										</div>
									</div>

									<div className="w-full">
										<div
											data-animate="fade-up"
											className="rounded-[28px] overflow-hidden bg-[#111] border border-black/10 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
											<div className="p-[22px] smOnly:p-[18px] xm:p-[16px]">
												<p className="font-NeueMontreal text-[#f1f1f1]/90 text-[16px] leading-[1.5]">
													"Hii budget ni yako. If you don't understand it, someone else will decide your future."
												</p>
												<div className="mt-[16px] grid grid-cols-3 gap-[10px] smOnly:grid-cols-2 xm:grid-cols-2">
													<div className="rounded-[16px] bg-white/10 border border-white/10 p-[12px]">
														<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Budgeted</p>
														<p className="paragraph font-NeueMontreal text-[#f1f1f1]">What was promised</p>
													</div>
													<div className="rounded-[16px] bg-white/10 border border-white/10 p-[12px]">
														<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Reality</p>
														<p className="paragraph font-NeueMontreal text-[#f1f1f1]">What exists</p>
													</div>
													<div className="rounded-[16px] bg-white/10 border border-white/10 p-[12px]">
														<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Action</p>
														<p className="paragraph font-NeueMontreal text-[#f1f1f1]">What you can do</p>
													</div>
												</div>
											</div>
											<div className="h-[240px] smOnly:h-[200px] xm:h-[180px] bg-gradient-to-br from-[#00ff85]/20 via-[#f1f1f1]/5 to-[#ff2f55]/15" />
										</div>

                                        
									</div>
								</div>
							</div>
						</section>

						{/* QUICK SNAPSHOT */}
						<section className="padding-x pt-[30px]">
							<div className="max-w-[1200px] mx-auto">
										<div
											data-animate="cards"
											className="grid grid-cols-4 gap-[12px] mdOnly:grid-cols-2 smOnly:grid-cols-2 xm:grid-cols-2">
											<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[16px]">
												<p className="small-text font-NeueMontreal text-[#212121]/60">Featured</p>
												<p className="text-[22px] leading-[1.2] font-NeueMontreal text-[#111] mt-[6px]">
													Story of the week
												</p>
											</div>
											<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[16px]">
												<p className="small-text font-NeueMontreal text-[#212121]/60">Snapshot</p>
												<p className="text-[22px] leading-[1.2] font-NeueMontreal text-[#111] mt-[6px]">
													Budget line highlights
												</p>
											</div>
											<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[16px]">
												<p className="small-text font-NeueMontreal text-[#212121]/60">Formats</p>
												<p className="text-[22px] leading-[1.2] font-NeueMontreal text-[#111] mt-[6px]">
													Field reports • Video • Audio
												</p>
											</div>
											<div data-animate="card" className="rounded-[22px] bg-[#212121] text-[#f1f1f1] border border-black/10 p-[16px]">
												<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Participation</p>
												<p className="text-[22px] leading-[1.2] font-NeueMontreal mt-[6px]">
													Reports • Polls
												</p>
											</div>
										</div>
							</div>
						</section>

						{/* STORIES FROM THE GROUND */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="flex items-end justify-between gap-[16px] flex-wrap">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Stories from the ground
									</h2>
									<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[60ch]">
										Real reports and short features that answer: What was budgeted? What exists? Who benefits?
									</p>
								</div>

								<div
									data-animate="cards"
									className="mt-[26px] grid grid-cols-3 gap-[16px] mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1">
									<div data-animate="card" className="rounded-[24px] bg-white/80 border border-black/5 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Report 01</p>
										<p className="text-[22px] font-NeueMontreal text-[#111] mt-[10px]">This road was budgeted for Ksh 5M</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px]">
											Field verification from the county shows partial completion and missing signboards.
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-white/80 border border-black/5 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Report 02</p>
										<p className="text-[22px] font-NeueMontreal text-[#111] mt-[10px]">Clinic supplies: where did they go?</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px]">
											A short investigation into procurement and delivery timelines at the county level.
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-white/80 border border-black/5 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Report 03</p>
										<p className="text-[22px] font-NeueMontreal text-[#111] mt-[10px]">Who benefits?</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px]">
											Spotlights on contractors, beneficiaries, and discrepancies in budget allocations.
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-white/80 border border-black/5 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Report 04</p>
										<p className="text-[22px] font-NeueMontreal text-[#111] mt-[10px]">Community voices</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px]">
											First-hand accounts from residents about local projects and their impact.
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-[#111] text-[#f1f1f1] border border-black/10 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Report 05</p>
										<p className="text-[22px] font-NeueMontreal mt-[10px]">Data snapshots</p>
										<p className="paragraph font-NeueMontreal text-[#f1f1f1]/70 mt-[10px]">
											Visual summaries of budgets and spending for quick civic review.
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-[#212121] text-[#f1f1f1] border border-black/10 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Report 06</p>
										<p className="text-[22px] font-NeueMontreal mt-[10px]">Call to action</p>
										<p className="paragraph font-NeueMontreal text-[#f1f1f1]/70 mt-[10px]">
											Share evidence, sign petitions, or contact your county reps—small steps towards accountability.
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* HOW IT WORKS */}
						<section className="padding-x pb-[30px]">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="rounded-[30px] bg-white/70 border border-black/5 p-[22px] smOnly:p-[18px] xm:p-[16px]">
									<div className="flex items-end justify-between gap-[16px] flex-wrap">
										<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
											How it works
										</h3>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[58ch]">
											A simple process that turns complex public budgets into civic action.
										</p>
									</div>

									<div data-animate="cards" className="mt-[18px] grid grid-cols-3 gap-[14px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
										<div data-animate="card" className="rounded-[22px] bg-white border border-black/5 p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Step 01</p>
											<p className="paragraph font-NeueMontreal mt-[10px]">Identify the line</p>
											<p className="small-text font-NeueMontreal text-[#212121]/65 mt-[8px]">
												Find the budget line, allocation and expected outputs.
											</p>
										</div>
										<div data-animate="card" className="rounded-[22px] bg-white border border-black/5 p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Step 02</p>
											<p className="paragraph font-NeueMontreal mt-[10px]">Verify on the ground</p>
											<p className="small-text font-NeueMontreal text-[#212121]/65 mt-[8px]">
												Field reports, photos and community input confirm whether work was done.
											</p>
										</div>
										<div data-animate="card" className="rounded-[22px] bg-white border border-black/5 p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Step 03</p>
											<p className="paragraph font-NeueMontreal mt-[10px]">Act & amplify</p>
											<p className="small-text font-NeueMontreal text-[#212121]/65 mt-[8px]">
												Share findings, contact officials, or start a community campaign for accountability.
											</p>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* PREVIEW STRIP */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="flex items-end justify-between gap-[16px] flex-wrap">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Explore the Platform
									</h2>
									<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[60ch]">
										See how we turn budget documents into stories, trackers, and actionable insights.
									</p>
								</div>

								<div
									data-animate="cards"
									className="mt-[22px] grid grid-cols-3 gap-[14px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
									<div data-animate="card" className="rounded-[26px] overflow-hidden bg-white border border-black/5">
										<div className="p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Budget Tracker</p>
											<p className="paragraph font-NeueMontreal mt-[8px]">See allocations by sector</p>
										</div>
										<div className="h-[220px] bg-gradient-to-br from-black/5 via-black/0 to-black/10" />
									</div>
									<div data-animate="card" className="rounded-[26px] overflow-hidden bg-white border border-black/5">
										<div className="p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Story Archives</p>
											<p className="paragraph font-NeueMontreal mt-[8px]">Video, audio & field reports</p>
										</div>
										<div className="h-[220px] bg-gradient-to-br from-[#00ff85]/15 via-black/0 to-black/10" />
									</div>
									<div data-animate="card" className="rounded-[26px] overflow-hidden bg-[#111] border border-black/10">
										<div className="p-[18px]">
											<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Participation Hub</p>
											<p className="paragraph font-NeueMontreal mt-[8px] text-[#f1f1f1]">Report findings, vote on investigations</p>
										</div>
										<div className="h-[220px] bg-gradient-to-br from-[#ff2f55]/20 via-[#f1f1f1]/5 to-[#00ff85]/10" />
									</div>
								</div>
							</div>
						</section>

						{/* BIG CTA */}
						<section className="padding-x pb-[80px] smOnly:pb-[60px] xm:pb-[60px]">
							<div className="max-w-[1200px] mx-auto">
								<div
									data-animate="fade-up"
									className="rounded-[32px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] smOnly:p-[18px] xm:p-[18px]">
									<div className="flex items-end justify-between gap-[16px] flex-wrap">
										<div>
											<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
												Start Following Your County
											</h3>
											<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px] max-w-[62ch]">
												Explore budget stories, track public spending in your area, and join the conversation
												on where tax money goes and who benefits.
											</p>
										</div>
										<div className="flex items-center gap-[12px] flex-wrap">
											<Link
												href="/edustories"
												className="px-[18px] py-[12px] rounded-full bg-[#212121] text-[#f1f1f1] paragraph font-NeueMontreal hover:opacity-90 transition">
												Explore stories
											</Link>
											<Link
												href="/presentation"
												className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
												How budgets work
											</Link>
										</div>
									</div>
									
								</div>
							</div>
						</section>

						<LandingFooter />
					</main>
				</div>
			</div>
		</>
	);
}
