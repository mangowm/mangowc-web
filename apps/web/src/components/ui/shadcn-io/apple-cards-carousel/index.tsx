"use client";
import React, {
	useEffect,
	useRef,
	useState,
	createContext,
	useContext,
} from "react";
import {
	IconArrowNarrowLeft,
	IconArrowNarrowRight,
	IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export interface CarouselProps {
	items: React.JSX.Element[];
	initialScroll?: number;
}

export type Card = {
	src: string;
	title: string;
	category: string;
	content: React.ReactNode;
};

export const CarouselContext = createContext<{
	onCardClose: (index: number) => void;
	currentIndex: number;
}>({
	onCardClose: () => {},
	currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = React.useState(false);
	const [canScrollRight, setCanScrollRight] = React.useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (carouselRef.current) {
			carouselRef.current.scrollLeft = initialScroll;
			checkScrollability();
		}
	}, [initialScroll]);

	const checkScrollability = () => {
		if (carouselRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
		}
	};

	const scrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: -450, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: 450, behavior: "smooth" });
		}
	};

	const handleCardClose = (index: number) => {
		if (carouselRef.current) {
			const cardWidth = isMobile() ? 288 : 448; // (w-72 = 288px, md:w-[28rem] = 448px)
			const gap = isMobile() ? 4 : 8;
			const scrollPosition = (cardWidth + gap) * (index + 1);
			carouselRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
			setCurrentIndex(index);
		}
	};

	const isMobile = () => {
		return window && window.innerWidth < 768;
	};

	return (
		<CarouselContext.Provider
			value={{ onCardClose: handleCardClose, currentIndex }}
		>
			<div className="relative w-full">
				<div
					className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-6 md:py-10"
					ref={carouselRef}
					onScroll={checkScrollability}
				>
					<div
						className={cn(
							"absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
						)}
					></div>

					<div
						className={cn(
							"flex flex-row justify-start gap-4 pl-4",
							"mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
						)}
					>
						{items.map((item, index) => (
							<motion.div
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										delay: 0.2 * index,
										ease: "easeOut",
									},
								}}
								key={"card" + index}
								className="rounded-3xl"
							>
								{item}
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</CarouselContext.Provider>
	);
};

export type CardProps = {
	card: Card;
	index: number;
	layout?: boolean;
};

export const Card = ({ card, index, layout = false }: CardProps) => {
	const [open, setOpen] = useState(false);
	const [hovered, setHovered] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { onCardClose, currentIndex } = useContext(CarouselContext);

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				handleClose();
			}
		}

		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open]);

	useOnClickOutside(containerRef as React.RefObject<HTMLElement>, () =>
		handleClose(),
	);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		onCardClose(index);
	};

	return (
		<>
			<AnimatePresence>
				{open && (
					<div className="fixed inset-0 z-50 h-screen overflow-auto">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
						/>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							ref={containerRef}
							layoutId={layout ? `card-${card.title}` : undefined}
							className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
						>
							<button
								className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
								onClick={handleClose}
							>
								<IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
							</button>
							<motion.p
								layoutId={layout ? `category-${card.title}` : undefined}
								className="text-base font-medium text-black dark:text-white"
							>
								{card.category}
							</motion.p>
							<motion.p
								layoutId={layout ? `title-${card.title}` : undefined}
								className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
							>
								{card.title}
							</motion.p>
							<div className="py-10">{card.content}</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
			<motion.button
				layoutId={layout ? `card-${card.title}` : undefined}
				onClick={handleOpen}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className="relative z-10 flex aspect-video w-72 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 cursor-pointer border-2 border-transparent hover:border-primary md:w-[28rem] dark:bg-neutral-900"
			>
				<video
					src={card.src}
					className="absolute inset-0 z-10 object-cover"
					muted
					loop
					autoPlay
					preload="none"
				/>
				<div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
				<div className="relative z-40 p-4 md:p-6">
					<motion.p
						layoutId={layout ? `title-${card.title}` : undefined}
						className="max-w-xs text-left font-sans text-sm font-semibold [text-wrap:balance] text-white md:text-lg"
					>
						{card.title}
					</motion.p>
				</div>
				{hovered && (
					<div className="absolute bottom-4 right-4 z-50">
						<svg
							className="h-6 w-6 text-white transition-transform hover:scale-110"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<title>Fullscreen</title>
							<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
						</svg>
					</div>
				)}
			</motion.button>
		</>
	);
};

export type BlurImageProps = {
	src: string;
	alt?: string;
	className?: string;
	fill?: boolean;
	width?: number;
	height?: number;
};

export const BlurImage = ({
	height,
	width,
	src,
	className,
	alt,
	fill,
	...rest
}: BlurImageProps) => {
	const [isLoading, setLoading] = useState(true);
	return (
		<img
			className={cn(
				"h-full w-full transition duration-300",
				isLoading ? "blur-sm" : "blur-0",
				className,
			)}
			onLoad={() => setLoading(false)}
			src={src}
			width={width}
			height={height}
			loading="lazy"
			decoding="async"
			alt={alt ? alt : "Background of a beautiful view"}
			{...rest}
		/>
	);
};
