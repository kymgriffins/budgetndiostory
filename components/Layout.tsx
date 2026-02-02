import LandingFooter from "./LandingFooter";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
	showFooter?: boolean;
	className?: string;
}

/**
 * Reusable responsive layout component for Budget Ndio Story pages.
 *
 * Features:
 * - Automatic navbar spacing (8vh for desktop/mobile)
 * - Optional LandingFooter (shown by default)
 * - Responsive padding based on screen size
 * - Full-width container with max-width constraint
 *
 * Usage:
 * ```tsx
 * import Layout from "@/components/Layout";
 *
 * export default function MyPage() {
 *   return (
 *     <Layout>
 *       <main>Page content here</main>
 *     </Layout>
 *   );
 * }
 * ```
 */
export default function Layout({
	children,
	showFooter = true,
	className = "",
}: LayoutProps) {
	return (
		<>
			{/* Spacer for fixed navbar height (desktop + mobile nav are both 8vh) */}
			<div className="h-[8vh]" />

			<div className={className}>
				{children}
			</div>

			{showFooter && <LandingFooter />}
		</>
	);
}
