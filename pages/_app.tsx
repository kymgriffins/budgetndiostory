import { Navbar } from "@/components";
import { AnalyticsProvider } from "@/components/Analytics";
import LandingFooter from "@/components/LandingFooter";
import FooterV2 from "@/components/FooterV2";
import { FooterV2Provider, useFooterV2 } from "@/context/FooterV2Context";
import { FOOTER_HIDE_ROUTES } from "@/lib/routes";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { ReactNode } from "react";

function AppContent({
	Component,
	pageProps,
	router,
}: {
	Component: any;
	pageProps: any;
	router: any;
}) {
	const isLanding = router?.route === "/landing";
	const path = router?.route ?? router?.pathname ?? "";

	const shouldHideFooter = FOOTER_HIDE_ROUTES.includes(path as any);
	const { showFooterV2 } = useFooterV2();

	return (
		<>
			<Navbar />
			{isLanding ? (
				<Component key={router.route} {...pageProps} />
			) : (
				<AnimatePresence mode="wait">
					<Component key={router.route} {...pageProps} />
				</AnimatePresence>
			)}
			{!shouldHideFooter && (
				showFooterV2 ? <FooterV2 /> : <LandingFooter />
			)}
			<Analytics />
		</>
	);
}

export default function App({
	Component,
	pageProps,
	router,
}: {
	Component: any;
	pageProps: any;
	router: any;
}) {
	return (
		<AnalyticsProvider>
			<FooterV2Provider>
				<AppContent Component={Component} pageProps={pageProps} router={router} />
			</FooterV2Provider>
		</AnalyticsProvider>
	);
}
