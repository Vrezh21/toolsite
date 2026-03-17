"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function normalizeHex(hex: string) {
  let value = hex.trim().replace("#", "");

  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }

  return value.toUpperCase();
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex);

  if (!/^[0-9A-Fa-f]{6}$/.test(normalized)) return null;

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return { r, g, b, hex: `#${normalized}` };
}

function rgbToHex(r: number, g: number, b: number) {
  const valid = [r, g, b].every(
    (value) => Number.isInteger(value) && value >= 0 && value <= 255
  );

  if (!valid) return null;

  const hex = `#${[r, g, b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;

  return hex;
}

export default function ColorConverterClient() {
  const [hexInput, setHexInput] = useState("#3B82F6");
  const [r, setR] = useState("59");
  const [g, setG] = useState("130");
  const [b, setB] = useState("246");

  const hexResult = useMemo(() => {
    return hexToRgb(hexInput);
  }, [hexInput]);

  const rgbResult = useMemo(() => {
    const red = Number(r);
    const green = Number(g);
    const blue = Number(b);

    if (
      Number.isNaN(red) ||
      Number.isNaN(green) ||
      Number.isNaN(blue)
    ) {
      return null;
    }

    return rgbToHex(red, green, blue);
  }, [r, g, b]);

  const previewColor = hexResult?.hex || rgbResult || "#FFFFFF";

  const handleCopy = async (value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Color Converter"
        description="Convert HEX and RGB color values online for free."
        url="https://toolsite.ink/color-converter"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Color Converter" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">Color Converter</h1>
        <p className="mt-3 text-lg text-slate-700">
          Convert HEX to RGB and RGB to HEX instantly in your browser.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                HEX to RGB
              </h2>

              <label className="mt-4 mb-2 block text-sm font-medium text-slate-800">
                HEX value
              </label>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                placeholder="#FFFFFF"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Result</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {hexResult
                    ? `rgb(${hexResult.r}, ${hexResult.g}, ${hexResult.b})`
                    : "Invalid HEX value"}
                </div>
              </div>

              {hexResult ? (
                <button
                  onClick={() =>
                    handleCopy(
                      `rgb(${hexResult.r}, ${hexResult.g}, ${hexResult.b})`
                    )
                  }
                  className="mt-4 rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
                >
                  Copy RGB
                </button>
              ) : null}
            </div>

            <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                RGB to HEX
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-800">
                    R
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={r}
                    onChange={(e) => setR(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-800">
                    G
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={g}
                    onChange={(e) => setG(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-800">
                    B
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Result</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {rgbResult || "Invalid RGB values"}
                </div>
              </div>

              {rgbResult ? (
                <button
                  onClick={() => handleCopy(rgbResult)}
                  className="mt-4 rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
                >
                  Copy HEX
                </button>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">Color preview</div>

            <div
              className="mt-3 h-56 w-full rounded-2xl border border-slate-200"
              style={{ backgroundColor: previewColor }}
            />

            <div className="mt-4 grid gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Preview HEX</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {hexResult?.hex || rgbResult || "—"}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Preview RGB</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {hexResult
                    ? `rgb(${hexResult.r}, ${hexResult.g}, ${hexResult.b})`
                    : rgbResult
                    ? `rgb(${Number(r)}, ${Number(g)}, ${Number(b)})`
                    : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Color Converter"
          aboutParagraphs={[
            "This color converter helps you convert HEX color codes to RGB values and RGB values back to HEX.",
            "It is useful for designers, frontend developers, and anyone working with colors in web projects.",
          ]}
          howToUseSteps={[
            "Enter a HEX value to convert it to RGB, or enter RGB values to convert them to HEX.",
            "Review the result shown automatically.",
            "Copy the converted value for use in your project.",
          ]}
          faqItems={[
            {
              question: "Can I convert both HEX and RGB here?",
              answer: "Yes, this tool supports both HEX to RGB and RGB to HEX conversion.",
            },
            {
              question: "Is this useful for web design?",
              answer: "Yes, it is useful for CSS, design systems, and frontend development.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="color-converter"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}