"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function Base64ToolPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError("");
    } catch {
      setOutput("");
      setError("Failed to encode text");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError("");
    } catch {
      setOutput("");
      setError("Failed to decode Base64");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Base64 Encoder / Decoder"
        description="Encode and decode Base64 strings online."
        url="https://toolsite.ink/base64-tool"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Base64 Encoder / Decoder" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Base64 Encoder / Decoder
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Encode and decode Base64 directly in your browser without sending data to a server.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Input text or Base64
            </label>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste text or Base64..."
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
              value={output}
              readOnly
              placeholder="The result will appear here..."
              className="min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Base64 Encoder / Decoder"
          aboutParagraphs={[
            "This tool allows you to encode text to Base64 and decode Base64 back to text.",
            "It is commonly used in web development, APIs, and data transfer.",
          ]}
          howToUseSteps={[
            "Paste text or Base64 into the input field.",
            "Click Encode or Decode.",
            "Copy the result.",
          ]}
          faqItems={[
            {
              question: "What is Base64 used for?",
              answer: "Base64 is used to encode binary data into text format.",
            },
            {
              question: "Is the conversion secure?",
              answer: "Yes, the conversion happens locally in your browser.",
            },
          ]}
        />


        <RelatedTools
          currentSlug="base64-tool"
          category="tools"
          title="Related tools"
        />

      </main>
      <Footer />
    </div>
  );
}