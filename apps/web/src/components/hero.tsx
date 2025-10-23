"use client";

import Link from "next/link";
import { useState } from "react";

export function Hero() {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
			{/* Background grid effect */}
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

			<div className="relative z-10 mx-auto max-w-4xl text-center">
				<div className="mb-6 inline-block">
					<span className="font-mono font-semibold text-accent text-sm">
						Wayland Compositor
					</span>
				</div>

				<h1 className="mb-6 text-balance font-bold text-5xl text-foreground leading-tight sm:text-6xl lg:text-7xl">
					Lightweight, <span className="text-accent">Feature-Rich</span>
				</h1>

				<p className="mx-auto mb-12 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
					MangoWC is a minimal Wayland compositor inspired by dwl. It adds modern features like smooth scrolling, scratchpads, and workspace overview, while keeping a lightweight and fast workflow.
				</p>

				<div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Link
						href="https://github.com/DreamMaoMao/mangowc"
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
					>
						View on GitHub
					</Link>
					<Link
						href="https://discord.gg/CPjbDxesh5"
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-full border border-border px-8 py-3 font-semibold text-foreground transition-colors hover:bg-card"
					>
						Join Discord
					</Link>
				</div>
			</div>
		</section>
	);
}
