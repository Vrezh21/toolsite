import { Metadata } from "next";
import UrlEncoderDecoderClient from "./UrlEncoderDecoderClient";

export const metadata: Metadata = {
  title: "URL Encoder / Decoder – Free Online Tool",
  description: "Encode and decode URLs online instantly for free.",
};

export default function UrlEncoderDecoderPage() {
  return <UrlEncoderDecoderClient />;
}