import "@/styles/globals.css";
import { Footer, Navbar } from "@/components";
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
			{!isLanding && <Footer />}
		</>
	);
}
