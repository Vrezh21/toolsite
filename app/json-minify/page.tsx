import { Metadata } from "next";
import JsonMinifyClient from "./JsonMinifyClient";

export const metadata: Metadata = {
  title: "JSON Minify – Free Online Tool",
  description: "Minify JSON by removing spaces and formatting instantly.",
};

export default function Page() {
  return <JsonMinifyClient />;
}