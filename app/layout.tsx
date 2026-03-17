import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ToolSite – Online Tools & Calculators",
    template: "%s | ToolSite",
  },
  description:
    "Free online tools and calculators including password generator, JSON formatter, text tools, unit converter and more.",
  keywords: [
    "online tools",
    "calculators",
    "password generator",
    "json formatter",
    "text tools",
    "unit converter",
  ],
  openGraph: {
    title: "ToolSite – Online Tools & Calculators",
    description:
      "Free online tools and calculators for everyday tasks.",
    url: "https://toolsite.ink",
    siteName: "ToolSite",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}