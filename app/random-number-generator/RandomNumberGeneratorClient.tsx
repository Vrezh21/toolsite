"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const result = useMemo(() => {
    const minValue = Number(min);
    const maxValue = Number(max);
    const countValue = Number(count);

    if (
      Number.isNaN(minValue) ||
      Number.isNaN(maxValue) ||
      Number.isNaN(countValue) ||
      countValue < 1 ||
      minValue > maxValue
    ) {
      return {
        error: "Check the range and number count.",
        numbers: [] as number[],
      };
    }

    const rangeSize = maxValue - minValue + 1;

    if (!allowDuplicates && countValue > rangeSize) {
      return {
        error:
          "You cannot generate that many unique numbers in the selected range.",
        numbers: [] as number[],
      };
    }

    const numbers: number[] = [];

    if (allowDuplicates) {
      for (let i = 0; i < countValue; i++) {
        const random =
          Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        numbers.push(random);
      }
    } else {
      const pool: number[] = [];
      for (let i = minValue; i <= maxValue; i++) {
        pool.push(i);
      }

      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      numbers.push(...pool.slice(0, countValue));
    }

    return { error: "", numbers };
  }, [min, max, count, allowDuplicates, refreshKey]);

  const handleCopy = async () => {
    if (!result.numbers.length) return;
    await navigator.clipboard.writeText(result.numbers.join(", "));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Random Number Generator"
        description="Generate random numbers within a custom range."
        url="https://toolsite.ink/random-number-generator"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Random Number Generator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Random Number Generator
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Generate random numbers in a custom range with or without duplicates.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">
                  Minimum
                </label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">
                  Maximum
                </label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Number count
              </label>
              <input
                type="number"
                min="1"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-3 text-slate-800">
                <input
                  type="checkbox"
                  checked={allowDuplicates}
                  onChange={(e) => setAllowDuplicates(e.target.checked)}
                />
                Allow duplicates
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">Result</div>

            {result.error ? (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {result.error}
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="break-words text-lg font-semibold text-slate-900">
                  {result.numbers.length ? result.numbers.join(", ") : "—"}
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setRefreshKey((prev) => prev + 1)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                Generate New
              </button>

              <button
                onClick={handleCopy}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Random Number Generator"
          aboutParagraphs={[
            "This tool generates random numbers within a custom range.",
            "It is useful for simulations, testing, games, and statistics.",
          ]}
          howToUseSteps={[
            "Set minimum and maximum numbers.",
            "Choose how many numbers to generate.",
            "Generate and copy the result.",
          ]}
          faqItems={[
            {
              question: "Can numbers repeat?",
              answer: "Yes, you can allow or disable duplicates.",
            },
            {
              question: "How many numbers can I generate?",
              answer: "You can generate multiple numbers depending on the range.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="random-number-generator"
          category="tools"
          title="Related tools"
        />

      </main>

      <Footer />
    </div>
  );
}