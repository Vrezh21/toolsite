import { Metadata } from "next";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

export const metadata: Metadata = {
  title: "Password Generator – Secure Password Tool",
  description:
    "Generate secure random passwords online with custom length and symbols.",
};

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}