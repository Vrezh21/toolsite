import { Metadata } from "next";
import CsvToJsonClient from "./CsvToJsonClient";

export const metadata: Metadata = {
  title: "CSV to JSON – Free Online Tool",
  description: "Convert CSV data to JSON format online.",
};

export default function Page() {
  return <CsvToJsonClient />;
}