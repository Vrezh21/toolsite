"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase();
}

export default function ColorPickerClient() {
  const [color, setColor] = useState("#3B82F6");
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = () => {
    const newPalette = Array.from({ length: 5 }, () => randomColor());
    setPalette(newPalette);
  };

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Color Picker & Palette Generator"
        description="Pick colors and generate color palettes online."
        url="https://toolsite.ink/color-picker"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Color Picker" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Color Picker & Palette Generator
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Pick colors and generate beautiful palettes instantly.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Pick a color
            </label>

            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value.toUpperCase())}
              className="h-16 w-full cursor-pointer rounded-xl border border-slate-300"
            />

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Selected HEX</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {color}
              </div>
            </div>

            <button
              onClick={() => handleCopy(color)}
              className="mt-4 rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 hover:bg-slate-50"
            >
              Copy HEX
            </button>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <button
              onClick={generatePalette}
              className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Generate palette
            </button>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {palette.map((c, i) => (
                <div
                  key={i}
                  className="cursor-pointer rounded-xl p-6 text-center text-white"
                  style={{ backgroundColor: c }}
                  onClick={() => handleCopy(c)}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Color Picker"
          aboutParagraphs={[
            "This color picker helps you choose colors and generate palettes instantly.",
            "It is useful for designers, developers, and branding projects.",
          ]}
          howToUseSteps={[
            "Pick a color using the color input.",
            "Copy the HEX value.",
            "Generate palettes for inspiration.",
          ]}
          faqItems={[
            {
              question: "Can I copy colors?",
              answer: "Yes, click any color to copy it.",
            },
            {
              question: "Can I generate palettes?",
              answer: "Yes, click generate to create a palette.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="color-picker"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}