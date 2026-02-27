import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { Providers } from "./providers";

const siteConfig = {
  name: "OddsMaster Intelligence",
  description: "Institutional-grade AI predictions for sports markets. Turn matches into an automated asset class.",
  url: "https://oddsmaster.vip",
  ogImage: "https://oddsmaster.vip/FINALBG.png", // Using an existing high-quality image
  links: {
    twitter: "https://twitter.com/oddsmaster",
    github: "https://github.com/oddsmaster",
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://oddsmaster.vip'),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI Betting",
    "Sports Prediction",
    "Predictive Analytics",
    "OddsMaster",
    "Sports AI",
    "Arbitrage Betting",
    "Smart Betting",
    "Quant Sports",
    "Algorithmic Betting",
    "Sports Trading",
    "Predictive Sports Analytics",
    "Sports Market Efficiency",
  ],
  authors: [
    {
      name: "OddsMaster Team",
      url: "https://oddsmaster.vip",
    },
  ],
  creator: "OddsMaster",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@oddsmaster",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: '/site.webmanifest',
};

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.transparenttextures.com" />
      </head>
      <body className={`${inter.variable} antialiased selection:bg-[#07b57e]/30 font-sans`}>
        <Providers>
          {children}
        </Providers>
        <GoogleAnalytics gaId="G-C9TMDEM4Z0" />
      </body>
    </html>
  );
}
