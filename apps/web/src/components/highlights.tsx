export function Highlights() {
	const highlights = [
		{
			title: "Lightweight & Fast",
			description:
				"Builds in seconds with minimal dependencies, no compromise on functionality",
		},
		{
			title: "Multiple Layouts",
			description:
				"Tile, scroller, monocle, grid, deck, center-tile, and more layout options",
		},
		{
			title: "Smooth Animations",
			description:
				"Customizable animations for windows, tags, and layers with scenefx effects",
		},
		{
			title: "Excellent XWayland",
			description:
				"Full support for X11 applications on Wayland with seamless integration",
		},
		{
			title: "Rich Window States",
			description:
				"Swallow, minimize, maximize, fakefullscreen, overlay, and more states",
		},
		{
			title: "IPC Support",
			description:
				"Send and receive messages from external programs for powerful automation",
		},
	];

	return (
		<section className="bg-card/30 px-4 py-20 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-balance font-bold text-4xl text-foreground sm:text-5xl">
						Why MangoWC
					</h2>
					<p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
						A modern Wayland window manager with everything you need for a
						productive desktop
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{highlights.map((highlight, index) => (
						<div
							key={index}
							className="rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent/50"
						>
							<h3 className="mb-2 font-bold text-foreground text-lg">
								{highlight.title}
							</h3>
							<p className="text-muted-foreground">{highlight.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
