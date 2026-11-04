import type { Metadata } from "next";
import ClassicPortfolio from "@/components/ClassicPortfolio";

export const metadata: Metadata = {
  title: "Daffa Bagus Maulana | Portfolio",
  description:
    "Portfolio of Daffa Bagus Maulana, a computer science graduate working across data, machine learning, and software development.",
};

export default function ClassicPage() {
  return <ClassicPortfolio />;
}
