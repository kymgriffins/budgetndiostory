import "@/styles/globals.css";
import { Navbar } from "@/components";
import LandingFooter from "@/components/LandingFooter";
import { AnimatePresence } from "framer-motion";

export default function App({
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
	const hideOnRootOrContact = path === "/" || path === "/contact";

	return (
		<>
			<Navbar />
			{isLanding ? (
				<Component key={router.route} {...pageProps} />
			) : (
			<AnimatePresence mode="wait">
				<Component
					key={router.route}
					{...pageProps}
				/>
			</AnimatePresence>
			)}
			{!hideOnRootOrContact && <LandingFooter />}
		</>
	);
}
