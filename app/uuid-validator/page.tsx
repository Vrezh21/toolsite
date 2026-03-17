import { Metadata } from "next";
import UuidValidatorClient from "./UuidValidatorClient";

export const metadata: Metadata = {
  title: "UUID Validator – Free Online Tool",
  description:
    "Validate UUID strings online for free. Check whether a UUID has a valid format instantly.",
};

export default function UuidValidatorPage() {
  return <UuidValidatorClient />;
}