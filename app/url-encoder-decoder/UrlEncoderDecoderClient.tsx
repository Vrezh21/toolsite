"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function UrlEncoderDecoderClient() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setResult(encoded);
      setError("");
    } catch {
      setResult("");
      setError("Failed to encode URL");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setResult(decoded);
      setError("");
    } catch {
      setResult("");
      setError("Failed to decode URL");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setError("");
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="URL Encoder / Decoder"
        description="Encode and decode URLs online instantly for free."
        url="https://toolsite.ink/url-encoder-decoder"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "URL Encoder / Decoder" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          URL Encoder / Decoder
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Encode and decode URLs directly in your browser.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Input
            </label>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or encoded URL..."
              className="min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleEncode}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                Encode
              </button>

              <button
                onClick={handleDecode}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Decode
              </button>

              <button
                onClick={handleClear}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Clear
              </button>
            </div>

            {error ? (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Result
            </label>

            <textarea
              value={result}
              readOnly
              placeholder="The result will appear here..."
              className="min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none"
            />

            <div className="mt-4">
              <button
                onClick={handleCopy}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Copy result
              </button>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this URL Encoder / Decoder"
          aboutParagraphs={[
            "This tool helps you encode URLs into a safe format and decode encoded URLs back into readable text.",
            "It is useful for developers, query strings, API requests, redirects, and web debugging.",
          ]}
          howToUseSteps={[
            "Paste text or a URL into the input field.",
            "Click Encode to convert it into URL-safe format, or Decode to reverse it.",
            "Copy the result for use in your project or browser.",
          ]}
          faqItems={[
            {
              question: "What is URL encoding?",
              answer:
                "URL encoding converts special characters into a format that can be safely used in URLs.",
            },
            {
              question: "Can I decode encoded query strings?",
              answer:
                "Yes, this tool can decode URL-encoded text and query parameters.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="url-encoder-decoder"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}