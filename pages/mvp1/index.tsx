"use client";
import Layout from "@/components/Layout";
import { Mvp1Hero, Mvp1Features, Cta } from "@/container";
import { useFooterV2Toggle } from "@/context/FooterV2Context";
import { useEffect } from "react";

export default function Mvp1() {
	// Enable FooterV2 on this page
	useFooterV2Toggle(true);

	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);

	return (
		<Layout>
			<Mvp1Hero />
			<Mvp1Features />
			<Cta />
		</Layout>
	);
}
