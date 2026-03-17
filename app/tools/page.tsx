"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { useMemo, useState } from "react";

export default function ToolsPage() {
  const [query, setQuery] = useState("");

  const onlyTools = tools.filter((item) => item.category === "tools");

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return onlyTools;

    return onlyTools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
      );
    });
  }, [query, onlyTools]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
                Text Tools & Developer Tools
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Tools
              </h1>

              <p className="mt-4 text-lg leading-8 text-slate-700">
                Useful online tools for text, formatting, conversion, and
                everyday browser-based tasks.
              </p>

              <div className="mt-6 text-sm text-slate-500">
                Available tools:{" "}
                <span className="font-semibold text-slate-900">
                  {filteredTools.length}
                </span>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-slate-800">
                  Search tools
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try: json, text, base64..."
                  className="w-full max-w-xl rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
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
              No tools found for this query.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}