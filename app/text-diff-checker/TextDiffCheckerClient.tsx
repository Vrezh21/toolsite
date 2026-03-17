"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function getDiff(a: string, b: string) {
  if (!a && !b) return null;

  const aLines = a.split("\n");
  const bLines = b.split("\n");

  const max = Math.max(aLines.length, bLines.length);

  const result = [];

  for (let i = 0; i < max; i++) {
    const lineA = aLines[i] || "";
    const lineB = bLines[i] || "";

    if (lineA === lineB) {
      result.push({ type: "same", value: lineA });
    } else {
      if (lineA) result.push({ type: "removed", value: lineA });
      if (lineB) result.push({ type: "added", value: lineB });
    }
  }

  return result;
}

export default function TextDiffCheckerClient() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const diff = useMemo(() => getDiff(textA, textB), [textA, textB]);

  const handleClear = () => {
    setTextA("");
    setTextB("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Text Diff Checker"
        description="Compare two texts and find differences instantly."
        url="https://toolsite.ink/text-diff-checker"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Text Diff Checker" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Text Diff Checker
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Compare two texts and highlight the differences instantly.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="Text A..."
            rows={10}
            className="w-full rounded-xl border px-4 py-3"
          />

          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder="Text B..."
            rows={10}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleClear}
            className="rounded-xl border px-4 py-2"
          >
            Clear
          </button>
        </div>

        {diff ? (
          <div className="mt-6 rounded-xl border bg-white p-4 space-y-2">
            {diff.map((item, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded ${
                  item.type === "same"
                    ? "bg-gray-100"
                    : item.type === "added"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                {item.value}
              </div>
            ))}
          </div>
        ) : null}

        <SeoContent
          aboutTitle="About this Text Diff Checker"
          aboutParagraphs={[
            "This free tool allows you to compare two texts and quickly see the differences.",
            "It is useful for developers, writers, and anyone working with text changes.",
          ]}
          howToUseSteps={[
            "Paste text into both fields.",
            "The tool will automatically highlight differences.",
            "Review added and removed lines.",
          ]}
          faqItems={[
            {
              question: "Is this diff checker free?",
              answer: "Yes, it is completely free.",
            },
            {
              question: "Does it work line by line?",
              answer: "Yes, it compares text line by line.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="text-diff-checker"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}