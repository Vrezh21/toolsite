import { Metadata } from "next";
import LoremIpsumGeneratorClient from "./LoremIpsumGeneratorClient";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator – Free Online Tool",
  description:
    "Generate lorem ipsum text online in words, sentences or paragraphs.",
};

export default function LoremIpsumGeneratorPage() {
  return <LoremIpsumGeneratorClient />;
}