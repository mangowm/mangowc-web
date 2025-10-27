import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";

const SITE_TITLE = "MangoWC - Lightweight Wayland Compositor";
const SITE_DESCRIPTION =
  "MangoWC is a lightweight, high-performance Wayland compositor built on dwl, designed for speed, flexibility, and a modern, customizable desktop experience.";
const SITE_URL = "https://mangowc.vercel.app";
const SITE_OG_IMAGE = "/image.png";
const IMAGE_VERSION = "2";
const TWITTER_CREATOR = "";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MangoWC",
  alternateName: "Mango Window Compositor",
  description: SITE_DESCRIPTION,
  applicationCategory: "DesktopEnhancementApplication",
  operatingSystem: "Linux",
  programmingLanguage: "C",
  softwareVersion: "latest",
  url: SITE_URL,
  codeRepository: "https://github.com/DreamMaoMao/mangowc",
  downloadUrl: "https://github.com/DreamMaoMao/mangowc/releases",
  license: "https://github.com/DreamMaoMao/mangowc/blob/main/LICENSE",
  author: {
    "@type": "Person",
    name: "DreamMaoMao",
    url: "https://github.com/DreamMaoMao",
  },
  sameAs: ["https://github.com/DreamMaoMao/mangowc", SITE_URL],
  keywords: [
    "wayland compositor",
    "dwl",
    "linux window manager",
    "lightweight wm",
    "tiling compositor",
  ],
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MangoWC",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-512x512.png`,
  sameAs: ["https://github.com/DreamMaoMao/mangowc"],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | MangoWC",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "wayland compositor",
    "window manager",
    "dwl",
    "linux",
    "lightweight wm",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "MangoWC",
    images: [
      {
        url: `${SITE_OG_IMAGE}?v=${IMAGE_VERSION}`,
        width: 1200,
        height: 630,
        alt: "MangoWC Wayland Compositor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_OG_IMAGE}?v=${IMAGE_VERSION}`],
    creator: TWITTER_CREATOR,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-192x192.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: SITE_URL },
  category: "Software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.className} ${geistMono.className}`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#main"
          className="sr-only z-50 rounded bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>
        <RootProvider>
          <Providers>{children}</Providers>
        </RootProvider>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </body>
    </html>
  );
}
