import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.PORTFOLIO_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daffa Bagus Maulana | Portfolio",
    template: "%s | Daffa Bagus Maulana",
  },
  description:
    "Portfolio of Daffa Bagus Maulana, an Informatics graduate with experience in customer analytics, machine learning, software development, and AIESEC leadership.",
  applicationName: "Daffa Bagus Maulana Portfolio",
  authors: [{ name: "Daffa Bagus Maulana" }],
  creator: "Daffa Bagus Maulana",
  publisher: "Daffa Bagus Maulana",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Daffa Bagus Maulana | Portfolio",
    title: "Daffa Bagus Maulana | Portfolio",
    description:
      "Explore Daffa's experience, projects, and skills across customer analytics, machine learning, software development, and leadership.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daffa Bagus Maulana | Portfolio",
    description:
      "Explore Daffa's experience, projects, and skills across customer analytics, machine learning, software development, and leadership.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
