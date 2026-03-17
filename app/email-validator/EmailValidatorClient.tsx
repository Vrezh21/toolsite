"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function isValidEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

export default function EmailValidatorClient() {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    const value = input.trim();

    if (!value) return null;

    const valid = isValidEmail(value);

    return {
      email: value,
      valid,
      statusText: valid ? "Valid email address" : "Invalid email address",
    };
  }, [input]);

  const handleClear = () => {
    setInput("");
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.email);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Email Validator"
        description="Validate email address format instantly."
        url="https://toolsite.ink/email-validator"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Email Validator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">Email Validator</h1>
        <p className="mt-3 text-lg text-slate-700">
          Check whether an email address has a valid format instantly.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Enter email address
          </label>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="example@email.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={!result}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy email
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
          aboutTitle="About this Email Validator"
          aboutParagraphs={[
            "This free email validator checks whether an email address has a valid format.",
            "It is useful for forms, contact lists, testing, and quick email format checks online.",
          ]}
          howToUseSteps={[
            "Enter an email address into the input field.",
            "The tool will instantly check the format.",
            "Review whether the email is valid or invalid.",
          ]}
          faqItems={[
            {
              question: "Is this email validator free?",
              answer: "Yes, this tool is completely free to use online.",
            },
            {
              question: "Does it check if the mailbox really exists?",
              answer:
                "No, this tool checks email format validity only, not mailbox existence.",
            },
            {
              question: "Can I use it for form testing?",
              answer: "Yes, it is useful for validating email format in tests and forms.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="email-validator"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}