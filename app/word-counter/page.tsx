import { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter – Free Online Text Tool",
  description:
    "Count words, characters, lines and paragraphs online with this free word counter.",
};

export default function WordCounterPage() {
  return <WordCounterClient />;
}