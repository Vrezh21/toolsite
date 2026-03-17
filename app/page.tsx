"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return tools.slice(0, 6);

    return tools.filter((tool) => {
      const categoryLabel =
        tool.category === "calculators"
          ? "calculators calculator"
          : "tools text tools developer tools";

      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        categoryLabel.includes(q)
      );
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
                Online Tools & Calculators
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
                Useful online tools for everyday tasks
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Use fast and convenient tools directly in your browser:
                calculators, text tools, developer tools, and other useful
                utilities without installing any software.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/tools"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800"
                >
                  Browse tools
                </Link>

                <Link
                  href="/calculators"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-50"
                >
                  Open calculators
                </Link>
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-sm font-medium text-slate-800">
                  Quick search
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try: age, json, bmi, text..."
                  className="w-full max-w-xl rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Categories</h2>
            <p className="mt-2 text-slate-600">
              Choose the type of tool you need and get started right away.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/calculators"
              className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                Calculators
              </h3>
              <p className="mt-3 text-slate-600">
                Calculators for age, percentages, BMI, loans, and more.
              </p>
            </Link>

            <Link
              href="/tools"
              className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                Text Tools
              </h3>
              <p className="mt-3 text-slate-600">
                Word counting, case conversion, text repeating, and more.
              </p>
            </Link>

            <Link
              href="/tools"
              className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                Developer Tools
              </h3>
              <p className="mt-3 text-slate-600">
                JSON Formatter, Base64 Tool, and other helpful developer
                utilities.
              </p>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {query ? "Search results" : "Popular tools"}
              </h2>
              <p className="mt-2 text-slate-600">
                {query
                  ? `Found: ${filteredTools.length}`
                  : "Useful tools to get started quickly."}
              </p>
            </div>

            <Link
              href="/tools"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              View all →
            </Link>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
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
              No results found.
            </div>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-3xl border border-slate-300 bg-white p-8 shadow-sm md:p-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Why choose ToolSite
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Fast and simple
                </h3>
                <p className="mt-2 text-slate-600">
                  Open a page, enter your data, and get results instantly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  No installation
                </h3>
                <p className="mt-2 text-slate-600">
                  All tools work directly in your browser without extra
                  software.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Useful categories
                </h3>
                <p className="mt-2 text-slate-600">
                  Calculators, text tools, and developer tools in one place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}