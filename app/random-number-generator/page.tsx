import { Metadata } from "next";
import RandomNumberGeneratorClient from "./RandomNumberGeneratorClient";

export const metadata: Metadata = {
  title: "Random Number Generator – Free Online Tool",
  description:
    "Generate random numbers online with custom range and quantity.",
};

export default function RandomNumberGeneratorPage() {
  return <RandomNumberGeneratorClient />;
}