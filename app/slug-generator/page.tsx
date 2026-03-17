import { Metadata } from "next";
import SlugGeneratorClient from "./SlugGeneratorClient";

export const metadata: Metadata = {
  title: "Slug Generator – Free Online Tool",
  description:
    "Convert text into a clean SEO-friendly slug online.",
};

export default function SlugGeneratorPage() {
  return <SlugGeneratorClient />;
}