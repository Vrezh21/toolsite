import { Metadata } from "next";
import PercentageChangeCalculatorClient from "./PercentageChangeCalculatorClient";

export const metadata: Metadata = {
  title: "Percentage Change Calculator – Free Online Tool",
  description:
    "Calculate percentage increase or decrease between two values online.",
};

export default function PercentageChangeCalculatorPage() {
  return <PercentageChangeCalculatorClient />;
}