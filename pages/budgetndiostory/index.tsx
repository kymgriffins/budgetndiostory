"use client";
import { Curve, Ready } from "@/components";
import {
	Aboutabout,
	Heroabout,
	Partners,
	Principles,
	Team,
	Insights,
	FAQ
} from "@/container";
import Faq from "@/container/contact-page/Faq";
import { useEffect } from "react";

export default function About() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
		<>
			<Curve backgroundColor={"#ffffff"}>
				<Heroabout />
				<Aboutabout />
				<Team />
				<Principles />
				<Partners />
				<br />
				<br />
				<br />
				{/* <Insights /> */}
				<Ready />
				<Faq/>
			</Curve>
		</>
	);
}
