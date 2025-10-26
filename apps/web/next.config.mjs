import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig = {
	reactCompiler: true,
	compress: true,
};

export default withMDX(nextConfig);
