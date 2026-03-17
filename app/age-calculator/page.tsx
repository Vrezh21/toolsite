import { Metadata } from "next";
import AgeCalculatorClient from "./AgeCalculatorClient";

export const metadata: Metadata = {
  title: "Age Calculator – Free Online Tool",
  description:
    "Calculate exact age online in years, months and days with this free age calculator.",
};

export default function AgeCalculatorPage() {
  return <AgeCalculatorClient />;
}