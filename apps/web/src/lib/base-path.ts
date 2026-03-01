export const basePath =
	process.env.GITHUB_PAGES === "true"
		? "/mango-web"
		: process.env.VERCEL
			? ""
			: "";
