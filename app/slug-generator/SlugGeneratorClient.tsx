"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function SlugGeneratorPage() {
  const [text, setText] = useState("");

  const slug = useMemo(() => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9а-яё\s-]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }, [text]);

  const handleCopy = async () => {
    if (!slug) return;
    await navigator.clipboard.writeText(slug);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Slug Generator"
        description="Convert text into a clean SEO-friendly slug."
        url="https://toolsite.ink/slug-generator"
      />

      <main className="mx-auto max-w-4xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Slug Generator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">Slug Generator</h1>
        <p className="mt-3 text-lg text-slate-700">
          Convert text into a clean slug for URLs.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Enter text
          </label>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="For example: Best percentage calculator"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Slug</div>
            <div className="mt-1 break-all text-xl font-semibold text-slate-900">
              {slug || "—"}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Copy
            </button>

            <button
              onClick={() => setText("")}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Slug Generator"
          aboutParagraphs={[
            "This slug generator converts text into clean URL-friendly slugs.",
            "It is useful for SEO, blog posts, product pages, and content management systems.",
          ]}
          howToUseSteps={[
            "Enter text into the input field.",
            "The tool automatically generates a slug.",
            "Copy the slug for your URL.",
          ]}
          faqItems={[
            {
              question: "What is a slug?",
              answer: "A slug is the readable part of a URL used to identify a page.",
            },
            {
              question: "Why use SEO-friendly slugs?",
              answer: "They make URLs easier to read and improve search engine visibility.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="slug-generator"
          category="tools"
          title="Related tools"
        />

      </main>
      <Footer />
    </div>
  );
}