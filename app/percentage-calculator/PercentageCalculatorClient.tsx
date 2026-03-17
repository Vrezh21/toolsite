"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function PercentageCalculatorPage() {
  const [percent, setPercent] = useState("10");
  const [value, setValue] = useState("200");

  const [baseValue, setBaseValue] = useState("100");
  const [increasePercent, setIncreasePercent] = useState("15");

  const [partValue, setPartValue] = useState("50");
  const [totalValue, setTotalValue] = useState("200");

  const p = Number(percent) || 0;
  const v = Number(value) || 0;

  const b = Number(baseValue) || 0;
  const ip = Number(increasePercent) || 0;

  const part = Number(partValue) || 0;
  const total = Number(totalValue) || 0;

  const result1 = (p / 100) * v;
  const result2 = b + (b * ip) / 100;
  const result3 = total !== 0 ? (part / total) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

            <ToolStructuredData
        name="Percentage Calculator"
        description="Calculate percentages, increases, decreases, and ratios between numbers."
        url="https://toolsite.ink/percentage-calculator"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Percentage Calculator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Percentage Calculator
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          What is X% of Y?
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              What is X% of Y?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              For example: 10% of 200
            </p>

            <div className="mt-5 space-y-3">
              <input
                type="number"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                placeholder="Percentage"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />

              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Number"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Result</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {result1}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Increase a number by a percentage
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              For example: increase 100 by 15%
            </p>

            <div className="mt-5 space-y-3">
              <input
                type="number"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
                placeholder="Base number"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />

              <input
                type="number"
                value={increasePercent}
                onChange={(e) => setIncreasePercent(e.target.value)}
                placeholder="Percentage"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Result</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {result2}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm md:col-span-2 xl:col-span-1">
            <h2 className="text-xl font-semibold text-slate-900">
              What percentage is one number of another?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              For example: 50 of 200 = 25%
            </p>

            <div className="mt-5 space-y-3">
              <input
                type="number"
                value={partValue}
                onChange={(e) => setPartValue(e.target.value)}
                placeholder="Part"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />

              <input
                type="number"
                value={totalValue}
                onChange={(e) => setTotalValue(e.target.value)}
                placeholder="Total number"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Result</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {result3}%
              </div>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Percentage Calculator"
          aboutParagraphs={[
            "This free percentage calculator helps you quickly solve common percentage problems.",
            "You can calculate percentages, increases, decreases, and percentage relationships between numbers.",
          ]}
          howToUseSteps={[
            "Choose the type of percentage calculation you need.",
            "Enter the numbers in the input fields.",
            "Review the result calculated automatically.",
          ]}
          faqItems={[
            {
              question: "What can I calculate with this tool?",
              answer: "You can calculate percentages, increases, decreases, and ratios between numbers.",
            },
            {
              question: "Is the calculator free?",
              answer: "Yes, this calculator is completely free and works directly in your browser.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="percentage-calculator"
          category="calculators"
          title="Related calculators"
        />

      </main>
      <Footer />
    </div>
  );
}