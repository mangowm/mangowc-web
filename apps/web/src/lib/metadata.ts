import type { Page } from "./source";

export function getPageImage(page: Page) {
	const segments = [...page.slugs, "image.webp"];

	return {
		segments,
		url: `/og/${segments.join("/")}`,
	};
}
