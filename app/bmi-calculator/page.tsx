import { Metadata } from "next";
import BmiCalculatorClient from "./BmiCalculatorClient";

export const metadata: Metadata = {
  title: "BMI Calculator – Body Mass Index Calculator",
  description:
    "Calculate your body mass index online with this free BMI calculator.",
};

export default function BmiCalculatorPage() {
  return <BmiCalculatorClient />;
}