import { Metadata } from "next";
import ColorPickerClient from "./ColorPickerClient";

export const metadata: Metadata = {
  title: "Color Picker & Palette Generator",
  description: "Pick colors and generate beautiful palettes online.",
};

export default function ColorPickerPage() {
  return <ColorPickerClient />;
}