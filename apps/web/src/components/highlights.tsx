export function Highlights() {
	const highlights = [
		{
			title: "Lightweight & Fast",
			description:
				"MangoWC is as lightweight as dwl, and can be built completely within a few seconds. Despite this, MangoWC does not compromise on functionality.",
		},
		{
			title: "Multiple Layouts",
			description:
				"Flexible window layouts with easy switching (scroller, master-stack, monocle, center-master, etc.)",
		},
		{
			title: "Smooth Animations",
			description:
				"Smooth and customizable complete animations (window open/move/close, tag enter/leave, layer open/close/move)",
		},
		{
			title: "Excellent XWayland",
			description: "Excellent xwayland support.",
		},
		{
			title: "Rich Window States",
			description:
				"Rich window states (swallow, minimize, maximize, unglobal, global, fakefullscreen, overlay, etc.)",
		},
		{
			title: "IPC Support",
			description:
				"Ipc support (get/send message from/to compositor by external program)",
		},
	];

	return (
		<section className="bg-muted/20 px-4 py-20 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-balance font-bold text-4xl text-foreground sm:text-5xl">
						Why MangoWC
					</h2>
					<p className="mx-auto max-w-2xl text-balance text-foreground/70 text-lg">
						In addition to basic WM functionality, MangoWC provides excellent
						features
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{highlights.map((highlight, _index) => (
						<div
							key={highlight.title}
							className="rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary"
						>
							<h3 className="mb-2 font-bold text-foreground text-lg">
								{highlight.title}
							</h3>
							<p className="text-foreground/80">{highlight.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
