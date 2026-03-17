import { Metadata } from "next";
import UrlExtractorClient from "./UrlExtractorClient";

export const metadata: Metadata = {
  title: "URL Extractor – Free Online Tool",
  description:
    "Extract URLs and links from text online for free. Find, copy, and download all links instantly.",
};

export default function UrlExtractorPage() {
  return <UrlExtractorClient />;
}