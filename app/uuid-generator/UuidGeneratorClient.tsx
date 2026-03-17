"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function generateUuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export default function UuidGeneratorClient() {
  const [count, setCount] = useState("5");
  const [refreshKey, setRefreshKey] = useState(0);

  const uuids = useMemo(() => {
    const total = Number(count);

    if (!total || total < 1) return [];

    return Array.from({ length: Math.min(total, 100) }, () => generateUuid());
  }, [count, refreshKey]);

  const handleCopyAll = async () => {
    if (!uuids.length) return;
    await navigator.clipboard.writeText(uuids.join("\n"));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="UUID Generator"
        description="Generate random UUIDs online instantly for free."
        url="https://toolsite.ink/uuid-generator"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "UUID Generator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">UUID Generator</h1>
        <p className="mt-3 text-lg text-slate-700">
          Generate random UUIDs instantly for development, testing, and database
          records.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Number of UUIDs
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setRefreshKey((prev) => prev + 1)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                Generate again
              </button>

              <button
                onClick={handleCopyAll}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Copy all
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">Generated UUIDs</div>

            <textarea
              readOnly
              value={uuids.join("\n")}
              className="mt-3 min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm text-slate-900 outline-none"
            />
          </div>
        </div>

        <SeoContent
          aboutTitle="About this UUID Generator"
          aboutParagraphs={[
            "This UUID generator creates random universally unique identifiers instantly in your browser.",
            "It is useful for developers, databases, APIs, testing, and any use case where unique IDs are needed.",
          ]}
          howToUseSteps={[
            "Choose how many UUIDs you want to generate.",
            "Click Generate again to create new UUIDs.",
            "Copy the generated UUIDs for use in your project.",
          ]}
          faqItems={[
            {
              question: "What is a UUID?",
              answer:
                "A UUID is a universally unique identifier used to uniquely identify records and objects.",
            },
            {
              question: "Can I generate multiple UUIDs at once?",
              answer:
                "Yes, you can generate multiple UUIDs in a single run.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="uuid-generator"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}