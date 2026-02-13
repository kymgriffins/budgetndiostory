"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Fade Up Animation - for sections appearing from below
export function FadeUp({
	children,
	delay = 0,
	duration = 0.8,
	className = "",
}: {
	children: React.ReactNode;
	delay?: number;
	duration?: number;
	className?: string;
}) {
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, y: 60 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
			transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}>
			{children}
		</motion.div>
	);
}

// Scale In Animation - for images/cards
export function ScaleIn({
	children,
	delay = 0,
	className = "",
}: {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}) {
	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, scale: 0.95 }}
			animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}>
			{children}
		</motion.div>
	);
}

// Stagger Children Animation - for lists/grids
export function StaggerContainer({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
		},
	};

	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	return (
		<motion.div
			ref={ref}
			className={className}
			variants={containerVariants}
			initial="hidden"
			animate={inView ? "visible" : "hidden"}>
			{Array.isArray(children)
				? children.map((child, i) => (
						<motion.div key={i} variants={itemVariants}>
							{child}
						</motion.div>
				  ))
				: children}
		</motion.div>
	);
}

// Slide In from Left/Right
export function SlideIn({
	children,
	direction = "left",
	delay = 0,
	className = "",
}: {
	children: React.ReactNode;
	direction?: "left" | "right";
	delay?: number;
	className?: string;
}) {
	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	const xOffset = direction === "left" ? -60 : 60;

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, x: xOffset }}
			animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: xOffset }}
			transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}>
			{children}
		</motion.div>
	);
}

// Parallax Effect - for backgrounds
export function Parallax({
	children,
	speed = 0.5,
	className = "",
}: {
	children: React.ReactNode;
	speed?: number;
	className?: string;
}) {
	const { ref, inView } = useInView({
		threshold: 0,
		triggerOnce: false,
	});

	return (
		<motion.div
			ref={ref}
			className={className}
			whileInView={{ translateY: [0, -30 * speed] }}
			transition={{ duration: 0.5, ease: "linear" }}>
			{children}
		</motion.div>
	);
}

// Text Reveal Animation
export function TextReveal({
	children,
	delay = 0,
	className = "",
}: {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}) {
	const { ref, inView } = useInView({
		threshold: 0.5,
		triggerOnce: true,
	});

	return (
		<motion.div
			ref={ref}
			className={`overflow-hidden ${className}`}>
			<motion.div
				initial={{ y: "100%" }}
				animate={inView ? { y: "0%" } : { y: "100%" }}
				transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}>
				{children}
			</motion.div>
		</motion.div>
	);
}

// Hover Scale - for interactive elements
export function HoverScale({
	children,
	scale = 1.05,
	className = "",
}: {
	children: React.ReactNode;
	scale?: number;
	className?: string;
}) {
	return (
		<motion.div
			className={className}
			whileHover={{ scale }}
			transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}>
			{children}
		</motion.div>
	);
}

// Rotate In - for icons/elements
export function RotateIn({
	children,
	delay = 0,
	className = "",
}: {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}) {
	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
			animate={
				inView
					? { opacity: 1, rotate: 0, scale: 1 }
					: { opacity: 0, rotate: -15, scale: 0.8 }
			}
			transition={{ duration: 0.6, delay, ease: [0.76, 0, 0.24, 1] }}>
			{children}
		</motion.div>
	);
}