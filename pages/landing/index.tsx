import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Landing() {
	const scrollerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let loco: any;
		let ctx: any;
		let gsap: any;
		let ScrollTrigger: any;

		const el = scrollerRef.current;
		if (!el) return;

		let cancelled = false;

		(async () => {
			try {
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
						content: el,
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
					// Hero title reveal
					gsap.fromTo(
						"[data-hero='title']",
						{ y: 24, opacity: 0 },
						{ y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
					);
					gsap.fromTo(
						"[data-hero='sub']",
						{ y: 18, opacity: 0 },
						{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 },
					);

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
				<title>Budget Ndio Story — Landing</title>
				<meta
					name="description"
					content="Budget Ndio Story: learn, track, and act on your money story. Build habits with simple budgeting and education." />
			</Head>

			<div
				ref={scrollerRef}
				data-scroll-container
				className="relative min-h-screen bg-[#f1f1f1] text-[#212121]"
				style={{ position: "relative" }}>
				{/* Spacer for fixed navbar height */}
				<div className="h-[8vh]" />

				<section className="padding-x pt-[60px] mdOnly:pt-[40px] smOnly:pt-[30px] xm:pt-[24px]">
					<div className="max-w-[1200px] mx-auto">
						<div className="flex items-start justify-between gap-[30px] mdOnly:flex-col smOnly:flex-col xm:flex-col">
							<div className="flex-1">
								<p
									data-hero="sub"
									className="paragraph font-NeueMontreal text-secondry/90 uppercase tracking-wide">
									Your money deserves a story you can understand.
								</p>
								<h1
									data-hero="title"
									className="heading font-FoundersGrotesk uppercase text-[#111] mt-[16px] mdOnly:mt-[12px] smOnly:mt-[10px] xm:mt-[10px]">
									Budget Ndio <br className="mdOnly:hidden smOnly:hidden xm:hidden" />
									Story
								</h1>
								<p
									data-animate="fade-up"
									className="sub-paragraph font-NeueMontreal text-[#212121]/80 mt-[18px] max-w-[56ch]">
									A clean, modern budgeting experience that helps you track spending, plan ahead,
									and build better habits—one story chapter at a time.
								</p>

								<div
									data-animate="fade-up"
									className="mt-[26px] flex items-center gap-[14px] flex-wrap">
									<Link
										href="/budgetndiostory"
										className="px-[18px] py-[12px] rounded-full bg-[#212121] text-[#f1f1f1] paragraph font-NeueMontreal hover:opacity-90 transition">
										Start your Budget Ndio Story
									</Link>
									<Link
										href="/contact"
										className="px-[18px] py-[12px] rounded-full border border-[#212121]/30 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
										Talk to us
									</Link>
								</div>

								<div
									data-animate="fade-up"
									className="mt-[28px] grid grid-cols-3 gap-[10px] smOnly:grid-cols-1 xm:grid-cols-1">
									<div className="rounded-[16px] bg-white/70 border border-black/5 p-[14px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Built for</p>
										<p className="paragraph font-NeueMontreal">Everyday budgets</p>
									</div>
									<div className="rounded-[16px] bg-white/70 border border-black/5 p-[14px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Focus</p>
										<p className="paragraph font-NeueMontreal">Clarity & habits</p>
									</div>
									<div className="rounded-[16px] bg-white/70 border border-black/5 p-[14px]">
										<p className="small-text font-NeueMontreal text-[#212121]/60">Outcome</p>
										<p className="paragraph font-NeueMontreal">Confidence</p>
									</div>
								</div>
							</div>

							<div className="flex-1 w-full">
								<div
									data-animate="fade-up"
									className="w-full rounded-[24px] overflow-hidden bg-[#111] border border-black/10 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
									<div className="p-[22px] mdOnly:p-[18px] smOnly:p-[16px] xm:p-[16px]">
										<p className="paragraph font-NeueMontreal text-[#f1f1f1]/90">
											“Budget Ndio Story turns money tracking into a narrative—so you always know
											where you are, and what’s next.”
										</p>
										<div className="mt-[18px] flex items-center justify-between gap-[14px] flex-wrap">
											<div className="flex items-center gap-[10px]">
												<div className="w-[34px] h-[34px] rounded-full bg-[#f1f1f1]/15 border border-white/10" />
												<div>
													<p className="small-text font-NeueMontreal text-[#f1f1f1]/70">
														Budget Coach Mode
													</p>
													<p className="small-text font-NeueMontreal text-[#f1f1f1]/50">
														Smart prompts & reviews
													</p>
												</div>
											</div>
											<p className="small-text font-NeueMontreal text-[#f1f1f1]/50">
												Smooth scroll powered by Locomotive + GSAP
											</p>
										</div>
									</div>
									<div className="h-[220px] mdOnly:h-[200px] smOnly:h-[180px] xm:h-[160px] bg-gradient-to-br from-[#00ff85]/20 via-[#f1f1f1]/5 to-[#ff2f55]/15" />
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="padding-x padding-y">
					<div className="max-w-[1200px] mx-auto">
						<div data-animate="fade-up" className="flex items-end justify-between gap-[16px] flex-wrap">
							<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
								What you get
							</h2>
							<p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[52ch]">
								Designed to match the existing aesthetic—clean, bold typography, calm background,
								and modern motion—while staying fully responsive.
							</p>
						</div>

						<div data-animate="cards" className="mt-[28px] grid grid-cols-3 gap-[16px] mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1">
							<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[18px]">
								<p className="small-text font-NeueMontreal text-[#212121]/60">01</p>
								<p className="paragraph font-NeueMontreal mt-[10px]">
									Simple tracking that doesn’t shame you—just shows the truth.
								</p>
							</div>
							<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[18px]">
								<p className="small-text font-NeueMontreal text-[#212121]/60">02</p>
								<p className="paragraph font-NeueMontreal mt-[10px]">
									Story-based insights: patterns, triggers, and next actions.
								</p>
							</div>
							<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[18px]">
								<p className="small-text font-NeueMontreal text-[#212121]/60">03</p>
								<p className="paragraph font-NeueMontreal mt-[10px]">
									Build habits with a clear plan: budget → spend → review → improve.
								</p>
							</div>
							<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[18px]">
								<p className="small-text font-NeueMontreal text-[#212121]/60">04</p>
								<p className="paragraph font-NeueMontreal mt-[10px]">
									Education-first: learn what to do, then do it.
								</p>
							</div>
							<div data-animate="card" className="rounded-[22px] bg-white/80 border border-black/5 p-[18px]">
								<p className="small-text font-NeueMontreal text-[#212121]/60">05</p>
								<p className="paragraph font-NeueMontreal mt-[10px]">
									Works great on mobile—designed for real life.
								</p>
							</div>
							<div data-animate="card" className="rounded-[22px] bg-[#212121] text-[#f1f1f1] border border-black/10 p-[18px]">
								<p className="small-text font-NeueMontreal text-[#f1f1f1]/60">06</p>
								<p className="paragraph font-NeueMontreal mt-[10px]">
									One clear CTA: start the story, set a budget, and move.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="padding-x pb-[110px] lgOnly:pb-[90px] mdOnly:pb-[70px] smOnly:pb-[60px] xm:pb-[60px]">
					<div className="max-w-[1200px] mx-auto">
						<div
							data-animate="fade-up"
							className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[24px] mdOnly:p-[20px] smOnly:p-[18px] xm:p-[18px]">
							<div className="flex items-end justify-between gap-[16px] flex-wrap">
								<div>
									<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Ready to start?
									</h3>
									<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[10px] max-w-[60ch]">
										Create your first chapter: define your budget, track spend, and get a clear review
										of where your money actually goes.
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
										className="px-[18px] py-[12px] rounded-full border border-[#212121]/30 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
										Learn with EduStories
									</Link>
								</div>
							</div>

							<div
								data-animate="fade-up"
								className="mt-[18px] small-text font-NeueMontreal text-[#212121]/55">
								No extra shared components here—just Navbar + this page.
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}


