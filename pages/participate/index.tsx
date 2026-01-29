import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Participate() {
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
				<title>Participate - Budget Ndio Story</title>
				<meta name="description" content="Share your voice on Kenya's budget. Polls, voice notes, and community feedback." />
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
										🗣️ Your Voice Matters
									</span>
								</div>

								<h1 data-hero="title" className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]">
									Participate: Shape the Narrative
								</h1>

								<p data-hero="sub" className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]">
									This is not performative public participation. Tell us what you want funded. Shape what we investigate next.
								</p>

								<div data-hero="cta" className="mt-[32px] flex items-center gap-[12px] flex-wrap">
									<Link
										href="/home"
										className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
										Back to Home
									</Link>
									<Link
										href="#participate"
										className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
										Get Started
									</Link>
								</div>
							</div>
						</section>

						{/* STATS */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="grid grid-cols-3 gap-[14px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
									<div className="rounded-[26px] bg-white border border-black/5 p-[22px]">
										<p className="heading font-FoundersGrotesk text-[#111]">42K</p>
										<p className="small-text font-NeueMontreal text-[#212121]/60 mt-[8px]">Youth voices heard</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[12px]">
											From polls, comments, and submissions in the last 3 months.
										</p>
									</div>
									<div className="rounded-[26px] bg-white border border-black/5 p-[22px]">
										<p className="heading font-FoundersGrotesk text-[#111]">18</p>
										<p className="small-text font-NeueMontreal text-[#212121]/60 mt-[8px]">Investigations launched</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[12px]">
											Based on questions and requests from our community.
										</p>
									</div>
									<div className="rounded-[26px] bg-white border border-black/5 p-[22px]">
										<p className="heading font-FoundersGrotesk text-[#111]">7</p>
										<p className="small-text font-NeueMontreal text-[#212121]/60 mt-[8px]">Stories published</p>
										<p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[12px]">
											Directly from community feedback and participation.
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* PARTICIPATION OPTIONS */}
						<section id="participate" className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										How to Participate
									</h2>
									<p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[65ch]">
										Choose the way that works best for you. No signup required. No forms. No jargon.
									</p>
								</div>

								<div className="grid grid-cols-2 gap-[20px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
									{/* Option 1: Polls */}
									<div
										data-animate="fade-up"
										className="rounded-[26px] bg-white border border-black/5 p-[22px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition group cursor-pointer">
										<div className="text-[48px] mb-[12px] group-hover:scale-110 transition">
											📊
										</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Quick Polls</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											"What should your county fund next?" Quick questions, instant results. See what other youth think.
										</p>
										<button className="mt-[16px] px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121] hover:bg-black/10 transition">
											→ Try a Poll
										</button>
									</div>

									{/* Option 2: Voice Notes */}
									<div
										data-animate="fade-up"
										className="rounded-[26px] bg-white border border-black/5 p-[22px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition group cursor-pointer">
										<div className="text-[48px] mb-[12px] group-hover:scale-110 transition">
											🎙️
										</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Voice Notes</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											Record your story, opinion, or question. Send via WhatsApp or upload directly. We listen to every one.
										</p>
										<button className="mt-[16px] px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121] hover:bg-black/10 transition">
											→ Record Now
										</button>
									</div>

									{/* Option 3: Comments */}
									<div
										data-animate="fade-up"
										className="rounded-[26px] bg-white border border-black/5 p-[22px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition group cursor-pointer">
										<div className="text-[48px] mb-[12px] group-hover:scale-110 transition">
											💬
										</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Comment on Stories</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											Read a story? Add your thoughts. Know more about what happened? Share it. Questions? Ask them here.
										</p>
										<button className="mt-[16px] px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121] hover:bg-black/10 transition">
											→ Browse Stories
										</button>
									</div>

									{/* Option 4: Submit Story */}
									<div
										data-animate="fade-up"
										className="rounded-[26px] bg-white border border-black/5 p-[22px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition group cursor-pointer">
										<div className="text-[48px] mb-[12px] group-hover:scale-110 transition">
											📝
										</div>
										<h3 className="heading font-FoundersGrotesk text-[#111]">Submit a Story</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											Know about a budget promise that fell through? A successful project? A controversial decision? Tell us.
										</p>
										<button className="mt-[16px] px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121] hover:bg-black/10 transition">
											→ Share Your Story
										</button>
									</div>
								</div>
							</div>
						</section>

						{/* IMPACT SECTION */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Your Participation Shapes Our Work
									</h2>
								</div>

								<div className="grid grid-cols-2 gap-[20px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
									<div className="rounded-[26px] bg-gradient-to-br from-[#00ff85]/10 to-[#00ff85]/5 border border-[#00ff85]/20 p-[22px]">
										<h3 className="heading font-FoundersGrotesk text-[#111]">📊 Poll Results</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											When 500+ youth say "we want to know about education budget," we launch an investigation.
										</p>
									</div>
									<div className="rounded-[26px] bg-gradient-to-br from-[#ff85b5]/10 to-[#ff85b5]/5 border border-[#ff85b5]/20 p-[22px]">
										<h3 className="heading font-FoundersGrotesk text-[#111]">🎙️ Voice Notes</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											Your story might be featured in our next documentary or audio story. With your permission.
										</p>
									</div>
									<div className="rounded-[26px] bg-gradient-to-br from-[#ffd93d]/10 to-[#ffd93d]/5 border border-[#ffd93d]/20 p-[22px]">
										<h3 className="heading font-FoundersGrotesk text-[#111]">💬 Comments</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											Good questions in comments get answered. Often we add new sections to stories based on your feedback.
										</p>
									</div>
									<div className="rounded-[26px] bg-gradient-to-br from-[#4ecdc4]/10 to-[#4ecdc4]/5 border border-[#4ecdc4]/20 p-[22px]">
										<h3 className="heading font-FoundersGrotesk text-[#111]">📝 Story Tips</h3>
										<p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
											Got a lead? Know something? We'll investigate it and give you credit for the tip-off.
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* FAQ SECTION */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Common Questions
									</h2>
								</div>

								<div className="space-y-[14px]">
									<div data-animate="fade-up" className="rounded-[20px] bg-white border border-black/5 p-[22px]">
										<h4 className="heading font-FoundersGrotesk text-[#111]">Will my name be published?</h4>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70">
											Only if you want it to be. You can participate anonymously, with your first name only, or with full credit.
										</p>
									</div>
									<div data-animate="fade-up" className="rounded-[20px] bg-white border border-black/5 p-[22px]">
										<h4 className="heading font-FoundersGrotesk text-[#111]">Is my data safe?</h4>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70">
											Yes. We don't sell your data. We don't track you. We use your feedback only to improve our work.
										</p>
									</div>
									<div data-animate="fade-up" className="rounded-[20px] bg-white border border-black/5 p-[22px]">
										<h4 className="heading font-FoundersGrotesk text-[#111]">Can I participate via SMS?</h4>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70">
											Coming soon. For now, use WhatsApp, web, or call us. We're working on SMS support for low-data users.
										</p>
									</div>
									<div data-animate="fade-up" className="rounded-[20px] bg-white border border-black/5 p-[22px]">
										<h4 className="heading font-FoundersGrotesk text-[#111]">How do you choose what to investigate?</h4>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70">
											Community feedback drives 60% of our investigations. The rest come from our team and partner organizations.
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* CTA */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] flex items-end justify-between gap-[16px] flex-wrap">
									<div>
										<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
											Ready to Speak Up?
										</h3>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[62ch]">
											Your voice matters. Let's shape Kenya's budget conversation together.
										</p>
									</div>
									<div className="flex items-center gap-[12px]">
										<Link
											href="/home"
											className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
											Participate Now
										</Link>
										<Link
											href="/stories"
											className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
											Explore Stories
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
