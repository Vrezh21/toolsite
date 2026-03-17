"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function extractEmails(text: string) {
  const matches =
    text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}/g) || [];
  return matches;
}

export default function EmailExtractorClient() {
  const [input, setInput] = useState("");
  const [removeDuplicates, setRemoveDuplicates] = useState(true);

  const result = useMemo(() => {
    if (!input.trim()) return null;

    const emails = extractEmails(input);

    const uniqueEmails = removeDuplicates
      ? Array.from(new Set(emails.map((email) => email.toLowerCase())))
      : emails;

    return {
      totalFound: emails.length,
      uniqueFound: Array.from(new Set(emails.map((email) => email.toLowerCase()))).length,
      emails: uniqueEmails,
    };
  }, [input, removeDuplicates]);

  const handleCopy = async () => {
    if (!result?.emails?.length) return;
    await navigator.clipboard.writeText(result.emails.join("\n"));
  };

  const handleDownload = () => {
    if (!result?.emails?.length) return;

    const blob = new Blob([result.emails.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emails.txt";
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
        name="Email Extractor"
        description="Extract email addresses from text instantly."
        url="https://toolsite.ink/email-extractor"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Email Extractor" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">Email Extractor</h1>
        <p className="mt-3 text-lg text-slate-700">
          Extract email addresses from text, raw content, logs, or copied data.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Paste text
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text here..."
            rows={10}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-4 flex flex-wrap items-center gap-4">
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
              disabled={!result?.emails?.length}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy emails
            </button>

            <button
              onClick={handleDownload}
              disabled={!result?.emails?.length}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
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
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Total found</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">
                  {result.totalFound}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Unique emails</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">
                  {result.uniqueFound}
                </div>
              </div>
            </div>
          ) : null}

          {result?.emails?.length ? (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 text-sm font-medium text-slate-800">
                Extracted emails
              </div>

              <div className="max-h-80 overflow-auto rounded-lg bg-white p-4">
                <ul className="space-y-2">
                  {result.emails.map((email, index) => (
                    <li
                      key={`${email}-${index}`}
                      className="break-all text-sm text-slate-800"
                    >
                      {email}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <SeoContent
          aboutTitle="About this Email Extractor"
          aboutParagraphs={[
            "This free email extractor helps you find email addresses inside text, logs, copied web content, and other raw data.",
            "It is useful for cleaning contact lists, parsing copied content, and quickly extracting visible email addresses online.",
          ]}
          howToUseSteps={[
            "Paste your text into the input box.",
            "The tool will automatically detect email addresses.",
            "Copy or download the extracted results.",
            "Enable duplicate removal if needed.",
          ]}
          faqItems={[
            {
              question: "Is this email extractor free?",
              answer: "Yes, this tool is completely free to use online.",
            },
            {
              question: "Does it remove duplicate emails?",
              answer: "Yes, you can enable duplicate removal to keep only unique email addresses.",
            },
            {
              question: "Can I download the extracted emails?",
              answer: "Yes, you can download the results as a .txt file.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="email-extractor"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}