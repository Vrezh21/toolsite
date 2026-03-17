import { Metadata } from "next";
import TextDiffCheckerClient from "./TextDiffCheckerClient";

export const metadata: Metadata = {
  title: "Text Diff Checker – Compare Text Online Free",
  description:
    "Compare two texts and find differences instantly. Free online text diff checker.",
};

export default function TextDiffCheckerPage() {
  return <TextDiffCheckerClient />;
}