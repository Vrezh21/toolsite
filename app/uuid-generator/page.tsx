import { Metadata } from "next";
import UuidGeneratorClient from "./UuidGeneratorClient";

export const metadata: Metadata = {
  title: "UUID Generator – Free Online Tool",
  description: "Generate random UUIDs online instantly for free.",
};

export default function UuidGeneratorPage() {
  return <UuidGeneratorClient />;
}