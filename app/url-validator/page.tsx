import { Metadata } from "next";
import UrlValidatorClient from "./UrlValidatorClient";

export const metadata: Metadata = {
  title: "URL Validator – Free Online Tool",
  description:
    "Validate URLs online for free. Check whether a URL has a valid format instantly.",
};

export default function UrlValidatorPage() {
  return <UrlValidatorClient />;
}