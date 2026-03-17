"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function TextCaseConverterPage() {
  const [text, setText] = useState("");

  const handleCopy = async (value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
  };

  const lowercase = text.toLowerCase();
  const uppercase = text.toUpperCase();
  const capitalize = text.replace(/\b\w/g, (char) => char.toUpperCase());
  const sentenceCase =
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Text Case Converter"
        description="Convert text to lowercase, uppercase, sentence case, and capitalized case."
        url="https://toolsite.ink/text-case-converter"
      />

      <main className="mx-auto max-w-6xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Text Case Converter" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Text Case Converter
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Convert text to lowercase, UPPERCASE, Capitalize Words, and Sentence case.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Input text
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[220px] w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">lowercase</div>
            <div className="mt-2 min-h-[100px] break-words rounded-xl bg-slate-50 p-4 text-slate-900">
              {lowercase || "—"}
            </div>
            <button
              onClick={() => handleCopy(lowercase)}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Copy
            </button>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">UPPERCASE</div>
            <div className="mt-2 min-h-[100px] break-words rounded-xl bg-slate-50 p-4 text-slate-900">
              {uppercase || "—"}
            </div>
            <button
              onClick={() => handleCopy(uppercase)}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Copy
            </button>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Capitalize Words</div>
            <div className="mt-2 min-h-[100px] break-words rounded-xl bg-slate-50 p-4 text-slate-900">
              {capitalize || "—"}
            </div>
            <button
              onClick={() => handleCopy(capitalize)}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Copy
            </button>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Sentence case</div>
            <div className="mt-2 min-h-[100px] break-words rounded-xl bg-slate-50 p-4 text-slate-900">
              {sentenceCase || "—"}
            </div>
            <button
              onClick={() => handleCopy(sentenceCase)}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Copy
            </button>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Text Case Converter"
          aboutParagraphs={[
            "This text case converter changes the capitalization style of text.",
            "It supports lowercase, uppercase, sentence case, and capitalized words.",
          ]}
          howToUseSteps={[
            "Paste or type text into the input area.",
            "Review the generated case variations.",
            "Copy the version you need.",
          ]}
          faqItems={[
            {
              question: "Which cases are supported?",
              answer: "Lowercase, uppercase, sentence case, and capitalized case.",
            },
            {
              question: "Is this useful for content writing?",
              answer: "Yes, it helps format titles and headings quickly.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="text-case-converter"
          category="tools"
          title="Related tools"
        />

      </main>
      <Footer />
    </div>
  );
}