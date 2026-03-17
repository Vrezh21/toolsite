import { Metadata } from "next";
import TimestampConverterClient from "./TimestampConverterClient";

export const metadata: Metadata = {
  title: "Timestamp Converter – Unix Timestamp Tool",
  description: "Convert Unix timestamps to readable dates and convert dates to Unix timestamps online.",
};

export default function TimestampConverterPage() {
  return <TimestampConverterClient />;
}