import { Metadata } from "next";
import Base64EncoderDecoderClient from "./Base64EncoderDecoderClient";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder – Free Online Tool",
  description:
    "Encode text to Base64 and decode Base64 back to text online for free.",
};

export default function Base64EncoderDecoderPage() {
  return <Base64EncoderDecoderClient />;
}