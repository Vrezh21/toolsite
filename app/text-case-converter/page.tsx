import { Metadata } from "next";
import TextCaseConverterClient from "./TextCaseConverterClient";

export const metadata: Metadata = {
  title: "Text Case Converter – Change Text Case Online",
  description:
    "Convert text to uppercase, lowercase, sentence case and capitalize words online.",
};

export default function TextCaseConverterPage() {
  return <TextCaseConverterClient />;
}