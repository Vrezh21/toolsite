"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function extractUrls(text: string) {
  const regex =
    /(https?:\/\/[^\s]+)/g;

  const matches = text.match(regex) || [];
  return matches;
}

export default function UrlExtractorClient() {
  const [input, setInput] = useState("");
  const [removeDuplicates, setRemoveDuplicates] = useState(true);

  const result = useMemo(() => {
    if (!input.trim()) return null;

    const urls = extractUrls(input);

    const uniqueUrls = removeDuplicates
      ? Array.from(new Set(urls))
      : urls;

    return {
      totalFound: urls.length,
      uniqueFound: Array.from(new Set(urls)).length,
      urls: uniqueUrls,
    };
  }, [input, removeDuplicates]);

  const handleCopy = async () => {
    if (!result?.urls?.length) return;
    await navigator.clipboard.writeText(result.urls.join("\n"));
  };

  const handleDownload = () => {
    if (!result?.urls?.length) return;

    const blob = new Blob([result.urls.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "urls.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="URL Extractor"
        description="Extract URLs and links from text instantly."
        url="https://toolsite.ink/url-extractor"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "URL Extractor" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">URL Extractor</h1>
        <p className="mt-3 text-lg text-slate-700">
          Extract links (URLs) from text, logs, or raw content instantly.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Paste text
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with URLs..."
            rows={10}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-4 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={removeDuplicates}
                onChange={(e) => setRemoveDuplicates(e.target.checked)}
              />
              Remove duplicates
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={!result?.urls?.length}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Copy URLs
            </button>

            <button
              onClick={handleDownload}
              disabled={!result?.urls?.length}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 disabled:opacity-50"
            >
              Download .txt
            </button>

            <button
              onClick={handleClear}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
            >
              Clear
            </button>
          </div>

          {result ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Total found</div>
                <div className="mt-1 text-xl font-semibold">
                  {result.totalFound}
                </div>
              </div>

              <div className="rounded-xl border bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Unique URLs</div>
                <div className="mt-1 text-xl font-semibold">
                  {result.uniqueFound}
                </div>
              </div>
            </div>
          ) : null}

          {result?.urls?.length ? (
            <div className="mt-6 rounded-xl border bg-slate-50 p-4">
              <div className="mb-3 text-sm font-medium text-slate-800">
                Extracted URLs
              </div>

              <div className="max-h-80 overflow-auto bg-white p-4 rounded-lg">
                <ul className="space-y-2">
                  {result.urls.map((url, index) => (
                    <li
                      key={`${url}-${index}`}
                      className="break-all text-sm text-slate-800"
                    >
                      {url}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <SeoContent
          aboutTitle="About this URL Extractor"
          aboutParagraphs={[
            "This free URL extractor helps you find links inside text, logs, and raw data instantly.",
            "It is useful for developers, SEO specialists, and anyone working with large text content.",
          ]}
          howToUseSteps={[
            "Paste your text into the input box.",
            "The tool automatically detects URLs.",
            "Copy or download the extracted links.",
          ]}
          faqItems={[
            {
              question: "Is this URL extractor free?",
              answer: "Yes, it is completely free to use.",
            },
            {
              question: "Does it remove duplicates?",
              answer: "Yes, you can enable duplicate removal.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="url-extractor"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}