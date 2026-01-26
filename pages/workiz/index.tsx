"use client";
import { useEffect } from "react";
import { Curve } from "@/components";
import { Heroworkiz as WorkizHero, Aboutworkiz as About, Chelenge, Credit, Result, VideoWorkiz as Video, Works, BlogCMS } from "@/container";

export default function Workiz() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);

	return (
		<>
			<Curve backgroundColor={"#f1f1f1"}>
				<WorkizHero />
				<About />
				<Chelenge />
				<Works />
				<Video />
				<Result />
				<Credit />
				<BlogCMS />
			</Curve>
		</>
	);
}