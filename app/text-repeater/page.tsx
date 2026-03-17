import { Metadata } from "next";
import TextRepeaterClient from "./TextRepeaterClient";

export const metadata: Metadata = {
  title: "Text Repeater – Repeat Text Online",
  description:
    "Repeat text multiple times online with a custom separator.",
};

export default function TextRepeaterPage() {
  return <TextRepeaterClient />;
}