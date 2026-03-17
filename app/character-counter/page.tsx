import { Metadata } from "next";
import CharacterCounterClient from "./CharacterCounterClient";

export const metadata: Metadata = {
  title: "Character Counter – Free Online Tool",
  description:
    "Count characters, words, lines and characters without spaces online.",
};

export default function CharacterCounterPage() {
  return <CharacterCounterClient />;
}