import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Shorts() {
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

	const shorts = [
		{
			id: 1,
			title: "Finance Minister's Budget Dance",
			type: "skit",
			duration: "1:32",
			likes: "42K",
			icon: "🎬",
		},
		{
			id: 2,
			title: "What Actually Happens to Your Tax Money",
			type: "short",
			duration: "0:45",
			likes: "28K",
			icon: "💰",
		},
		{
			id: 3,
			title: "Public Participation Forms Be Like...",
			type: "skit",
			duration: "1:18",
			likes: "31K",
			icon: "😂",
		},
		{
			id: 4,
			title: "Budget Explained: 60 Seconds",
			type: "explainer",
			duration: "1:00",
			likes: "52K",
			icon: "⚡",
		},
		{
			id: 5,
			title: "Government Budget vs Reality",
			type: "comparison",
			duration: "0:59",
			likes: "67K",
			icon: "🎭",
		},
		{
			id: 6,
			title: "Road Project Saga (A Comedy)",
			type: "skit",
			duration: "2:15",
			likes: "45K",
			icon: "🛣️",
		},
		{
			id: 7,
			title: "If Budgets Were Relationships",
			type: "skit",
			duration: "1:44",
			likes: "38K",
			icon: "💔",
		},
		{
			id: 8,
			title: "Types of Budget Promises",
			type: "comedy",
			duration: "2:10",
			likes: "55K",
			icon: "🤣",
		},
	];

	return (
		<>
			<Head>
				<title>Skits & Shorts - Budget Ndio Story</title>
				<meta name="description" content="Funny, sharp, and shareable skits and short videos about Kenya's budget." />
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
										🎬 Funny. Sharp. Shareable.
									</span>
								</div>

								<h1 data-hero="title" className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]">
									Skits & Shorts
								</h1>

								<p data-hero="sub" className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]">
									Because sometimes the best way to understand the budget is to laugh at it. Then think about it. Then get angry.
								</p>

								<div data-hero="cta" className="mt-[32px] flex items-center gap-[12px] flex-wrap">
									<Link
										href="/home"
										className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition">
										Back to Home
									</Link>
									<Link
										href="#videos"
										className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
										Watch Now
									</Link>
								</div>
							</div>
						</section>

						{/* FEATURED SHORT */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Trending Now
									</h2>
								</div>

								<div
									data-animate="fade-up"
									className="rounded-[28px] overflow-hidden bg-white border border-black/5 h-[500px] smOnly:h-[350px] xm:h-[350px] relative group cursor-pointer">
									<div className="absolute inset-0 bg-gradient-to-br from-[#ff85b5]/30 via-[#ffd93d]/20 to-[#00ff85]/30 flex items-center justify-center">
										<button className="w-[80px] h-[80px] rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex items-center justify-center text-[36px] group-hover:scale-110 transition">
											▶
										</button>
									</div>
									<div className="absolute bottom-0 left-0 right-0 p-[22px] bg-gradient-to-t from-black/80 via-black/40 to-transparent">
										<h3 className="heading font-FoundersGrotesk text-white">Budget Explained: 60 Seconds</h3>
										<p className="mt-[8px] paragraph font-NeueMontreal text-white/80">
											Everything you need to know about Kenya's budget in one crisp video.
										</p>
										<div className="mt-[12px] flex gap-[12px] flex-wrap">
											<span className="px-[10px] py-[6px] rounded-full bg-white/20 border border-white/30 small-text font-NeueMontreal text-white">
												1:00 min
											</span>
											<span className="px-[10px] py-[6px] rounded-full bg-white/20 border border-white/30 small-text font-NeueMontreal text-white">
												52K likes
											</span>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* ALL SHORTS GRID */}
						<section id="videos" className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										All Shorts
									</h2>
								</div>

								<div className="grid grid-cols-4 gap-[14px] mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1">
									{shorts.map(short => (
										<div
											key={short.id}
											className="rounded-[20px] overflow-hidden bg-white border border-black/5 group cursor-pointer hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition"
										>
											<div className="relative h-[220px] bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-black/10 group-hover:to-black/20 transition">
												<button className="w-[60px] h-[60px] rounded-full bg-white/80 flex items-center justify-center text-[24px] group-hover:bg-white group-hover:scale-110 transition shadow-lg">
													▶
												</button>
											</div>
											<div className="p-[16px]">
												<div className="text-[32px] mb-[8px]">{short.icon}</div>
												<h3 className="heading font-FoundersGrotesk text-[#111] line-clamp-2 text-[16px]">
													{short.title}
												</h3>
												<div className="mt-[12px] flex items-center justify-between gap-[8px] text-[12px]">
													<span className="font-NeueMontreal text-[#212121]/60">
														{short.duration}
													</span>
													<span className="font-NeueMontreal text-[#212121]/60">
														❤️ {short.likes}
													</span>
												</div>
												<div className="mt-[10px] flex gap-[8px]">
													<button className="flex-1 px-[12px] py-[6px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/60 hover:bg-black/10 transition">
														📤
													</button>
													<button className="flex-1 px-[12px] py-[6px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/60 hover:bg-black/10 transition">
														💾
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</section>

						{/* SUBMISSION CTA */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="rounded-[28px] bg-[#111] text-white border border-white/10 p-[26px]">
									<div className="flex items-end justify-between gap-[16px] flex-wrap">
										<div>
											<h3 className="sub-heading font-FoundersGrotesk uppercase">
												Made a Budget Skit?
											</h3>
											<p className="mt-[10px] paragraph font-NeueMontreal text-white/70 max-w-[62ch]">
												We want to feature creators who make content about the budget. Submit your skit or short video.
											</p>
										</div>
										<Link
											href="/contact"
											className="px-[18px] py-[12px] rounded-full bg-white text-[#111] paragraph font-NeueMontreal hover:opacity-90 transition flex-shrink-0">
											Submit Video
										</Link>
									</div>
								</div>
							</div>
						</section>

						{/* EXPLORE MORE */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] flex items-end justify-between gap-[16px] flex-wrap">
									<div>
										<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
											Looking for Deeper Stories?
										</h3>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[62ch]">
											Read full investigations, listen to podcasts, or watch documentaries.
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
				</div>
			</div>
		</>
	);
}
