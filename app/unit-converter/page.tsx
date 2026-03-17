import { Metadata } from "next";
import UnitConverterClient from "./UnitConverterClient";

export const metadata: Metadata = {
  title: "Unit Converter – Length, Weight and Temperature",
  description:
    "Convert units of length, weight and temperature online for free.",
};

export default function UnitConverterPage() {
  return <UnitConverterClient />;
}