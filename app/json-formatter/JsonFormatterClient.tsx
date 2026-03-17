"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function JsonFormatterPage() {
  const [input, setInput] = useState(`{"name":"ToolSite","type":"json formatter"}`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid JSON");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid JSON");
    }
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
        name="JSON Formatter"
        description="Format, validate, and minify JSON directly in your browser."
        url="https://toolsite.ink/json-formatter"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "JSON Formatter" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">JSON Formatter</h1>
        <p className="mt-3 text-lg text-slate-700">
          Format, minify, and validate JSON directly in your browser.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Input JSON
            </label>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"example": true}'
              className="min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm text-slate-900 outline-none focus:border-slate-500"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleFormat}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                Format
              </button>

              <button
                onClick={handleMinify}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Minify
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
              className="min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm text-slate-900 outline-none"
            />
          </div>
        </div>

        <SeoContent
          aboutTitle="About this JSON Formatter"
          aboutParagraphs={[
            "This JSON formatter helps you format, validate, and minify JSON code.",
            "It is useful for developers working with APIs, configuration files, and structured data.",
          ]}
          howToUseSteps={[
            "Paste your JSON code into the input area.",
            "Click Format or Minify depending on your needs.",
            "Copy the result for use in your project.",
          ]}
          faqItems={[
            {
              question: "Can it validate JSON?",
              answer: "Yes, invalid JSON will show an error message.",
            },
            {
              question: "Is the data sent to a server?",
              answer: "No, everything is processed locally in your browser.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="json-formatter"
          category="tools"
          title="Related tools"
        />

      </main>
      <Footer />
    </div>
  );
}