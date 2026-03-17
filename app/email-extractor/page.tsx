import { Metadata } from "next";
import EmailExtractorClient from "./EmailExtractorClient";

export const metadata: Metadata = {
  title: "Email Extractor – Free Online Tool",
  description:
    "Extract email addresses from text online for free. Find, copy, and remove duplicate emails instantly.",
};

export default function EmailExtractorPage() {
  return <EmailExtractorClient />;
}