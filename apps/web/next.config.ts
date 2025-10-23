import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "opeheybxdg2xe4zd.public.blob.vercel-storage.com",
			},
		],
	},
};

export default nextConfig;
