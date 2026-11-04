import type { Metadata } from "next";
import ClassicPortfolio from "@/components/ClassicPortfolio";

export const metadata: Metadata = {
  title: "Classic Portfolio",
  description:
    "Portfolio of Daffa Bagus Maulana, a computer science graduate working across data, machine learning, and software development.",
  alternates: {
    canonical: "/classic",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Daffa Bagus Maulana | Portfolio",
    title: "Daffa Bagus Maulana | Classic Portfolio",
    description:
      "Explore Daffa's experience, projects, and skills across data, machine learning, and software development.",
    url: "/classic",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Daffa Bagus Maulana - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daffa Bagus Maulana | Classic Portfolio",
    description:
      "Explore Daffa's experience, projects, and skills across data, machine learning, and software development.",
    images: ["/opengraph-image"],
  },
};

export default function ClassicPage() {
  return <ClassicPortfolio />;
}
