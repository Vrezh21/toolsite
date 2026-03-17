"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function htmlToText(html: string) {
  if (!html.trim()) return "";

  if (typeof window === "undefined") return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+\n/g, "\n").trim();
}

export default function HtmlToTextClient() {
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    return htmlToText(input);
  }, [input]);

  const handleClear = () => {
    setInput("");
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="HTML to Text"
        description="Convert HTML code to plain readable text instantly."
        url="https://toolsite.ink/html-to-text"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "HTML to Text" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">HTML to Text</h1>
        <p className="mt-3 text-lg text-slate-700">
          Convert HTML into plain text by removing tags and keeping readable content.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            HTML input
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<h1>Hello</h1><p>This is sample text.</p>"
            rows={10}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={!output}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy text
            </button>

            <button
              onClick={handleClear}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
            >
              Clear
            </button>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Plain text output
            </label>

            <textarea
              value={output}
              readOnly
              rows={10}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            />
          </div>
        </div>

        <SeoContent
          aboutTitle="About this HTML to Text tool"
          aboutParagraphs={[
            "This free HTML to Text tool converts HTML code into plain readable text by removing markup tags.",
            "It is useful for cleaning copied HTML, extracting content, testing snippets, and simplifying raw markup.",
          ]}
          howToUseSteps={[
            "Paste your HTML code into the input field.",
            "The tool will automatically remove HTML tags.",
            "Copy the plain text result from the output field.",
          ]}
          faqItems={[
            {
              question: "Is this HTML to Text tool free?",
              answer: "Yes, this tool is completely free to use online.",
            },
            {
              question: "Does it remove HTML tags?",
              answer: "Yes, it removes tags and keeps readable plain text.",
            },
            {
              question: "Can I copy the converted text?",
              answer: "Yes, you can copy the output with one click.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="html-to-text"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}