"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function CharacterCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      lines: text ? text.split("\n").length : 0,
    };
  }, [text]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Character Counter"
        description="Count characters, words, lines, and characters without spaces."
        url="https://toolsite.ink/character-counter"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Character Counter" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Character Counter
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Count characters, words, lines, and characters without spaces.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Enter text
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start Typing..."
            className="min-h-[260px] w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="text-sm text-slate-500">Words</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {stats.words}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Lines</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {stats.lines}
              </div>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Character Counter"
          aboutParagraphs={[
            "This character counter measures text length instantly.",
            "It counts characters, characters without spaces, words, and lines.",
          ]}
          howToUseSteps={[
            "Paste or type text into the input area.",
            "View the live counts.",
            "Use the values to stay within text limits.",
          ]}
          faqItems={[
            {
              question: "Does it count characters without spaces?",
              answer: "Yes, the tool provides both counts.",
            },
            {
              question: "Is it useful for social media?",
              answer: "Yes, it helps stay within character limits.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="character-counter"
          category="tools"
          title="Related tools"
        />

      </main>
      <Footer />
    </div>
  );
}