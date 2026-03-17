"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function getUuidValidation(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return null;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  const isValid = uuidRegex.test(trimmed);

  let version = "";

  if (isValid) {
    version = trimmed.split("-")[2]?.charAt(0) || "";
  }

  return {
    value: trimmed,
    isValid,
    version,
    message: isValid ? "Valid UUID" : "Invalid UUID",
  };
}

export default function UuidValidatorClient() {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    return getUuidValidation(input);
  }, [input]);

  const handleClear = () => {
    setInput("");
  };

  const handleCopy = async () => {
    if (!result?.value) return;
    await navigator.clipboard.writeText(result.value);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="UUID Validator"
        description="Validate UUID format instantly and check whether a UUID string is valid."
        url="https://toolsite.ink/uuid-validator"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "UUID Validator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">UUID Validator</h1>
        <p className="mt-3 text-lg text-slate-700">
          Check whether a UUID string has a valid format instantly.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Enter UUID
          </label>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="123e4567-e89b-12d3-a456-426614174000"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={!result?.value}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy UUID
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
                result.isValid
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="text-sm text-slate-500">Validation result</div>
              <div
                className={`mt-1 text-xl font-semibold ${
                  result.isValid ? "text-green-700" : "text-red-700"
                }`}
              >
                {result.message}
              </div>

              {result.isValid && result.version ? (
                <div className="mt-3 text-sm text-slate-700">
                  UUID version: <span className="font-medium">{result.version}</span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <SeoContent
          aboutTitle="About this UUID Validator"
          aboutParagraphs={[
            "This free UUID validator checks whether a UUID string has a valid format.",
            "It is useful for developers, API testing, debugging, databases, and validating identifiers online.",
          ]}
          howToUseSteps={[
            "Paste or type a UUID into the input field.",
            "The tool will instantly validate the format.",
            "Review whether the UUID is valid or invalid.",
            "If valid, you can also see the UUID version.",
          ]}
          faqItems={[
            {
              question: "Is this UUID validator free?",
              answer: "Yes, this tool is completely free to use online.",
            },
            {
              question: "Does it detect UUID version?",
              answer: "Yes, if the UUID is valid, the tool shows its version.",
            },
            {
              question: "Does it check only format?",
              answer:
                "Yes, this tool validates the UUID format, not whether the identifier exists in a database or system.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="uuid-validator"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}