import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "../index.css";
import Providers from "@/components/providers";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "MangoWC - Web Component Library",
	description:
		"A minimal, fast, and modern web component library for building beautiful interfaces",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={"font-sans antialiased"}>
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
