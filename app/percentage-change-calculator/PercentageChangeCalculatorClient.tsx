"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function PercentageChangeCalculatorPage() {
  const [oldValue, setOldValue] = useState("100");
  const [newValue, setNewValue] = useState("125");

  const result = useMemo(() => {
    const oldNum = Number(oldValue);
    const newNum = Number(newValue);

    if (Number.isNaN(oldNum) || Number.isNaN(newNum) || oldNum === 0) {
      return {
        error: "Enter valid values. The old value must not be 0.",
        change: null as number | null,
        difference: null as number | null,
        direction: "",
      };
    }

    const difference = newNum - oldNum;
    const change = (difference / oldNum) * 100;

    let direction = "No change";
    if (difference > 0) direction = "Increase";
    if (difference < 0) direction = "Decrease";

    return {
      error: "",
      change,
      difference,
      direction,
    };
  }, [oldValue, newValue]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Percentage Change Calculator"
        description="Calculate percentage increase or decrease between two values."
        url="https://toolsite.ink/percentage-change-calculator"
      />

      <main className="mx-auto max-w-4xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "BMI Calculator" },
          ]}
        />
        
        <h1 className="text-4xl font-bold text-slate-900">
          Percentage Change Calculator
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Calculate the percentage change between an old value and a new value.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Old Value
              </label>
              <input
                type="number"
                value={oldValue}
                onChange={(e) => setOldValue(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                New value
              </label>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>
          </div>

          {result.error ? (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {result.error}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Change</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">
                  {result.change?.toFixed(2)}%
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Difference</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">
                  {result.difference}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Change Type</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">
                  {result.direction}
                </div>
              </div>
            </div>
          )}
        </div>

        <SeoContent
          aboutTitle="About this Percentage Change Calculator"
          aboutParagraphs={[
            "This calculator shows the percentage difference between two values.",
            "It is useful for finance, analytics, and data comparison.",
          ]}
          howToUseSteps={[
            "Enter the old value.",
            "Enter the new value.",
            "Review the percentage change result.",
          ]}
          faqItems={[
            {
              question: "Can it show both increase and decrease?",
              answer: "Yes, the tool identifies whether the value increased or decreased.",
            },
            {
              question: "Why can't the old value be zero?",
              answer: "Percentage change requires dividing by the original value.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="percentage-change-calculator"
          category="calculators"
          title="Related calculators"
        />

      </main>

      <Footer />
    </div>
  );
}