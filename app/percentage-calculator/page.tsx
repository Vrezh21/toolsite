import { Metadata } from "next";
import PercentageCalculatorClient from "./PercentageCalculatorClient";

export const metadata: Metadata = {
  title: "Percentage Calculator – Free Online Tool",
  description:
    "Calculate percentages, percentage increase and percentage of a number online.",
};

export default function PercentageCalculatorPage() {
  return <PercentageCalculatorClient />;
}