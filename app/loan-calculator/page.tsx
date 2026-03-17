import { Metadata } from "next";
import LoanCalculatorClient from "./LoanCalculatorClient";

export const metadata: Metadata = {
  title: "Loan Calculator – Monthly Payment Calculator",
  description:
    "Calculate monthly loan payments, total payment and total interest online.",
};

export default function LoanCalculatorPage() {
  return <LoanCalculatorClient />;
}