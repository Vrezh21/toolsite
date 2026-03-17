import { Metadata } from "next";
import ColorConverterClient from "./ColorConverterClient";

export const metadata: Metadata = {
  title: "Color Converter – HEX to RGB and RGB to HEX",
  description: "Convert HEX and RGB color values online for free.",
};

export default function ColorConverterPage() {
  return <ColorConverterClient />;
}