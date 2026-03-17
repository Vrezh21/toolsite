import { Metadata } from "next";
import PasswordStrengthCheckerClient from "./PasswordStrengthCheckerClient";

export const metadata: Metadata = {
  title: "Password Strength Checker – Free Online Tool",
  description:
    "Check password strength online for free. Test whether your password is weak, medium, or strong instantly.",
};

export default function PasswordStrengthCheckerPage() {
  return <PasswordStrengthCheckerClient />;
}