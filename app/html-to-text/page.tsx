import { Metadata } from "next";
import HtmlToTextClient from "./HtmlToTextClient";

export const metadata: Metadata = {
  title: "HTML to Text – Free Online Tool",
  description:
    "Convert HTML to plain text online for free. Remove tags and extract readable text instantly.",
};

export default function HtmlToTextPage() {
  return <HtmlToTextClient />;
}