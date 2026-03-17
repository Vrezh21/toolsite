"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function UrlValidatorClient() {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    const value = input.trim();

    if (!value) return null;

    const valid = isValidUrl(value);

    return {
      url: value,
      valid,
      statusText: valid ? "Valid URL" : "Invalid URL",
    };
  }, [input]);

  const handleClear = () => {
    setInput("");
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="URL Validator"
        description="Validate URL format instantly."
        url="https://toolsite.ink/url-validator"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "URL Validator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">URL Validator</h1>
        <p className="mt-3 text-lg text-slate-700">
          Check whether a URL has a valid format instantly.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Enter URL
          </label>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={!result}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy URL
            </button>

            <button
              onClick={handleClear}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
            >
              Clear
            </button>
          </div>

          {result ? (
            <div
              className={`mt-6 rounded-xl border p-4 ${
                result.valid
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="text-sm text-slate-500">Validation result</div>
              <div
                className={`mt-1 text-xl font-semibold ${
                  result.valid ? "text-green-700" : "text-red-700"
                }`}
              >
                {result.statusText}
              </div>
            </div>
          ) : null}
        </div>

        <SeoContent
          aboutTitle="About this URL Validator"
          aboutParagraphs={[
            "This free URL validator checks whether a URL has a valid format.",
            "It is useful for developers, SEO specialists, testing, and checking links before use.",
          ]}
          howToUseSteps={[
            "Enter a URL into the input field.",
            "The tool will instantly validate the URL format.",
            "Review whether the URL is valid or invalid.",
          ]}
          faqItems={[
            {
              question: "Is this URL validator free?",
              answer: "Yes, this tool is completely free to use online.",
            },
            {
              question: "Does it check whether the website is online?",
              answer:
                "No, this tool checks URL format only, not whether the website is live.",
            },
            {
              question: "Does the URL need http or https?",
              answer:
                "Yes, for this validator the URL should include http:// or https:// to be considered valid.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="url-validator"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}