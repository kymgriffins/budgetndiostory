import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { mission, values, team } from "@/mockdata";

export default function About() {
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

	return (
		<>
			<Head>
				<title>About Us - Budget Ndio Story</title>
				<meta name="description" content="Who we are, why we exist, and our mission to make Kenya's budget accessible to youth." />
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
										👨‍👩‍👧‍👦 The Budget Ndio Story Family
									</span>
								</div>

								<h1 data-hero="title" className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]">
									Why We Exist
								</h1>

								<p data-hero="sub" className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]">
									Kenya's budget is everyone's business. But most people don't understand it. We're here to change that.
								</p>

								<div data-hero="cta" className="mt-[32px] flex items-center gap-[12px] flex-wrap">
									<Link
										href="/home"
										className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
										Back to Home
									</Link>
									<Link
										href="#mission"
										className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
										Read Our Story
									</Link>
								</div>
							</div>
						</section>

						{/* THE PROBLEM */}
						<section id="mission" className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										The Problem We're Solving
									</h2>
								</div>

								<div data-animate="fade-up" className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px]">
									<div className="grid grid-cols-2 gap-[30px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
										<div>
											<h3 className="heading font-FoundersGrotesk text-[#111]">Youth Disengagement</h3>
											<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
												18–35 year-olds largely don't participate in budget processes. They don't read budget documents. They don't attend public forums. But the budget affects their future employment, education, healthcare, and development.
											</p>
										</div>
										<div>
											<h3 className="heading font-FoundersGrotesk text-[#111]">Accessibility Gap</h3>
											<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
												Budget documents are PDFs. They're technical. They're long. They're designed for economists and government officials, not regular people. Public participation feels performative. No one listens.
											</p>
										</div>
										<div>
											<h3 className="heading font-FoundersGrotesk text-[#111]">Format Mismatch</h3>
											<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
												Youth consume content through short videos, podcasts, memes, and stories. They don't read formal reports. Budget communication hasn't caught up to how people actually consume information.
											</p>
										</div>
										<div>
											<h3 className="heading font-FoundersGrotesk text-[#111]">Accountability Void</h3>
											<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
												Money is allocated. Projects stall. Citizens never follow up. There's no bridge between the budget promise and the lived reality on the ground. No one connects the dots.
											</p>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* OUR MISSION */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Our Mission
									</h2>
								</div>

								<div data-animate="fade-up" className="rounded-[28px] bg-[#111] text-white border border-white/10 p-[26px]">
									<div className="max-w-[750px]">
										<p className="heading font-FoundersGrotesk text-white leading-[1.3]">
											Make Kenya's budget accessible, engaging, and accountable to youth through storytelling.
										</p>
										<p className="mt-[20px] paragraph font-NeueMontreal text-white/80">
											We break down the budget into stories. We show what was promised and what actually happened. We create space for youth voices. We don't politicize. We don't sell policy. We narrate. We translate. We investigate.
										</p>
										<p className="mt-[16px] paragraph font-NeueMontreal text-white/80">
											The budget is not numbers. The budget is people. The budget is stories.
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* OUR VALUES */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Our Values
									</h2>
								</div>

								<div className="grid grid-cols-2 gap-[20px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
									<div data-animate="fade-up" className="rounded-[26px] bg-white border border-black/5 p-[22px]">
										<div className="text-[40px] mb-[12px]">🎯</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Clarity First</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											No jargon. No technical language. If we can't explain it simply, we haven't understood it.
										</p>
									</div>
									<div data-animate="fade-up" className="rounded-[26px] bg-white border border-black/5 p-[22px]">
										<div className="text-[40px] mb-[12px]">🔍</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Truth Above All</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											Facts matter. We verify. We document. We don't sensationalize. We don't hide complexity behind simplicity.
										</p>
									</div>
									<div data-animate="fade-up" className="rounded-[26px] bg-white border border-black/5 p-[22px]">
										<div className="text-[40px] mb-[12px]">🤝</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Non-Partisan</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											We're not aligned with any party. We don't push any ideology. We ask: does it work? For whom? Why or why not?
										</p>
									</div>
									<div data-animate="fade-up" className="rounded-[26px] bg-white border border-black/5 p-[22px]">
										<div className="text-[40px] mb-[12px]">🎤</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Youth-Centered</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											We listen to young people. We feature young voices. We create space for youth to shape the narrative.
										</p>
									</div>
									<div data-animate="fade-up" className="rounded-[26px] bg-white border border-black/5 p-[22px]">
										<div className="text-[40px] mb-[12px]">🌍</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Inclusive</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											Mobile-first. Low-bandwidth friendly. Multiple languages. Multiple formats. Accessible to everyone.
										</p>
									</div>
									<div data-animate="fade-up" className="rounded-[26px] bg-white border border-black/5 p-[22px]">
										<div className="text-[40px] mb-[12px]">🚀</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Action-Oriented</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											We don't just inform. We enable participation. We investigate what communities want investigated. We measure impact.
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* WHO WE ARE */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Who We Are
									</h2>
								</div>

								<div data-animate="fade-up" className="rounded-[28px] bg-white border border-black/5 p-[26px]">
									<div className="grid grid-cols-3 gap-[20px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1 mb-[20px]">
										<div className="text-center">
											<p className="heading font-FoundersGrotesk text-[#111]">12</p>
											<p className="small-text font-NeueMontreal text-[#212121]/60 mt-[8px]">Team members</p>
										</div>
										<div className="text-center">
											<p className="heading font-FoundersGrotesk text-[#111]">5</p>
											<p className="small-text font-NeueMontreal text-[#212121]/60 mt-[8px]">Counties covered</p>
										</div>
										<div className="text-center">
											<p className="heading font-FoundersGrotesk text-[#111]">1</p>
											<p className="small-text font-NeueMontreal text-[#212121]/60 mt-[8px]">Mission</p>
										</div>
									</div>
									<div className="border-t border-black/5 pt-[20px]">
										<p className="paragraph font-NeueMontreal text-[#212121]/70">
											We're journalists, designers, developers, producers, and community organizers. We come from different backgrounds, but we're united by one belief: Kenya's budget should be understood and shaped by all Kenyans, especially the young.
										</p>
										<p className="mt-[16px] paragraph font-NeueMontreal text-[#212121]/70">
											We're supported by foundations, donors, and partners who believe in transparent governance and youth engagement. But we maintain complete editorial independence.
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* CONTACT CTA */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] flex items-end justify-between gap-[16px] flex-wrap">
									<div>
										<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
											Get in Touch
										</h3>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[62ch]">
											Want to partner with us? Have a story? Want to join the team? Let's talk.
										</p>
									</div>
									<div className="flex items-center gap-[12px]">
										<Link
											href="/contact"
											className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
											Contact Us
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
				</div>
			</div>
		</>
	);
}
