"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState("16");
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const password = useMemo(() => {
    const len = Number(length);

    if (!len || len < 4) return "";

    let chars = "";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) return "";

    let result = "";
    for (let i = 0; i < len; i++) {
      const index = Math.floor(Math.random() * chars.length);
      result += chars[index];
    }

    return result;
  }, [
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    refreshKey,
  ]);

  const strength = useMemo(() => {
    const len = Number(length);

    let score = 0;
    if (len >= 8) score++;
    if (len >= 12) score++;
    if (includeLowercase) score++;
    if (includeUppercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";
    return "Strong";
  }, [
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols,
  ]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Password Generator"
        description="Generate secure random passwords with custom options."
        url="https://toolsite.ink/password-generator"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Password Generator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Password Generator
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Generate secure passwords with custom length and character options.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Password Length
            </label>
            <input
              type="number"
              min="4"
              max="128"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            />

            <div className="mt-6 space-y-3">
              <label className="flex items-center gap-3 text-slate-800">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                Lowercase letters (a-z)
              </label>

              <label className="flex items-center gap-3 text-slate-800">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                Uppercase letters (A-Z)
              </label>

              <label className="flex items-center gap-3 text-slate-800">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Numbers (0-9)
              </label>

              <label className="flex items-center gap-3 text-slate-800">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Symbols (!@#$...)
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div>
              <div className="text-sm text-slate-500">Generated Password</div>
              <div className="mt-2 break-all rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-lg text-slate-900">
                {password || "Choose options to generate a password"}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Strength</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {password ? strength : "—"}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setRefreshKey((prev) => prev + 1)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                Generate New
              </button>

              <button
                onClick={handleCopy}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Password Generator"
          aboutParagraphs={[
            "This password generator creates secure random passwords.",
            "You can control password length and choose character types.",
          ]}
          howToUseSteps={[
            "Choose password length.",
            "Select character types such as letters, numbers, and symbols.",
            "Generate and copy the password.",
          ]}
          faqItems={[
            {
              question: "Are generated passwords secure?",
              answer: "Yes, they are randomly generated based on selected options.",
            },
            {
              question: "Can I include symbols?",
              answer: "Yes, you can enable or disable symbols in the settings.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="password-generator"
          category="tools"
          title="Related tools"
        />

      </main>

      <Footer />
    </div>
  );
}