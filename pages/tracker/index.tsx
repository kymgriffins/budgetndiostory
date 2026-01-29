import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Tracker() {
	const scrollerRef = useRef<HTMLDivElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);
	const [selectedSector, setSelectedSector] = useState("all");

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

	const projects = [
		{
			id: 1,
			name: "Northern Bypass Extension",
			budget: "Ksh 45.2B",
			status: "in-progress",
			county: "Nairobi",
			icon: "🛣️",
		},
		{
			id: 2,
			name: "Nairobi County Health Centers",
			budget: "Ksh 8.5B",
			status: "allocated",
			county: "Nairobi",
			icon: "🏥",
		},
		{
			id: 3,
			name: "Makueni Water Pipeline",
			budget: "Ksh 3.2B",
			status: "stalled",
			county: "Makueni",
			icon: "💧",
		},
		{
			id: 4,
			name: "Youth Skills Training Centers",
			budget: "Ksh 2.1B",
			status: "completed",
			county: "Multiple",
			icon: "👥",
		},
		{
			id: 5,
			name: "School Feeding Program",
			budget: "Ksh 6.8B",
			status: "in-progress",
			county: "National",
			icon: "🍽️",
		},
		{
			id: 6,
			name: "Agricultural Subsidy Initiative",
			budget: "Ksh 12.5B",
			status: "allocated",
			county: "Multiple",
			icon: "🌾",
		},
	];

	const statusColors = {
		allocated: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "🟦" },
		"in-progress": { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "🟨" },
		completed: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "🟩" },
		stalled: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "🟥" },
	};

	return (
		<>
			<Head>
				<title>Budget Tracker - Budget Ndio Story</title>
				<meta name="description" content="Track Kenya's budget projects visually. See what's allocated, in progress, completed, or stalled." />
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
										📊 Visual Budget Tracker
									</span>
								</div>

								<h1 data-hero="title" className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]">
									See Where the Money Went
								</h1>

								<p data-hero="sub" className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]">
									Not spreadsheets or audit reports. Just visual indicators of what's allocated, in progress, completed, or stalled.
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

						{/* STATUS LEGEND */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="grid grid-cols-4 gap-[14px] mdOnly:grid-cols-2 smOnly:grid-cols-2 xm:grid-cols-1">
									<div className="rounded-[20px] bg-blue-50 border border-blue-200 p-[18px]">
										<p className="text-[28px]">🟦</p>
										<p className="mt-[10px] heading font-FoundersGrotesk text-blue-700">Allocated</p>
										<p className="mt-[6px] small-text font-NeueMontreal text-blue-600">Budget approved, not yet started</p>
									</div>
									<div className="rounded-[20px] bg-yellow-50 border border-yellow-200 p-[18px]">
										<p className="text-[28px]">🟨</p>
										<p className="mt-[10px] heading font-FoundersGrotesk text-yellow-700">In Progress</p>
										<p className="mt-[6px] small-text font-NeueMontreal text-yellow-600">Currently being implemented</p>
									</div>
									<div className="rounded-[20px] bg-green-50 border border-green-200 p-[18px]">
										<p className="text-[28px]">🟩</p>
										<p className="mt-[10px] heading font-FoundersGrotesk text-green-700">Completed</p>
										<p className="mt-[6px] small-text font-NeueMontreal text-green-600">Project finished and delivered</p>
									</div>
									<div className="rounded-[20px] bg-red-50 border border-red-200 p-[18px]">
										<p className="text-[28px]">🟥</p>
										<p className="mt-[10px] heading font-FoundersGrotesk text-red-700">Stalled</p>
										<p className="mt-[6px] small-text font-NeueMontreal text-red-600">Budget delayed or stuck</p>
									</div>
								</div>
							</div>
						</section>

						{/* PROJECTS GRID */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="mb-[22px]">
									<h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
										Budget Projects
									</h2>
									<p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70">
										Click any project to see full details, timeline, and status updates.
									</p>
								</div>

								<div className="grid grid-cols-2 gap-[14px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
									{projects.map(project => {
										const colors = statusColors[project.status as keyof typeof statusColors];
										return (
											<div
												key={project.id}
												className={`rounded-[26px] border p-[22px] cursor-pointer hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition ${colors.bg} ${colors.border}`}>
												<div className="flex items-start justify-between mb-[16px]">
													<div className="text-[40px]">{project.icon}</div>
													<span className="text-[24px]">{colors.badge}</span>
												</div>
												<h3 className={`heading font-FoundersGrotesk ${colors.text}`}>
													{project.name}
												</h3>
												<p className={`mt-[10px] paragraph font-NeueMontreal ${colors.text}`}>
													{project.budget}
												</p>
												<div className="mt-[16px] flex flex-col gap-[8px]">
													<div className="w-full bg-white/50 rounded-full h-[8px] overflow-hidden">
														<div
															className="h-full bg-gradient-to-r from-white/70 to-white/40"
															style={{
																width:
																	project.status === "completed"
																		? "100%"
																		: project.status === "in-progress"
																			? "65%"
																			: project.status === "allocated"
																				? "20%"
																				: "45%",
															}}
														/>
													</div>
													<div className="flex justify-between gap-[10px]">
														<span className={`small-text font-NeueMontreal ${colors.text} uppercase`}>
															{project.status === "completed"
																? "100% complete"
																: project.status === "in-progress"
																	? "65% complete"
																	: project.status === "allocated"
																		? "Not started"
																		: "Paused"}
														</span>
														<span className={`small-text font-NeueMontreal ${colors.text} capitalize`}>
															{project.county}
														</span>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</section>

						{/* INSIGHTS CTA */}
						<section className="padding-x padding-y">
							<div className="max-w-[1200px] mx-auto">
								<div data-animate="fade-up" className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] flex items-end justify-between gap-[16px] flex-wrap">
									<div>
										<h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
											Want the Full Story?
										</h3>
										<p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[62ch]">
											Click on any project to read the investigation, see photos, or watch the documentary.
										</p>
									</div>
									<div className="flex items-center gap-[12px]">
										<Link
											href="/stories"
											className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition">
											Read Stories
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
