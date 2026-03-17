import { Metadata } from "next";
import QrCodeGeneratorClient from "./QrCodeGeneratorClient";

export const metadata: Metadata = {
  title: "QR Code Generator – Free Online Tool",
  description: "Generate QR codes online instantly for links, text, and more.",
};

export default function QrCodeGeneratorPage() {
  return <QrCodeGeneratorClient />;
}