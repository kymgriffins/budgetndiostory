import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Landing() {
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
								},
							);
						},
					);

					// Stagger feature cards
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
							},
						);
						},
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
				<title>Budget Ndio Story — Your Money, Told Clearly</title>
				<meta
					name="description"
					content="Budget Ndio Story helps you track spending, plan ahead, and build better habits—one chapter at a time. Smooth, modern, and built for mobile." />
				<meta property="og:title" content="Budget Ndio Story" />
				<meta
					property="og:description"
					content="Track. Learn. Act. A modern budgeting experience that turns your money into a story you can improve." />
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
											Track • Learn • Act
										</p>
										<h1
											data-hero="title"
											className="font-FoundersGrotesk uppercase text-[#111] tracking-[-0.03em] mt-[12px] leading-[0.88] text-[clamp(52px,10vw,160px)]">
											Budget Ndio
											<br />
											Story
										</h1>
										<p
											data-animate="fade-up"
											className="mt-[16px] font-NeueMontreal text-[#212121]/75 text-[clamp(16px,2.1vw,22px)] leading-[1.45] max-w-[62ch]">
											Turn money chaos into clarity. Build a budget that actually fits your life, track
											spending without shame, and get story-like insights you can act on.
										</p>

										<div
											data-hero="cta"
											className="mt-[22px] flex items-center gap-[12px] flex-wrap">
											<Link
												href="/budgetndiostory"
												className="px-[18px] py-[12px] rounded-full bg-[#212121] text-[#f1f1f1] paragraph font-NeueMontreal hover:opacity-90 transition">
												Start the story (CTA)
											</Link>
											<Link
												href="/edustories"
												className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
												Explore EduStories
											</Link>
											<Link
												href="/contact"
												className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
												Contact
											</Link>
										</div>

										<div
											data-animate="fade-up"
											className="mt-[20px] flex gap-[10px] flex-wrap">
											<span className="px-[12px] py-[8px] rounded-full bg-white/70 border border-black/5 small-text font-NeueMontreal text-[#212121]/70">
												Mobile-first
											</span>
											<span className="px-[12px] py-[8px] rounded-full bg-white/70 border border-black/5 small-text font-NeueMontreal text-[#212121]/70">
												Smooth scroll
											</span>
											<span className="px-[12px] py-[8px] rounded-full bg-white/70 border border-black/5 small-text font-NeueMontreal text-[#212121]/70">
												Story insights
											</span>
										</div>
									</div>

									<div className="w-full">
										<div
											data-animate="fade-up"
											className="rounded-[28px] overflow-hidden bg-[#111] border border-black/10 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
											<div className="p-[22px] smOnly:p-[18px] xm:p-[16px]">
												<p className="font-NeueMontreal text-[#f1f1f1]/90 text-[16px] leading-[1.5]">
													“Your budget is a story. We help you write a better next chapter.”
												</p>
												<div className="mt-[16px] grid grid-cols-3 gap-[10px] smOnly:grid-cols-2 xm:grid-cols-2">
													<div className="rounded-[16px] bg-white/10 border border-white/10 p-[12px]">
														<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Today</p>
														<p className="paragraph font-NeueMontreal text-[#f1f1f1]">Track</p>
													</div>
													<div className="rounded-[16px] bg-white/10 border border-white/10 p-[12px]">
														<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Weekly</p>
														<p className="paragraph font-NeueMontreal text-[#f1f1f1]">Review</p>
													</div>
													<div className="rounded-[16px] bg-white/10 border border-white/10 p-[12px]">
														<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Next</p>
														<p className="paragraph font-NeueMontreal text-[#f1f1f1]">Improve</p>
													</div>
												</div>
											</div>
											<div className="h-[240px] smOnly:h-[200px] xm:h-[180px] bg-gradient-to-br from-[#00ff85]/20 via-[#f1f1f1]/5 to-[#ff2f55]/15" />
										</div>

										<div
											data-animate="fade-up"
											className="mt-[14px] rounded-[22px] bg-white/70 border border-black/5 p-[16px]">
											<p className="small-text font-NeueMontreal text-[#212121]/65">
												Motion: Locomotive Scroll + GSAP ScrollTrigger (scoped to this page).
											</p>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* STATS */}
						<section className="padding-x pt-[30px]">
							<div className="max-w-[1200px] mx-auto">
								<div
									data-animate="cards"
									className="grid grid-cols-4 gap-[12px] mdOnly:grid-cols-2 smOnly:grid-cols-2 xm:grid-cols-2">
									<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[16px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Designed for</p>
										<p className="text-[22px] leading-[1.2] font-NeueMontreal text-[#111] mt-[6px]">
											Everyday budgets
										</p>
									</div>
									<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[16px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Built around</p>
										<p className="text-[22px] leading-[1.2] font-NeueMontreal text-[#111] mt-[6px]">
											Habits
										</p>
									</div>
									<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[16px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Powered by</p>
										<p className="text-[22px] leading-[1.2] font-NeueMontreal text-[#111] mt-[6px]">
											Insights
										</p>
									</div>
									<div data-animate="card" className="rounded-[22px] bg-[#212121] text-[#f1f1f1] border border-black/10 p-[16px]">
										<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Outcome</p>
										<p className="text-[22px] leading-[1.2] font-NeueMontreal mt-[6px]">
											Confidence
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* CHAPTERS / FEATURES */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="flex items-end justify-between gap-[16px] flex-wrap">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										The chapters
									</h2>
									<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[60ch]">
										A complete budgeting flow designed like a story: capture what happened, learn from it,
										and choose what to do next.
									</p>
								</div>

								<div
									data-animate="cards"
									className="mt-[26px] grid grid-cols-3 gap-[16px] mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1">
									<div data-animate="card" className="rounded-[24px] bg-white/80 border border-black/5 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Chapter 01</p>
										<p className="text-[22px] font-NeueMontreal text-[#111] mt-[10px]">Set the budget</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px]">
											Define your monthly plan in plain language: needs, wants, savings—no spreadsheet pain.
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-white/80 border border-black/5 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Chapter 02</p>
										<p className="text-[22px] font-NeueMontreal text-[#111] mt-[10px]">Track spending</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px]">
											Log quickly, stay consistent, and see where money actually goes—especially the “small” stuff.
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-white/80 border border-black/5 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Chapter 03</p>
										<p className="text-[22px] font-NeueMontreal text-[#111] mt-[10px]">Review & learn</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px]">
											Get story-like insights: patterns, triggers, and “what changed this week?”
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-white/80 border border-black/5 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Chapter 04</p>
										<p className="text-[22px] font-NeueMontreal text-[#111] mt-[10px]">Make the next move</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px]">
											Adjust categories, set a goal, or start a “no-spend” challenge—small moves that compound.
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-[#111] text-[#f1f1f1] border border-black/10 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Chapter 05</p>
										<p className="text-[22px] font-NeueMontreal mt-[10px]">EduStories built-in</p>
										<p className="paragraph font-NeueMontreal text-[#f1f1f1]/70 mt-[10px]">
											Learn the “why” behind the numbers—bite-sized stories that make budgeting stick.
										</p>
									</div>
									<div data-animate="card" className="rounded-[24px] bg-[#212121] text-[#f1f1f1] border border-black/10 p-[20px]">
										<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Chapter 06</p>
										<p className="text-[22px] font-NeueMontreal mt-[10px]">One clear CTA</p>
										<p className="paragraph font-NeueMontreal text-[#f1f1f1]/70 mt-[10px]">
											Start your Budget Ndio Story, set a plan, and take control—today.
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
											A simple loop you’ll repeat until budgeting becomes automatic.
										</p>
									</div>

									<div data-animate="cards" className="mt-[18px] grid grid-cols-3 gap-[14px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
										<div data-animate="card" className="rounded-[22px] bg-white border border-black/5 p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Step 01</p>
											<p className="paragraph font-NeueMontreal mt-[10px]">Create your plan</p>
											<p className="small-text font-NeueMontreal text-[#212121]/65 mt-[8px]">
												Set realistic targets. Keep it simple. Make it yours.
											</p>
										</div>
										<div data-animate="card" className="rounded-[22px] bg-white border border-black/5 p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Step 02</p>
											<p className="paragraph font-NeueMontreal mt-[10px]">Track in seconds</p>
											<p className="small-text font-NeueMontreal text-[#212121]/65 mt-[8px]">
												Log spending fast—especially on mobile.
											</p>
										</div>
										<div data-animate="card" className="rounded-[22px] bg-white border border-black/5 p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Step 03</p>
											<p className="paragraph font-NeueMontreal mt-[10px]">Review & adjust</p>
											<p className="small-text font-NeueMontreal text-[#212121]/65 mt-[8px]">
												Close the week. Learn the pattern. Improve the next chapter.
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
										See the flow
									</h2>
									<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[60ch]">
										Quick previews of the experience (lightweight placeholders that still look premium).
									</p>
								</div>

								<div
									data-animate="cards"
									className="mt-[22px] grid grid-cols-3 gap-[14px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
									<div data-animate="card" className="rounded-[26px] overflow-hidden bg-white border border-black/5">
										<div className="p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Dashboard</p>
											<p className="paragraph font-NeueMontreal mt-[8px]">Where you are today</p>
										</div>
										<div className="h-[220px] bg-gradient-to-br from-black/5 via-black/0 to-black/10" />
									</div>
									<div data-animate="card" className="rounded-[26px] overflow-hidden bg-white border border-black/5">
										<div className="p-[18px]">
											<p className="small-text font-NeueMontreal text-[#212121]/60">Categories</p>
											<p className="paragraph font-NeueMontreal mt-[8px]">Clarity by bucket</p>
										</div>
										<div className="h-[220px] bg-gradient-to-br from-[#00ff85]/15 via-black/0 to-black/10" />
									</div>
									<div data-animate="card" className="rounded-[26px] overflow-hidden bg-[#111] border border-black/10">
										<div className="p-[18px]">
											<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">Insights</p>
											<p className="paragraph font-NeueMontreal mt-[8px] text-[#f1f1f1]">Your story, explained</p>
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
												Start your next chapter
											</h3>
											<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px] max-w-[62ch]">
												Define your budget, track spending, and get a clear review of what changed—then
												decide what to improve next.
											</p>
										</div>
										<div className="flex items-center gap-[12px] flex-wrap">
											<Link
												href="/budgetndiostory"
												className="px-[18px] py-[12px] rounded-full bg-[#212121] text-[#f1f1f1] paragraph font-NeueMontreal hover:opacity-90 transition">
												Open the app
											</Link>
											<Link
												href="/edustories"
												className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
												Learn first
											</Link>
										</div>
									</div>
									<p className="mt-[16px] small-text font-NeueMontreal text-[#212121]/55">
										Note: this landing page is standalone — it does not reuse any components besides the global Navbar.
									</p>
								</div>
							</div>
						</section>

						{/* LANDING-ONLY FOOTER */}
						<footer className="padding-x pb-[70px] smOnly:pb-[55px] xm:pb-[55px]">
							<div className="max-w-[1200px] mx-auto">
								<div className="rounded-[28px] bg-[#111] text-[#f1f1f1] border border-black/10 p-[22px] smOnly:p-[18px] xm:p-[18px]">
									<div className="flex items-start justify-between gap-[18px] flex-wrap">
										<div className="min-w-[240px]">
											<p className="text-[14px] tracking-[0.14em] uppercase font-NeueMontreal text-[#f1f1f1]/70">
												Budget Ndio Story
											</p>
											<p className="mt-[10px] small-text font-NeueMontreal text-[#f1f1f1]/70 max-w-[44ch]">
												Make budgeting human. Learn the why, track the now, and write a better next chapter.
											</p>
										</div>

										<div className="grid grid-cols-3 gap-[18px] smOnly:grid-cols-2 xm:grid-cols-2">
											<div>
												<p className="small-text font-NeueMontreal text-[#f1f1f1]/60 uppercase tracking-wide">
													Product
												</p>
												<div className="mt-[10px] flex flex-col gap-[8px]">
													<Link className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white" href="/budgetndiostory">
														App
													</Link>
													<Link className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white" href="/edustories">
														EduStories
													</Link>
													<Link className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white" href="/insights">
														Insights
													</Link>
												</div>
											</div>
											<div>
												<p className="small-text font-NeueMontreal text-[#f1f1f1]/60 uppercase tracking-wide">
													Company
												</p>
												<div className="mt-[10px] flex flex-col gap-[8px]">
													<Link className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white" href="/contact">
														Contact
													</Link>
													<Link className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white" href="/services">
														Services
													</Link>
													<Link className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white" href="/">
														Home
													</Link>
												</div>
											</div>
											<div>
												<p className="small-text font-NeueMontreal text-[#f1f1f1]/60 uppercase tracking-wide">
													Get started
												</p>
												<div className="mt-[10px] flex flex-col gap-[8px]">
													<Link className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white" href="/landing">
														Landing
													</Link>
													<Link className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white" href="/budgetndiostory">
														Start now
													</Link>
												</div>
											</div>
										</div>
									</div>

									<div className="mt-[18px] pt-[14px] border-t border-white/10 flex items-center justify-between gap-[12px] flex-wrap">
										<p className="small-text font-NeueMontreal text-[#f1f1f1]/55">
											© {new Date().getFullYear()} Budget Ndio Story. Landing-only footer.
										</p>
										<p className="small-text font-NeueMontreal text-[#f1f1f1]/55">
											Made for every screen size.
										</p>
									</div>
								</div>
							</div>
						</footer>
					</main>
				</div>
			</div>
		</>
	);
}


