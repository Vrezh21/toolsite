"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();

    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const lines = text ? text.split("\n").length : 0;
    const paragraphs = trimmed
      ? text.split(/\n\s*\n/).filter((item) => item.trim() !== "").length
      : 0;

    return {
      words,
      characters,
      charactersNoSpaces,
      lines,
      paragraphs,
    };
  }, [text]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Word Counter"
        description="Count words, characters, lines, and paragraphs instantly."
        url="https://toolsite.ink/word-counter"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Word Counter" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">Word Counter</h1>
        <p className="mt-3 text-lg text-slate-700">
          Count words, characters, lines, and paragraphs in your text.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Enter text
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[260px] w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Words</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {stats.words}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Characters</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {stats.characters}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Without spaces</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {stats.charactersNoSpaces}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Lines</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {stats.lines}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Pharagraphs</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {stats.paragraphs}
              </div>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Word Counter"
          aboutParagraphs={[
            "This word counter measures words, characters, lines, and paragraphs in your text.",
            "It is useful for writing, blogging, SEO, school assignments, and editing.",
          ]}
          howToUseSteps={[
            "Paste or type text into the input field.",
            "Review the counts that update automatically.",
            "Use the data for writing limits or optimization.",
          ]}
          faqItems={[
            {
              question: "What does the word counter measure?",
              answer: "It counts words, characters, characters without spaces, lines, and paragraphs.",
            },
            {
              question: "Does it update automatically?",
              answer: "Yes, the counts update instantly as you type.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="word-counter"
          category="tools"
          title="Related tools"
        />

      </main>
      <Footer />
    </div>
  );
}