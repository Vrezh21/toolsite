import { Metadata } from "next";
import Base64ToolClient from "./Base64ToolClient";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder – Free Online Tool",
  description:
    "Encode and decode Base64 strings online for free.",
};

export default function Base64ToolPage() {
  return <Base64ToolClient />;
}