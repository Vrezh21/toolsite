import { Metadata } from "next";
import EmailValidatorClient from "./EmailValidatorClient";

export const metadata: Metadata = {
  title: "Email Validator – Free Online Tool",
  description:
    "Validate email addresses online for free. Check if an email has a valid format instantly.",
};

export default function EmailValidatorPage() {
  return <EmailValidatorClient />;
}