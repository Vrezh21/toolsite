"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { useMemo, useState } from "react";

export default function CalculatorsPage() {
  const [query, setQuery] = useState("");

  const onlyCalculators = tools.filter(
    (item) => item.category === "calculators"
  );

  const filteredCalculators = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return onlyCalculators;

    return onlyCalculators.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
      );
    });
  }, [query, onlyCalculators]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
                Online Calculators
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Calculators
              </h1>

              <p className="mt-4 text-lg leading-8 text-slate-700">
                Online calculators for age, percentages, BMI, loans, and other
                quick calculations without installing software.
              </p>

              <div className="mt-6 text-sm text-slate-500">
                Available calculators:{" "}
                <span className="font-semibold text-slate-900">
                  {filteredCalculators.length}
                </span>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-slate-800">
                  Search calculators
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try: age, percentage, bmi..."
                  className="w-full max-w-xl rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          {filteredCalculators.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCalculators.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  slug={tool.slug}
                  name={tool.name}
                  description={tool.description}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-300 bg-white p-6 text-slate-600 shadow-sm">
              No calculators found for this query.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}